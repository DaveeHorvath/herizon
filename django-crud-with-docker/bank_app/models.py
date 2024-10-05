from django.db import models

# Create your models here.


class Person(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    creation = models.DateTimeField(auto_now_add=True)
    picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    def __str__(self):
        return self.name

class Transaction(models.Model):
    ind = models.AutoField(primary_key=True)
    date = models.DateTimeField()
    description = models.CharField(max_length=200)
    value = models.DecimalField(max_digits=7, decimal_places=2)
    personTo = models.ForeignKey(Person, on_delete=models.CASCADE)

    def __str__(self):
        return self.description
