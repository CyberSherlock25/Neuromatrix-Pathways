from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.utils import timezone

from .models import (
    Assessment,
    AssessmentAttempt,
    Response as AssessmentResponse,
    Option,
)
from .serializers import (
    AssessmentSerializer,
    AssessmentAttemptSerializer,
    ResponseSerializer,
)

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


@api_view(["POST"])
def start_attempt(request, slug):
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

    session_id = request.data.get("session_id", "")

    attempt = AssessmentAttempt.objects.create(
        assessment=assessment,
        session_id=session_id,
    )

    serializer = AssessmentAttemptSerializer(attempt)

    return Response(
        serializer.data,
        status=status.HTTP_201_CREATED,
    )
@api_view(["POST"])
def save_response(request, attempt_id):
    try:
        attempt = AssessmentAttempt.objects.get(
            id=attempt_id
        )
    except AssessmentAttempt.DoesNotExist:
        return Response(
            {"error": "Assessment attempt not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    if attempt.is_completed:
        return Response(
            {"error": "This assessment has already been completed."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    question_id = request.data.get("question")
    selected_option_id = request.data.get("selected_option")

    if not question_id or not selected_option_id:
        return Response(
            {
                "error": "Question and selected_option are required."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Check that the question belongs to this assessment
    question_exists = attempt.assessment.sections.filter(
        questions__id=question_id,
        questions__is_active=True,
    ).exists()

    if not question_exists:
        return Response(
            {
                "error": "This question does not belong to the assessment."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Check that the selected option belongs to the question
    option_exists = Option.objects.filter(
        id=selected_option_id,
        question_id=question_id,
    ).exists()

    if not option_exists:
        return Response(
            {
                "error": "This option does not belong to the selected question."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    response, created = AssessmentResponse.objects.update_or_create(
        attempt=attempt,
        question_id=question_id,
        defaults={
            "selected_option_id": selected_option_id
        },
    )

    serializer = ResponseSerializer(response)

    return Response(
        serializer.data,
        status=(
            status.HTTP_201_CREATED
            if created
            else status.HTTP_200_OK
        ),
    )


@api_view(["POST"])
def complete_attempt(request, attempt_id):
    try:
        attempt = AssessmentAttempt.objects.get(
            id=attempt_id
        )
    except AssessmentAttempt.DoesNotExist:
        return Response(
            {
                "error": "Assessment attempt not found."
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    if attempt.is_completed:
        return Response(
            {
                "error": "Assessment already completed."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    attempt.is_completed = True
    attempt.completed_at = timezone.now()
    attempt.save(
        update_fields=[
            "is_completed",
            "completed_at",
        ]
    )

    serializer = AssessmentAttemptSerializer(attempt)

    return Response(serializer.data)