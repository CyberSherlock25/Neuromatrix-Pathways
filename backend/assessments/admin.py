from django.contrib import admin

from .models import (
    Assessment,
    Dimension,
    Section,
    Question,
    Option,
    QuestionDimension,
    AssessmentAttempt,
    Response,
)


@admin.register(Assessment)
class AssessmentAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "slug",
        "version",
        "is_active",
        "created_at",
    )

    list_filter = ("is_active", "version")

    search_fields = (
        "name",
        "slug",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }


@admin.register(Dimension)
class DimensionAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "code",
    )

    search_fields = (
        "name",
        "code",
    )


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "assessment",
        "order",
    )

    list_filter = ("assessment",)

    search_fields = (
        "name",
        "assessment__name",
    )


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        "text",
        "section",
        "question_type",
        "order",
        "is_required",
        "is_active",
    )

    list_filter = (
        "question_type",
        "is_required",
        "is_active",
    )

    search_fields = (
        "text",
        "section__name",
    )


@admin.register(Option)
class OptionAdmin(admin.ModelAdmin):
    list_display = (
        "text",
        "question",
        "value",
        "order",
    )

    list_filter = ("value",)

    search_fields = (
        "text",
        "question__text",
    )


@admin.register(QuestionDimension)
class QuestionDimensionAdmin(admin.ModelAdmin):
    list_display = (
        "question",
        "dimension",
        "weight",
        "reverse_scored",
    )

    list_filter = (
        "dimension",
        "reverse_scored",
    )

    search_fields = (
        "question__text",
        "dimension__name",
    )


@admin.register(AssessmentAttempt)
class AssessmentAttemptAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "assessment",
        "session_id",
        "started_at",
        "completed_at",
        "is_completed",
    )

    list_filter = (
        "assessment",
        "is_completed",
    )


@admin.register(Response)
class ResponseAdmin(admin.ModelAdmin):
    list_display = (
        "attempt",
        "question",
        "selected_option",
        "answered_at",
    )

    list_filter = (
        "selected_option",
    )