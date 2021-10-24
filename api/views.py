from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions
from api.authentication import JWTAuthentication
from api.permissions import IsEmployee
from api.utils import generate_access_token, generate_refresh_token

from app.settings import DOMAIN, REFRESH_TOKEN_TIME_IN_DAYS, SECRET_KEY, DEBUG
from .serializers import UserSerializer
from .models import RefreshTokens, User, VotingArea, Result, Candidate
import jwt


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def HelloWorldView(request):
    if request.method == 'GET':
        return JsonResponse("Hello world from django's API!", safe=False)


class RegisterView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny, ]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny, ]

    def post(self, request):
        login = request.data['login']
        password = request.data['password']

        user = User.objects.filter(login=login).first()

        if user is None:
            raise exceptions.AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise exceptions.AuthenticationFailed('Incorrect password!')

        access_token = generate_access_token(user)
        expiresIn, refresh_token = generate_refresh_token(user)

        RefreshTokens.objects.create(
            refreshToken=refresh_token, expiresIn=expiresIn, userId=user)

        response = Response()

        response.set_cookie(key='refresh_token', value=refresh_token, samesite="Lax",
                            httponly=True, max_age=REFRESH_TOKEN_TIME_IN_DAYS * 24 * 60 * 60)
        response.data = {
            'access_token': access_token
        }
        return response


class LogoutView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny, ]

    def get(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        saved_token = RefreshTokens.objects.filter(
            refreshToken=refresh_token).first()
        if saved_token is not None:
            saved_token.delete()
        response = Response()
        response.delete_cookie('refresh_token')
        response.data = {
            'message': 'success'
        }
        return response


class RefreshTokensView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny, ]

    def get(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token is None:
            raise exceptions.AuthenticationFailed(
                'Authentication credentials were not provided.')

        saved_token = RefreshTokens.objects.filter(
            refreshToken=refresh_token).first()
        if saved_token is None:
            raise exceptions.AuthenticationFailed('Token not found')

        try:
            payload = jwt.decode(refresh_token, SECRET_KEY,
                                 algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed(
                'expired refresh_token, please login again.')
        except jwt.DecodeError:
            raise exceptions.AuthenticationFailed('refresh_token  is spoiled')

        user = User.objects.filter(id=payload.get('userId')).first()
        access_token = generate_access_token(user)
        expiresIn, refresh_token = generate_refresh_token(user)
        saved_token.delete()
        RefreshTokens.objects.create(
            refreshToken=refresh_token, expiresIn=expiresIn, userId=user)

        response = Response()
        response.delete_cookie('refresh_token')
        response.set_cookie(key='refresh_token', value=refresh_token, samesite="Lax",
                            httponly=True, max_age=REFRESH_TOKEN_TIME_IN_DAYS * 24 * 60 * 60)
        response.data = {
            'access_token': access_token
        }
        return response


class UserView(APIView):
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsEmployee, ]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class TurnoutAndResults(APIView):
    authentication_classes = []
    permission_classes = [AllowAny, ]

    def get(self, request):
        maxVoters = 0
        votedNumber = 0

        for votingArea in VotingArea.objects.all():
            maxVoters += votingArea.max_people
            votedNumber += votingArea.count_voters

        turnout = round(votedNumber / maxVoters * 100, 2)

        checkedBulletins = 0

        for result in Result.objects.all():
            checkedBulletins += result.count_votes

        checkedBulletinsPercentage = round(checkedBulletins / votedNumber * 100, 2)

        candidateResults = {}

        for candidate in Result.objects.all():
            candidateResults[candidate.candidate.full_name] = round(candidate.count_votes / checkedBulletins * 100, 2)

        response = Response()

        response.data = {
            'turnout': turnout,
            'checkedBulletinsPercentage' : checkedBulletinsPercentage,
            'candidateResults' : candidateResults
        }

        return response