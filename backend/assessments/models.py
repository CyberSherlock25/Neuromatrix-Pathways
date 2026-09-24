from django.db import models
from django.conf import settings

class Assessment(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    version = models.CharField(max_length=50, default="1.0")
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class Dimension(models.Model):
    name = models.CharField(max_length=150)
    code = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Section(models.Model):
    assessment = models.ForeignKey(
        Assessment,
        on_delete=models.CASCADE,
        related_name="sections"
    )

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.assessment.name} - {self.name}"


class Question(models.Model):
    section = models.ForeignKey(
        Section,
        on_delete=models.CASCADE,
        related_name="questions"
    )

    text = models.TextField()

    question_type = models.CharField(
        max_length=50,
        default="likert"
    )

    order = models.PositiveIntegerField(default=0)

    is_required = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.text


class Option(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="options"
    )

    text = models.CharField(max_length=200)
    value = models.FloatField()

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.question.id} - {self.text}"


class QuestionDimension(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="dimension_mappings"
    )

    dimension = models.ForeignKey(
        Dimension,
        on_delete=models.CASCADE,
        related_name="question_mappings"
    )

    weight = models.FloatField(default=1.0)

    reverse_scored = models.BooleanField(default=False)

    class Meta:
        unique_together = ["question", "dimension"]

    def __str__(self):
        return f"{self.question.id} → {self.dimension.name}"


class AssessmentAttempt(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="assessment_attempts",
        null=True,
        blank=True,
    )

    assessment = models.ForeignKey(
        Assessment,
        on_delete=models.CASCADE,
        related_name="attempts",
    )

    session_id = models.CharField(
        max_length=100,
        blank=True,
    )

    started_at = models.DateTimeField(
        auto_now_add=True,
    )

    completed_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    is_completed = models.BooleanField(
        default=False,
    )

    def __str__(self):
        return (
            f"{self.user.username} - "
            f"{self.assessment.name} - "
            f"Attempt {self.id}"
        )


class Response(models.Model):
    attempt = models.ForeignKey(
        AssessmentAttempt,
        on_delete=models.CASCADE,
        related_name="responses"
    )

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="responses"
    )

    selected_option = models.ForeignKey(
        Option,
        on_delete=models.CASCADE,
        related_name="responses"
    )

    answered_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ["attempt", "question"]

    def __str__(self):
        return f"Attempt {self.attempt.id} - Question {self.question.id}"



class AssessmentResult(models.Model):
    attempt = models.OneToOneField(
        AssessmentAttempt,
        on_delete=models.CASCADE,
        related_name="result",
    )

    scoring_version = models.CharField(
        max_length=50,
        default="1.0",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return (
            f"Result - "
            f"{self.attempt.user.username if self.attempt.user else 'Unknown User'} "
            f"- Attempt {self.attempt.id}"
        )


class DimensionResult(models.Model):
    result = models.ForeignKey(
        AssessmentResult,
        on_delete=models.CASCADE,
        related_name="dimension_results",
    )

    dimension = models.ForeignKey(
        Dimension,
        on_delete=models.CASCADE,
        related_name="results",
    )

    raw_score = models.FloatField()

    normalized_score = models.FloatField()

    class Meta:
        unique_together = [
            "result",
            "dimension",
        ]
        ordering = ["dimension__name"]

    def __str__(self):
        return (
            f"{self.result} - "
            f"{self.dimension.name}: "
            f"{self.normalized_score}"
        )


class ScoringConfiguration(models.Model):
    SCORING_METHOD_CHOICES = [
        (
            "dimension_based",
            "Dimension Based",
        ),
    ]

    AGGREGATION_CHOICES = [
        (
            "sum",
            "Sum",
        ),
        (
            "mean",
            "Mean",
        ),
        (
            "weighted_mean",
            "Weighted Mean",
        ),
    ]

    REVERSE_RULE_CHOICES = [
        (
            "min_plus_max_minus",
            "Minimum + Maximum - Response",
        ),
    ]

    NORMALIZATION_CHOICES = [
        (
            "none",
            "No Normalization",
        ),
        (
            "linear",
            "Linear Normalization",
        ),
    ]

    assessment = models.OneToOneField(
        Assessment,
        on_delete=models.CASCADE,
        related_name="scoring_configuration",
    )

    scoring_method = models.CharField(
        max_length=50,
        choices=SCORING_METHOD_CHOICES,
        default="dimension_based",
    )

    aggregation_method = models.CharField(
        max_length=50,
        choices=AGGREGATION_CHOICES,
        default="mean",
    )

    reverse_rule = models.CharField(
        max_length=50,
        choices=REVERSE_RULE_CHOICES,
        default="min_plus_max_minus",
    )

    normalization_method = models.CharField(
        max_length=50,
        choices=NORMALIZATION_CHOICES,
        default="linear",
    )

    input_min = models.FloatField(default=1.0)
    input_max = models.FloatField(default=5.0)

    output_min = models.FloatField(default=0.0)
    output_max = models.FloatField(default=100.0)

    version = models.CharField(
        max_length=50,
        default="1.0",
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return (
            f"{self.assessment.name} "
            f"- Scoring v{self.version}"
        )


from accounts.models import UserProfile

class AssessmentAssignment(models.Model):
    assessment = models.ForeignKey(
        Assessment,
        on_delete=models.CASCADE,
        related_name="assignments",
    )

    student_status = models.CharField(
        max_length=30,
        choices=UserProfile.STUDENT_STATUS_CHOICES,
        unique=True,
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["student_status"]

    def __str__(self):
        return (
            f"{self.student_status} → "
            f"{self.assessment.name}"
        )