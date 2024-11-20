from django.urls import include, path

from rest_framework import routers

from apps.auth.views import AuthenticationViewSet


router = routers.DefaultRouter()
router.register(r'auth', AuthenticationViewSet, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
]
