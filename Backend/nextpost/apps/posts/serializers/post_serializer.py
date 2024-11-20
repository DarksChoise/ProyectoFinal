from rest_framework import serializers

from apps.posts.models.post import Post
from apps.posts.utils import prompt_generator
from apps.user.serializers.user_serializer import UserListSerializer


class PostSerializer(serializers.ModelSerializer):
    user = UserListSerializer(read_only=True)

    class Meta:
        model = Post
        fields = [
            'id',
            'user',
            'idea',
            'creatividad',
            'tema',
            'post_type',
            'pensamientos',
            'ejemplo',
            'tono',
            'size',
            'red_social',
            'fecha_creacion',
            'post_generado',
        ]

    extra_kwargs = {
        'post_generado': {'read_only': True},
        'post_generado': {'write_only': True},
    }

    def create(self, validated_data):

        validated_data['post_generado'] = prompt_generator(
            validated_data['idea'],
            validated_data['creatividad'],
            validated_data['tema'],
            validated_data['post_type'],
            validated_data['pensamientos'],
            validated_data['ejemplo'],
            validated_data['tono'],
            validated_data['size'],
            validated_data['red_social']
        )
        return Post.objects.create(**validated_data)
