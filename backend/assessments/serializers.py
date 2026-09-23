from rest_framework import serializers

from .models import (
    Assessment,
    Section,
    Question,
    Option,
    Dimension,
    QuestionDimension,
)


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = [
            "id",
            "text",
            "value",
            "order",
        ]


class DimensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimension
        fields = [
            "id",
            "name",
            "code",
            "description",
        ]


class QuestionDimensionSerializer(serializers.ModelSerializer):
    dimension = DimensionSerializer(read_only=True)

    class Meta:
        model = QuestionDimension
        fields = [
            "dimension",
            "weight",
            "reverse_scored",
        ]


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)
    dimensions = QuestionDimensionSerializer(
        source="dimension_mappings",
        many=True,
        read_only=True,
    )

    class Meta:
        model = Question
        fields = [
            "id",
            "text",
            "question_type",
            "order",
            "is_required",
            "options",
            "dimensions",
        ]


class SectionSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Section
        fields = [
            "id",
            "name",
            "description",
            "order",
            "questions",
        ]


class AssessmentSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Assessment
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "version",
            "sections",
        ]