from django.db import models

class Tower(models.Model):
    name = models.CharField(max_length=100)
    sprite = models.CharField(max_length=1000) ##url images
    latitude = models.FloatField()
    longitude = models.FloatField()
    def __str__(self):
        return self.name