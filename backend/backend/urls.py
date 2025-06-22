from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from Home.views import CreateUserView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('Home.urls')),
]