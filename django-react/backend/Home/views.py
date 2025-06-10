from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import PostSerializer, UserSerializer
from .models import Post

class PostListCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
