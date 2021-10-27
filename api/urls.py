from django.urls import path
from .views import HelloWorldView, RefreshTokensView, RegisterView, LoginView, UserView, LogoutView, Results, \
    CandidateVAInfo, DistrictTurnout, UserResults, WindowInfo

urlpatterns = [
    path('hello-world', HelloWorldView, name='hello-world'),
    path('register', RegisterView.as_view()),
    path('auth/login', LoginView.as_view()),
    path('user-info', UserView.as_view()),
    path('auth/refresh-tokens', RefreshTokensView.as_view()),
    path('auth/logout', LogoutView.as_view()),
    path('show-results', Results.as_view()),
    path('candidate-va-info', CandidateVAInfo.as_view()),
    path('district-turnout', DistrictTurnout.as_view()),
    path('user-results', UserResults.as_view()),
    path('window-info', WindowInfo.as_view())
]
