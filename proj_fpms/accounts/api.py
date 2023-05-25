from .models import Profile, User
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import redirect, get_object_or_404

from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import PassChangeSerializer, ResetPassSerializer, UserSerializer, LoginSerializer, RegisterSerializer, ProfileSerializer
from .utils import Util
from django.urls import reverse
from .custom_permissions import isTheSameUser

import string
from random import *
characters = string.ascii_letters + string.punctuation  + string.digits

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    authentication_classes = []

    def post(self, request, format=None, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        token = AuthToken.objects.create(user)[1]

        current_site = get_current_site(request).domain
        relativeLink = reverse('email-verify')
        absurl = 'http://' + current_site + \
            relativeLink + "?token=" + str(token)
        email_body = "Hi " + user.username + \
            "! Use the link below to verify your email. If it's not you, you can just ignore this message. \n" + absurl
        data = {'email_body': email_body,
                'email_subject': "Verify your Paperclip account",
                'to_email': user.email}
        Util.send_email(data)

        user.registerToken = str(token)
        user.is_active = False
        user.save()

        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            #  "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class GetUserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GetProfileAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated | isTheSameUser]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer



class VerifyEmail(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get('token')
        #user = get_object_or_404(User, registerToken=token)
        user = User.objects.get(registerToken=token)
        print(token)
        print(user)
        user.is_active = True
        user.registerToken = "".join(choice(characters) for x in range(randint(8, 16)))
        user.save()
        return redirect('/')

class ResetPass(generics.GenericAPIView):
    serializer_class = ResetPassSerializer
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        password =  "".join(choice(characters) for x in range(randint(8, 16)))
        
        email_body = "Hello " + user.username + \
            ". Use the following OTP to reset your password. \n username: " + user.username +"\n password: " + password 
        data = {'email_body': email_body,
                'email_subject': "Reset paperclip password",
                'to_email': user.email}
        Util.send_email(data)

        user.otp = password
        user.save()

        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data
        })


class ResetPassConfirm(generics.GenericAPIView):
    serializer_class = PassChangeSerializer
    authentication_classes = []
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user.set_password(request.data['newPass'])
        password =  "".join(choice(characters) for x in range(randint(8, 16)))
        user.otp = password
        user.save()

        return redirect('/')
        



