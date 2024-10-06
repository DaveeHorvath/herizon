from django.db import models
from game_units import UnitBase
from player import Player
from quest import Quest

class Enemy(UnitBase):
    # icon = img
    def __init__(self, name, experience, questions:Quest): # name, and exp parsed from the DB (or wrote)
        self.name = name
        self.experience = experience
        self.questions = questions

    def get_name(self):
        return self.name
    
    def get_experience(self):
        return self.experience
    
    def die(self, *players:Player):
        for player in players:
            player.add_experience(player, self.experience)
            player.check_exp(player)
        # delete it from the DB
        del self