from django.urls import path
from .views import HelloWorldView, RefreshTokensView, RegisterView, LoginView, UserView, LogoutView

urlpatterns = [
    path('hello-world', HelloWorldView, name='hello-world'),
    path('register', RegisterView.as_view()),
    path('auth/login', LoginView.as_view()),
    path('user-info', UserView.as_view()),
    path('auth/refresh-tokens', RefreshTokensView.as_view()),
    path('auth/logout', LogoutView.as_view()),
]
