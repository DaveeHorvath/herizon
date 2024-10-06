from django.db import models
from game_units import UnitBase
from player import Player

class Enemy(UnitBase):
    # icon = img
    def __init__(self):
        self.health = 50

    def get_health(self):
        return self.health
    
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
            