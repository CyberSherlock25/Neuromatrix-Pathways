import json
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from assessments.models import (
    Assessment,
    Dimension,
    Section,
    Question,
    Option,
    QuestionDimension,
)


class Command(BaseCommand):
    help = "Import a Neuromatrix assessment question bank from JSON."

    def add_arguments(self, parser):
        parser.add_argument(
            "file",
            type=str,
            help="Path to the question bank JSON file.",
        )

        parser.add_argument(
            "--reset",
            action="store_true",
            help="Delete the existing assessment before importing.",
        )

    @transaction.atomic
    def handle(self, *args, **options):
        file_path = Path(options["file"])

        if not file_path.exists():
            raise CommandError(
                f"Question bank file not found: {file_path}"
            )

        try:
            with file_path.open("r", encoding="utf-8") as file:
                data = json.load(file)
        except json.JSONDecodeError as exc:
            raise CommandError(
                f"Invalid JSON file: {exc}"
            )

        assessment_data = data.get("assessment")
        dimensions_data = data.get("dimensions")
        section_data = data.get("section")
        options_data = data.get("options")
        questions_data = data.get("questions")

        if not assessment_data:
            raise CommandError("Missing 'assessment' data.")

        if not dimensions_data:
            raise CommandError("Missing 'dimensions' data.")

        if not section_data:
            raise CommandError("Missing 'section' data.")

        if not options_data:
            raise CommandError("Missing 'options' data.")

        if not questions_data:
            raise CommandError("Missing 'questions' data.")

        assessment_slug = assessment_data["slug"]

        # ---------------------------------------------------------
        # RESET EXISTING ASSESSMENT
        # ---------------------------------------------------------

        if options["reset"]:
            deleted, _ = Assessment.objects.filter(
                slug=assessment_slug
            ).delete()

            if deleted:
                self.stdout.write(
                    self.style.WARNING(
                        f"Deleted existing assessment: {assessment_slug}"
                    )
                )

        # ---------------------------------------------------------
        # CREATE / UPDATE ASSESSMENT
        # ---------------------------------------------------------

        assessment, created = Assessment.objects.update_or_create(
            slug=assessment_slug,
            defaults={
                "name": assessment_data["name"],
                "description": assessment_data.get(
                    "description",
                    ""
                ),
                "version": assessment_data.get(
                    "version",
                    "1.0"
                ),
                "is_active": True,
            },
        )

        action = "Created" if created else "Updated"

        self.stdout.write(
            self.style.SUCCESS(
                f"{action} assessment: {assessment.name}"
            )
        )

        # ---------------------------------------------------------
        # CREATE DIMENSIONS
        # ---------------------------------------------------------

        dimensions = {}

        for dimension_data in dimensions_data:
            dimension, _ = Dimension.objects.update_or_create(
                code=dimension_data["code"],
                defaults={
                    "name": dimension_data["name"],
                    "description": dimension_data.get(
                        "description",
                        ""
                    ),
                },
            )

            dimensions[dimension.name] = dimension

        self.stdout.write(
            self.style.SUCCESS(
                f"Loaded {len(dimensions)} dimensions."
            )
        )

        # ---------------------------------------------------------
        # CREATE SECTION
        # ---------------------------------------------------------

        section, _ = Section.objects.update_or_create(
            assessment=assessment,
            name=section_data["name"],
            defaults={
                "description": section_data.get(
                    "description",
                    ""
                ),
                "order": section_data.get(
                    "order",
                    1
                ),
            },
        )

        # ---------------------------------------------------------
        # CREATE QUESTIONS
        # ---------------------------------------------------------

        question_count = 0
        option_count = 0
        mapping_count = 0

        for index, question_data in enumerate(
            questions_data,
            start=1,
        ):
            question, _ = Question.objects.update_or_create(
                section=section,
                text=question_data["statement"],
                defaults={
                    "question_type": "likert",
                    "order": index,
                    "is_required": True,
                    "is_active": True,
                },
            )

            question_count += 1

            # -----------------------------------------------------
            # OPTIONS
            # -----------------------------------------------------

            for option_data in options_data:
                Option.objects.update_or_create(
                    question=question,
                    order=option_data["order"],
                    defaults={
                        "text": option_data["text"],
                        "value": option_data["value"],
                    },
                )

                option_count += 1

            # -----------------------------------------------------
            # DIMENSION MAPPING
            # -----------------------------------------------------

            factor = question_data["factor"]

            if factor not in dimensions:
                raise CommandError(
                    f"Unknown factor '{factor}' "
                    f"for question {question_data['id']}."
                )

            dimension = dimensions[factor]

            QuestionDimension.objects.update_or_create(
                question=question,
                dimension=dimension,
                defaults={
                    "weight": 1.0,
                    "reverse_scored": question_data["reverse"],
                },
            )

            mapping_count += 1

        # ---------------------------------------------------------
        # SUMMARY
        # ---------------------------------------------------------

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                "========================================"
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                "Question bank imported successfully!"
            )
        )

        self.stdout.write(
            f"Assessment : {assessment.name}"
        )

        self.stdout.write(
            f"Dimensions : {len(dimensions)}"
        )

        self.stdout.write(
            f"Questions  : {question_count}"
        )

        self.stdout.write(
            f"Options    : {option_count}"
        )

        self.stdout.write(
            f"Mappings   : {mapping_count}"
        )

        self.stdout.write(
            self.style.SUCCESS(
                "========================================"
            )
        )