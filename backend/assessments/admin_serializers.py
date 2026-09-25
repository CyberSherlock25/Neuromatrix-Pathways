from rest_framework import serializers

from .models import (
    Assessment,
    AssessmentAssignment,
    Question,
    Section,
    Option,
    Dimension,
    QuestionDimension,
)
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


class AdminOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = [
            "id",
            "question",
            "text",
            "value",
            "order",
        ]

        read_only_fields = [
            "id",
            "question",
        ]

    def validate_value(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Option value cannot be negative."
            )

        return value


class AdminQuestionSerializer(serializers.ModelSerializer):
    options = AdminOptionSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Question
        fields = [
            "id",
            "section",
            "text",
            "question_type",
            "order",
            "is_required",
            "is_active",
            "options",
        ]

        read_only_fields = [
            "id",
            "options",
        ]

    def validate_section(self, value):
        if not value:
            raise serializers.ValidationError(
                "Section is required."
            )

        return value


class AdminSectionSerializer(serializers.ModelSerializer):
    questions = AdminQuestionSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Section
        fields = [
            "id",
            "assessment",
            "name",
            "description",
            "order",
            "questions",
        ]

        read_only_fields = [
            "id",
            "questions",
        ]
class AdminDimensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimension
        fields = [
            "id",
            "name",
            "code",
            "description",
        ]

        read_only_fields = [
            "id",
        ]

    def validate_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Dimension name cannot be empty."
            )

        return value

    def validate_code(self, value):
        value = value.strip().lower()

        if not value:
            raise serializers.ValidationError(
                "Dimension code cannot be empty."
            )

        return value


class AdminQuestionDimensionSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = QuestionDimension
        fields = [
            "id",
            "question",
            "dimension",
            "weight",
            "reverse_scored",
        ]

        read_only_fields = [
            "id",
        ]

    def validate_weight(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Weight must be greater than 0."
            )

        return value