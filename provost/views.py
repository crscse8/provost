from os import listdir
from os.path import isfile, isdir, join
from django.views.generic.base import View
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from subprocess import Popen, PIPE
from django.urls import include, path
import psutil
import signal

########################################################################
class Home(View):
    template = "home.html"

    def get(self, request):
        """"""
        user = authenticate(username='user', password='djangoforandroid')
        login(request, user)

        return render(request, self.template, locals())

########################################################################
class ServiceList(View):

    # CREATE (Crud)
    def put(self, request):
      return render(request, "service_create.html", locals())

    # LIST
    def get(self, request):
      #onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
      pid = Popen(["/bin/sleep", "3600"]).pid
      current_process = psutil.Process()
      processes = current_process.children(recursive=True)
      return render(request, "service_list.html", locals())

class ServiceName(View):

    # UPDATE (crUd)
    def post(self, request):
      #onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
      return render(request, "service_update.html", locals())

    # DELETE (cruD)
    def delete(self, request):
      #onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
      return render(request, "service_delete.html", locals())

    # READ (cRud)
    def get(self, request):
      #onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
      return render(request, "service_read.html", locals())


