from django.urls import path,include
from . import views
from todo import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'tasks',views.TodoView, 'task')

urlpatterns = [
path('api/',include(router.urls)),

]