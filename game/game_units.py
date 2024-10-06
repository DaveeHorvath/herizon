from django.db import models

class UnitBase:
    gold = 0
    experience = 0
    latitude = 100
    longitude = 100
    
    def get_location(self):
        return self.latitude, self.longitude
    
    def set_location(self, new_x, new_y):
        self.latitude = new_x
        self.longitude = new_y       
