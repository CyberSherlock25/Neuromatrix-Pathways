from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db import transaction
from .services.scoring import calculate_assessment_result

from rest_framework.decorators import (
    api_view,
    permission_classes,
)

from .models import (
    Assessment,
    AssessmentAttempt,
    Response as AssessmentResponse,
    Option,
    Question,
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
@permission_classes([IsAuthenticated])
def start_attempt(request, slug):
    try:
        assessment = Assessment.objects.get(
            slug=slug,
            is_active=True,
        )
    except Assessment.DoesNotExist:
        return Response(
            {"error": "Assessment not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    session_id = request.data.get("session_id", "")

    attempt = AssessmentAttempt.objects.create(
        user=request.user,
        assessment=assessment,
        session_id=session_id,
    )

    serializer = AssessmentAttemptSerializer(attempt)

    return Response(
        serializer.data,
        status=status.HTTP_201_CREATED,
    )



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_response(request, attempt_id):
    attempt = get_object_or_404(
        AssessmentAttempt,
        id=attempt_id,
        user=request.user,
    )

    if attempt.is_completed:
        return Response(
            {"error": "Cannot modify a completed assessment."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    question_id = request.data.get("question")
    selected_option_id = request.data.get("selected_option")

    if not question_id or not selected_option_id:
        return Response(
            {
                "error": "question and selected_option are required."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        question = Question.objects.get(
            id=question_id,
            section__assessment=attempt.assessment,
            is_active=True,
        )
    except Question.DoesNotExist:
        return Response(
            {"error": "Invalid question for this assessment."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        option = Option.objects.get(
            id=selected_option_id,
            question=question,
        )
    except Option.DoesNotExist:
        return Response(
            {"error": "Invalid option for this question."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    response_obj, created = AssessmentResponse.objects.update_or_create(
        attempt=attempt,
        question=question,
        defaults={
            "selected_option": option,
        },
    )

    serializer = ResponseSerializer(response_obj)

    return Response(
        serializer.data,
        status=(
            status.HTTP_201_CREATED
            if created
            else status.HTTP_200_OK
        ),
    )
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def complete_attempt(request, attempt_id):
    attempt = get_object_or_404(
        AssessmentAttempt,
        id=attempt_id,
        user=request.user,
    )

    if attempt.is_completed:
        return Response(
            {"error": "Assessment already completed."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # ---------------------------------------------------------
    # Find all required questions for this assessment
    # ---------------------------------------------------------

    required_questions = Question.objects.filter(
        section__assessment=attempt.assessment,
        is_active=True,
        is_required=True,
    )

    required_question_count = required_questions.count()

    # ---------------------------------------------------------
    # Find answers submitted for this attempt
    # ---------------------------------------------------------

    answered_question_count = (
        AssessmentResponse.objects.filter(
            attempt=attempt,
            question__section__assessment=attempt.assessment,
            question__is_active=True,
            question__is_required=True,
        )
        .values("question")
        .distinct()
        .count()
    )

    # ---------------------------------------------------------
    # Prevent incomplete submissions
    # ---------------------------------------------------------

    if answered_question_count < required_question_count:
        return Response(
            {
                "error": "Assessment is incomplete.",
                "required_questions": required_question_count,
                "answered_questions": answered_question_count,
                "remaining_questions": (
                    required_question_count
                    - answered_question_count
                ),
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    # ---------------------------------------------------------
    # Complete + score atomically
    # ---------------------------------------------------------

    try:
        with transaction.atomic():

            attempt.is_completed = True
            attempt.completed_at = timezone.now()

            attempt.save(
                update_fields=[
                    "is_completed",
                    "completed_at",
                ]
            )

            result = calculate_assessment_result(
                attempt
            )

    except ValueError as exc:
        return Response(
            {"error": str(exc)},
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(
        {
            "message": "Assessment completed successfully.",
            "attempt_id": attempt.id,
            "result_id": result.id,
            "is_completed": attempt.is_completed,
        },
        status=status.HTTP_200_OK,
    )