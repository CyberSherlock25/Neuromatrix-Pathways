from rest_framework import serializers

from .models import Assessment, Question


class AdminAssessmentSerializer(serializers.ModelSerializer):
    question_count = serializers.SerializerMethodField()

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
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "question_count",
            "created_at",
            "updated_at",
        ]

    def get_question_count(self, obj):
        return Question.objects.filter(
            section__assessment=obj,
            is_active=True,
        ).count()

    def validate_slug(self, value):
        value = value.strip().lower()

        if not value:
            raise serializers.ValidationError(
                "Assessment slug cannot be empty."
            )

        return value