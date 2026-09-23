from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    STUDENT_STATUS_CHOICES = [
        ("8th", "8th Standard"),
        ("9th", "9th Standard"),
        ("10th", "10th Standard"),
        ("11th", "11th Standard"),
        ("12th", "12th Standard"),
        ("pursuing-ug", "Pursuing UG"),
        ("completed-ug", "Completed UG"),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile",
    )

    student_status = models.CharField(
        max_length=30,
        choices=STUDENT_STATUS_CHOICES,
        blank=True,
    )

    def __str__(self):
        return f"{self.user.username} Profile"