from django.urls import path

from .views import (
    health_check,
    assessment_detail,
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
]