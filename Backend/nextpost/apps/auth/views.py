from django.contrib.auth import logout

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

from apps.user.models.user import User
from apps.auth.serializers.authentication_serializer import (
    AuthenticationSerializer,
)


class AuthenticationViewSet(GenericViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == 'login':
            return AuthenticationSerializer
        return AuthenticationSerializer

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_data = serializer.validated_data

        try:
            user = User.objects.get(email=user_data['email'])
        except User.DoesNotExist:
            raise AuthenticationFailed(
                "User with the provided email does not exist")

        if not user.check_password(user_data['password']):
            raise AuthenticationFailed("Incorrect password")

        access_token = RefreshToken.for_user(user).access_token

        data = {
            "access": str(access_token),
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
            }
        }
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        logout(request)
        return Response({
            "message": "User logged out successfully"
        }, status=status.HTTP_200_OK)
