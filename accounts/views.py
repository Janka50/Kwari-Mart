from django.shortcuts import render
from rest_framework import generics

from .models import User
from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

from .authentication import (
    CustomTokenObtainPairSerializer
)
from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.response import Response

from rest_framework import status

from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import (
    RefreshToken
)
from .serializers import (
    RegisterSerializer,
    LogoutSerializer,
)
from drf_spectacular.utils import extend_schema
# Create your views here.


class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = RegisterSerializer
    
class LoginView(TokenObtainPairView):
    serializer_class = (
        CustomTokenObtainPairSerializer

    )
    
@extend_schema(
    tags=["Authentication"],
    request=LogoutSerializer,
    responses={200: None},
    summary="Logout User",
)
class LogoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            refresh_token = request.data["refresh"]

            token = RefreshToken(refresh_token)

            token.blacklist()

            return Response(
                {"message": "Logged out"},
                status=status.HTTP_200_OK,
            )

        except Exception:

            return Response(
                {"error": "Invalid token"},
                status=status.HTTP_400_BAD_REQUEST,
            )