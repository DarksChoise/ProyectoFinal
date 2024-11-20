from django.urls import include, path
from rest_framework import routers

from apps.user.views.user_view import UserViewSet


router = routers.DefaultRouter()

router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]
