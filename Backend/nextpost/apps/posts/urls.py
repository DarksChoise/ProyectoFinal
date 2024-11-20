from django.urls import include, path
from rest_framework import routers

from apps.posts.views.post_view import PostViewSet

router = routers.DefaultRouter()

router.register(r'posts', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
]
