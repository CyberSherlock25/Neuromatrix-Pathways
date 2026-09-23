from django.urls import path

from .views import (
    health_check,
    assessment_detail,
    start_attempt,
    save_response,
    complete_attempt,
)

urlpatterns = [
    # General assessment endpoints
    path("health/", health_check, name="health-check"),

    # Attempt endpoints
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

    # Assessment endpoints
    path(
        "<slug:slug>/attempts/",
        start_attempt,
        name="start-attempt",
    ),
    path(
        "<slug:slug>/",
        assessment_detail,
        name="assessment-detail",
    ),
]