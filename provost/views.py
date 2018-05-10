from django.views.generic.base import View
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from subprocess import Popen, PIPE
import psutil
import signal

########################################################################
class Home(View):
    template = "home.html"

    #----------------------------------------------------------------------
    def get(self, request):
        """"""
        user = authenticate(username='user', password='djangoforandroid')
        login(request, user)

        return render(request, self.template, locals())
