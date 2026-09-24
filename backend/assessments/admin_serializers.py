from rest_framework import serializers

from .models import Assessment, AssessmentAssignment, Question
from accounts.models import UserProfile


class AdminAssessmentSerializer(serializers.ModelSerializer):
    question_count = serializers.SerializerMethodField()

    student_status = serializers.ChoiceField(
        choices=UserProfile.STUDENT_STATUS_CHOICES,
        required=False,
        allow_null=True,
        write_only=True,
    )

    assigned_student_status = serializers.SerializerMethodField()

    class Meta:
        model = Assessment
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "version",
            "question_count",
            "is_active",
            "student_status",
            "assigned_student_status",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "question_count",
            "assigned_student_status",
            "created_at",
            "updated_at",
        ]

    def get_question_count(self, obj):
        return Question.objects.filter(
            section__assessment=obj,
            is_active=True,
        ).count()

    def get_assigned_student_status(self, obj):
        assignment = obj.assignments.filter(
            is_active=True
        ).first()

        if not assignment:
            return None

        return assignment.student_status

    def validate_slug(self, value):
        value = value.strip().lower()

        if not value:
            raise serializers.ValidationError(
                "Assessment slug cannot be empty."
            )

        return value

    def create(self, validated_data):
        student_status = validated_data.pop(
            "student_status",
            None,
        )

        assessment = Assessment.objects.create(
            **validated_data
        )

        if student_status:
            AssessmentAssignment.objects.create(
                assessment=assessment,
                student_status=student_status,
            )

        return assessment

    def update(self, instance, validated_data):
        student_status = validated_data.pop(
            "student_status",
            None,
        )

        instance = super().update(
            instance,
            validated_data,
        )

        if student_status is not None:
            assignment = instance.assignments.filter(
                is_active=True
            ).first()

            if assignment:
                assignment.student_status = student_status
                assignment.save(
                    update_fields=[
                        "student_status",
                        "updated_at",
                    ]
                )
            else:
                AssessmentAssignment.objects.create(
                    assessment=instance,
                    student_status=student_status,
                )

        return instance