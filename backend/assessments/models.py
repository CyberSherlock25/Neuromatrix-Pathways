from django.db import models


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
    assessment = models.ForeignKey(
        Assessment,
        on_delete=models.CASCADE,
        related_name="attempts"
    )

    session_id = models.CharField(
        max_length=100,
        blank=True
    )

    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.assessment.name} - Attempt {self.id}"


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