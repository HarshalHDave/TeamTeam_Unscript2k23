from rest_framework import serializers
from .models import ImageForecasting


def ImageSerializer(Image):
    image_url = serializers.URLField(source='image.url', read_only=True)

    class Meta:
        model = ImageForecasting
        fields = ('id', 'image', 'image_url')
