from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.permissions import (IsAuthenticated, AllowAny)
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from apps.user.models.user import User
from apps.user.serializers.user_serializer import (UserCreateSerializer, UserListSerializer)


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserListSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserListSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return super(UserViewSet, self).get_permissions()

    @ action(detail=False, methods=['get'])
    def me(self, request):
        user = request.user
        serializer = UserListSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
