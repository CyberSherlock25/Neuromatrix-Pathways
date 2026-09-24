from rest_framework import generics

from .models import Assessment
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