from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import (
    Assessment,
    Question,
    Dimension,
    AssessmentResult,
)
from .permissions import IsAdminUser
from .admin_serializers import AdminAssessmentSerializer


class AdminAssessmentListCreateView(generics.ListCreateAPIView):
    """
    List all assessments or create a new assessment.
    """

    queryset = Assessment.objects.all().order_by("-created_at")
    serializer_class = AdminAssessmentSerializer
    permission_classes = [IsAdminUser]


class AdminAssessmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete an assessment.
    """

    queryset = Assessment.objects.all()
    serializer_class = AdminAssessmentSerializer
    permission_classes = [IsAdminUser]


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
        "active_assessments": active_assessments,
        "total_questions": total_questions,
        "dimensions": total_dimensions,
        "reports": total_reports,
    })