from django.db import models
from player import Player
from datetime import datetime

class Tower:
    def __init__(self, name, lat, lon): #name, lat and lon parsed from the DB
        #sprite
        self.name = name # parsed from the db
        self.latitude = lat
        self.longitude = lon
        #self.time_since_defended = datetime.now().strftime("%d/%m/%Y %H:%M")
        self.health = 100 # %
        self.power_radius = 500 # meters
        #self.power_value = 75 # %
    
    # getters/setters
    
    def get_name(self):
        return self.name
        
    def get_location(self):
        return self.latitude, self.longitude
    
    # def get_time_since_defended(self):
    #     minutes = datetime.now().strftime("%d/%m/%Y %H:%M")
    #     self.time_since_defended = minutes - self.time_since_defended
    
    def get_health(self):
        return self.health
        
    def get_power_radius(self):
        return self.power_radius
    
    # def set_power_radius(self, radius_to_add):
    #     self.power_radius += radius_to_add
        
    def get_power_value(self):
        return self.power_value
    
    # def set_power_value(self, value_to_add):
    #     self.power_value += value_to_add
    
    # actions 
    
    # def damage_tower(self, damage):
    #     self.health -= damage
        
    # def repair_tower(self, player:Player):
    #     if player.get_gold >= 25:
    #         self.health = 100
    #         player.add_experience(100)
    #         player.add_gold(-25)
            
    def give_the_power(self, player:Player):
        player.set_damage(self.get_power_value())
            