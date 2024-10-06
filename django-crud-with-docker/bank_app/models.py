from django.db import models

# Create your models here.


class Person(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    password = models.CharField(max_length=100)
    creation = models.DateTimeField(auto_now_add=True)

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

class Tower(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    health = models.IntegerField()
    damage_boost = models.IntegerField(default=2) 

    def __str__(self):
        return self.name

class Monster(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    health = models.IntegerField()
    exp = models.IntegerField()

    def __str__(self):
        return self.name