from django.db import models
from game_units import UnitBase
from player import Player

class Enemy(UnitBase):
    # icon = img
    def __init__(self, name, experience, gold): # name, exp and gold parsed from the DB (or wrote)
        self.name = name
        self.health = 50
        self.experience = experience
        self.gold = gold

    def get_name(self):
        return self.name

    def get_health(self):
        return self.health
    
    def get_experience(self):
        return self.experience
    
    def get_gold(self):
        return self.gold
    
    def die(self, *players:Player):
        # p.experience += self.experience
        # p.gold += self.gold
        for player in players:
            player.add_experience(player, self.experience)
            player.check_exp(player)
            player.add_gold(player, self.gold)
        # delete it from the DB
        # del self
            
    def recieve_damage(self, *players:Player):
        group_damage = 0
        for player in players:
            group_damage += player.get_damage(player)
        self.health -= group_damage
        if self.health <= 0:
            self.die(self, players)
            