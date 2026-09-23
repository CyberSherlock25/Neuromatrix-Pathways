from django.urls import path

from .views import (
    health_check,
    assessment_detail,
    start_attempt,
    save_response,
    complete_attempt,
)


urlpatterns = [
    path(
        "health/",
        health_check,
        name="health-check",
    ),

    path(
        "<slug:slug>/",
        assessment_detail,
        name="assessment-detail",
    ),

    path(
        "<slug:slug>/attempts/",
        start_attempt,
        name="start-attempt",
    ),

    path(
        "attempts/<int:attempt_id>/responses/",
        save_response,
        name="save-response",
    ),

    path(
        "attempts/<int:attempt_id>/complete/",
        complete_attempt,
        name="complete-attempt",
    ),
]