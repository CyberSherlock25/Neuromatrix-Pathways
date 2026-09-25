from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import (
    Assessment,
    Question,
    Dimension,
    AssessmentResult,
    Section,
    Option,
    QuestionDimension,
)

from .permissions import IsAdminUser

from .admin_serializers import (
    AdminAssessmentSerializer,
    AdminSectionSerializer,
    AdminQuestionSerializer,
    AdminOptionSerializer,
    AdminDimensionSerializer,
    AdminQuestionDimensionSerializer,
)


# =========================================================
# ASSESSMENT ADMIN
# =========================================================

class AdminAssessmentListCreateView(
    generics.ListCreateAPIView
):
    """
    List all assessments or create a new assessment.
    """

    queryset = Assessment.objects.all().order_by(
        "-created_at"
    )

    serializer_class = AdminAssessmentSerializer

    permission_classes = [IsAdminUser]


class AdminAssessmentDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    """
    Retrieve, update, or delete an assessment.
    """

    queryset = Assessment.objects.all()

    serializer_class = AdminAssessmentSerializer

    permission_classes = [IsAdminUser]


# =========================================================
# SECTION ADMIN
# =========================================================

class AdminSectionListCreateView(
    generics.ListCreateAPIView
):
    """
    List or create sections for an assessment.
    """

    serializer_class = AdminSectionSerializer

    permission_classes = [IsAdminUser]

    def get_queryset(self):
        assessment_id = self.request.query_params.get(
            "assessment"
        )

        queryset = Section.objects.all().order_by(
            "order"
        )

        if assessment_id:
            queryset = queryset.filter(
                assessment_id=assessment_id
            )

        return queryset


# =========================================================
# QUESTION ADMIN
# =========================================================

class AdminQuestionListCreateView(
    generics.ListCreateAPIView
):
    """
    List or create questions for a section.
    """

    serializer_class = AdminQuestionSerializer

    permission_classes = [IsAdminUser]

    def get_queryset(self):
        section_id = self.request.query_params.get(
            "section"
        )

        queryset = (
            Question.objects
            .all()
            .prefetch_related("options")
            .order_by("order")
        )

        if section_id:
            queryset = queryset.filter(
                section_id=section_id
            )

        return queryset


# =========================================================
# OPTION ADMIN
# =========================================================

class AdminOptionListCreateView(
    generics.ListCreateAPIView
):
    """
    List or create options for a question.
    """

    serializer_class = AdminOptionSerializer

    permission_classes = [IsAdminUser]

    def get_queryset(self):
        question_id = self.request.query_params.get(
            "question"
        )

        queryset = Option.objects.all().order_by(
            "order"
        )

        if question_id:
            queryset = queryset.filter(
                question_id=question_id
            )

        return queryset

    def perform_create(self, serializer):
        question_id = self.request.data.get(
            "question"
        )

        question = get_object_or_404(
            Question,
            id=question_id,
        )

        serializer.save(
            question=question
        )


# =========================================================
# DIMENSION ADMIN
# =========================================================

class AdminDimensionListCreateView(
    generics.ListCreateAPIView
):
    """
    List or create dimensions.
    """

    queryset = Dimension.objects.all().order_by(
        "name"
    )

    serializer_class = AdminDimensionSerializer

    permission_classes = [IsAdminUser]


# =========================================================
# QUESTION → DIMENSION MAPPING ADMIN
# =========================================================

class AdminQuestionDimensionListCreateView(
    generics.ListCreateAPIView
):
    """
    List or create question → dimension mappings.
    """

    serializer_class = (
        AdminQuestionDimensionSerializer
    )

    permission_classes = [IsAdminUser]

    def get_queryset(self):
        question_id = self.request.query_params.get(
            "question"
        )

        dimension_id = self.request.query_params.get(
            "dimension"
        )

        queryset = (
            QuestionDimension.objects
            .select_related(
                "question",
                "dimension",
            )
            .order_by("question_id")
        )

        if question_id:
            queryset = queryset.filter(
                question_id=question_id
            )

        if dimension_id:
            queryset = queryset.filter(
                dimension_id=dimension_id
            )

        return queryset


# =========================================================
# ADMIN DASHBOARD
# =========================================================

@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_dashboard_stats(request):
    """
    Return statistics for the admin dashboard.
    """

    active_assessments = Assessment.objects.filter(
        is_active=True
    ).count()

    total_questions = Question.objects.filter(
        is_active=True
    ).count()

    total_dimensions = Dimension.objects.count()

    total_reports = AssessmentResult.objects.count()

    return Response({
        "active_assessments":
            active_assessments,

        "total_questions":
            total_questions,

        "dimensions":
            total_dimensions,

        "reports":
            total_reports,
    })