from django.urls import path
from .views import HelloWorldView

urlpatterns = [
    path('hello-world', HelloWorldView, name='hello-world'),
]
