from django.urls import path

from .views import (
    health_check,
    assessment_detail,
    start_attempt,
    save_response,
    complete_attempt,
    my_assessment,
)

from .admin_views import (
    AdminAssessmentListCreateView,
    AdminAssessmentDetailView,
    admin_dashboard_stats,
)


urlpatterns = [

    # =========================================================
    # GENERAL ASSESSMENT ENDPOINTS
    # =========================================================

    path(
        "health/",
        health_check,
        name="health-check",
    ),


    # =========================================================
    # STUDENT ASSESSMENT ENDPOINTS
    # IMPORTANT: Must come BEFORE <slug:slug>/
    # =========================================================

    path(
        "my-assessment/",
        my_assessment,
        name="my-assessment",
    ),


    # =========================================================
    # ATTEMPT ENDPOINTS
    # =========================================================

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


    # =========================================================
    # ASSESSMENT ENDPOINTS
    # =========================================================

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


    # =========================================================
    # ADMIN ASSESSMENT ENDPOINTS
    # =========================================================

    path(
        "admin/assessments/",
        AdminAssessmentListCreateView.as_view(),
        name="admin-assessment-list-create",
    ),

    path(
        "admin/assessments/<int:pk>/",
        AdminAssessmentDetailView.as_view(),
        name="admin-assessment-detail",
    ),

    path(
        "admin/dashboard/stats/",
        admin_dashboard_stats,
        name="admin-dashboard-stats",
    ),
]