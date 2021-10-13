from django.shortcuts import render
from rest_framework.decorators import action, api_view, permission_classes
from django.http import HttpResponse, JsonResponse
from rest_framework.permissions import AllowAny
# Create your views here.


@api_view(['GET'])
@permission_classes([AllowAny])
def HelloWorldView(request):
    if request.method == 'GET':
        return JsonResponse("Hello world from django's API!", safe=False)
