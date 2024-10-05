"""bank_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from bank_app.views import home, list_transaction, new_transavction, update, delete, create_profile

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', home),
    path('update/<int:pk>/', update, name='url_update'),
    path('delete/<int:pk>/', delete, name='url_delete'),
    path('', list_transaction, name='url_list_transaction'),
    path('create/', new_transavction, name='create'),
    path('profile/create/', create_profile, name='create_profile')
]