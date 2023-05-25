from rest_framework import serializers
from .models import Paper
from accounts.serializers import UserSerializer


class PaperSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Paper
        fields = '__all__'

    def get_author(self, obj):
        return UserSerializer(obj.author).data
