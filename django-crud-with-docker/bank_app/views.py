from django.shortcuts import render, redirect
from bank_app.models import Transaction
from bank_app.forms import TransactionFrom
from django.core import serializers
from django.http import JsonResponse

import json
def home(request):
    return render(request, 'home.html')


def list_transaction(request):
    SomeModel_json = serializers.serialize("json", Transaction.objects.all())
    struct = json.loads(SomeModel_json)
    data = {"transactions" : struct}
    return JsonResponse(data)


def new_transavction(request):
    form = TransactionFrom(request.POST or None)

    if form.is_valid():
        form.save()
        return redirect('url_list_transaction')
    return render(request, 'form.html', {'form': form})


def update(request, pk):
    transaction = Transacao.objects.get(pk=pk)
    form = TransacaoForm(request.POST or None, instance=transaction)

    if form.is_valid():
        form.save()
        return redirect('url_list_transaction')
    return render(request, 'form.html', {'form': form, 'transacao': transacao})


def delete(request, pk):
    transaction = Transacao.objects.get(pk=pk)
    transaction.delete()
    return redirect('url_list_transaction')

def create_profile(request):
    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES)
        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = request.user
            profile.save()
            return redirect('profile')
    else:
        form = ProfileForm()
    return render(request, 'form.html', {'form': form})