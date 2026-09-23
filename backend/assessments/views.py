from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Assessment
from .serializers import AssessmentSerializer


@api_view(["GET"])
def health_check(request):
    return Response({
        "status": "success",
        "message": "Neuromatrix backend is connected."
    })


@api_view(["GET"])
def assessment_detail(request, slug):
    try:
        assessment = Assessment.objects.get(
            slug=slug,
            is_active=True,
        )
    except Assessment.DoesNotExist:
        return Response(
            {
                "error": "Assessment not found."
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = AssessmentSerializer(assessment)

    return Response(serializer.data)