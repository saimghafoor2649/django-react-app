from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import PostSerializer, UserSerializer
from .models import Post

class PostListCreate(generics.ListCreateAPIView):
    """
    View to list and create posts (requires authentication)
    - GET: Returns all posts for the current user
    - POST: Creates a new post for the current user
    """
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Only show posts belonging to the current user"""
        return Post.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Automatically set the current user as the post author"""
        serializer.save(user=self.request.user)

class PostDelete(generics.DestroyAPIView):
    """
    View to delete a post (requires authentication)
    - DELETE: Deletes a post (only if owned by current user)
    """
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Only allow deletion of posts belonging to the current user"""
        return Post.objects.filter(user=self.request.user)

class CreateUserView(generics.CreateAPIView):
    """
    View to create new users (no authentication required)
    - POST: Creates a new user and returns JWT tokens
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        """
        Override create to return JWT tokens along with user data
        """
        # First create the user using parent class logic
        response = super().create(request, *args, **kwargs)
        
        # If user creation was successful (status code 201)
        if response.status_code == status.HTTP_201_CREATED:
            # Get the newly created user
            user = User.objects.get(username=response.data['username'])
            
            # Generate JWT tokens for the user
            refresh = RefreshToken.for_user(user)
            
            # Return the tokens along with user data
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': response.data
            }, status=status.HTTP_201_CREATED)
        
        # If there was an error in user creation, return the original response
        return response