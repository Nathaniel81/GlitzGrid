from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )
    
urlpatterns = [
    path('', views.GetAllUsers.as_view(), name='users'),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register', views.RegistrationView.as_view(), name='register'),
    
    path('profile', views.GetUserProfile.as_view(), name='user-profile'),
    path('update', views.UpdateUserProfile.as_view(), name='update-profile'),

]
