from django.db import models
from player import Player
from datetime import datetime

class Team:
    def __init__(self, player:Player):
        # self.team_id = 1 parse from DB
        self.creation_time = datetime.now().strftime("%d/%m/%Y %H:%M")
        self.total_members = 1
        self.team_size = 5
        self.members = [Player() for i in range(5)]
        player.team_lead = True
    
    # getters/setters
    
    def get_creation_time(self):
        return self.creation_time
    
    def get_total_members(self):
        return self.total_members
    
    def get_team_size(self):
        return self.team_size
    
    def show_members(self):
        return self.members
    
    # actions
    
    def add_member(self, player:Player):
        if self.total_members < self.team_size:
            self.members.append(player)
            self.total_members += 1
            
    def delete_member(self, player:Player):
        if self.total_members > 1:
            self.members.remove(player.login)
        # Deleting the group
        if (self.total_members < 1):
            del self
