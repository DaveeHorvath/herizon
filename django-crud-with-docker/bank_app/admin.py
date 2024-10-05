from django.contrib import admin
from .models import Person
from .models import Transaction

# Register your models here.

admin.site.register(Person)
admin.site.register(Transaction)