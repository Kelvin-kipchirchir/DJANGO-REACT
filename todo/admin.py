from django.contrib import admin
from .models import Todo


#creating a class
class TodoAdmin(admin.ModelAdmin):
	list_display = ("title","description","completed")


# Register your models here.
admin.site.register(Todo,TodoAdmin)