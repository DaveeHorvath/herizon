from django.forms import ModelForm
from .models import Transaction
from .models import Person

class TransactionFrom(ModelForm):
    class Meta:
        model = Transaction
        fields = ['date', 'description', 'value', 'personTo']

class ProfileForm(ModelForm):
    class Meta:
        model = Person
        fields = ['name', 'picture']
