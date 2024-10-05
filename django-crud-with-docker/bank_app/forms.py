from django.forms import ModelForm
from .models import Transaction

class TransactionFrom(ModelForm):
    class Meta:
        model = Transaction
        fields = ['date', 'description', 'value', 'personTo']
