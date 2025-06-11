from django.contrib import admin
from . import views
from django.urls import path,include
urlpatterns = [
   path("Post/", views.PostListCreate.as_view(), name="post-list"),
   path("posts/delete/<int:pk>/", views.PostDelete.as_view(), name="delete-post"),
]