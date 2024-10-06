from django.contrib import admin
from .models import Person
from .models import Transaction, Tower, Monster

# Register your models here.

admin.site.register(Person)
admin.site.register(Transaction)
admin.site.register(Tower)
admin.site.register(Monster)