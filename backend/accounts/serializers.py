from django.contrib.auth.models import User
from rest_framework import serializers

from .models import UserProfile


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    student_status = serializers.ChoiceField(
        choices=UserProfile.STUDENT_STATUS_CHOICES,
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "student_status",
        ]

    def create(self, validated_data):
        student_status = validated_data.pop("student_status")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            password=validated_data["password"],
        )

        UserProfile.objects.create(
            user=user,
            student_status=student_status,
        )

        return user


class UserSerializer(serializers.ModelSerializer):
    student_status = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "student_status",
            "is_staff",
        ]
        read_only_fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "student_status",
            "is_staff",
        ]

    def get_student_status(self, obj):
        try:
            return obj.profile.student_status
        except UserProfile.DoesNotExist:
            return None