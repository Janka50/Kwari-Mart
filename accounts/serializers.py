from rest_framework import serializers

from .models import User, UserRole
from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.views import TokenObtainPairView



class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    class Meta:
        model = User

        fields = (
            "email",
            "username",
            "password",
            "role",
        )

    def validate_role(self, value):

        allowed_roles = [
            UserRole.MERCHANT,
            UserRole.CUSTOMER,
        ]

        if value not in allowed_roles:
            raise serializers.ValidationError(
                "Invalid role."
            )

        return value

    def create(self, validated_data):

        password = validated_data.pop("password")

        user = User(**validated_data)

        user.set_password(password)

        user.save()

        return user

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()