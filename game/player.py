from django.db import models
from game_units import UnitBase
from enemy import Enemy
from tower import Tower

class Player(UnitBase):
    # icon = img
    
    def __init__(self, login): 
        self.login = login
        self.level = 1
        #self.current_team_id = -1
        #self.team_lead = False
       # self.damage = 25
    
    # getters/setters
    
    def get_login(self):
        return self.login
    
    def get_experience(self):
        return self.experience

    def add_experience(self, exp_to_add):
        self.experience += exp_to_add
  
    def get_level(self):
        return self.level
        
    # def get_gold(self):
    #     return self.gold
    
    # def add_gold(self, gold_to_add):
    #     self.gold += gold_to_add
        
    # def get_team(self):
    #     return self.current_team
    
    # def set_team(self, team_name):
    #     self.current_team = team_name
        
    # def get_damage(self):
    #     return self.damage
    
    # def set_damage(self, damage_to_add):
    #     self.damage += damage_to_add
        
    # actions
        
    # def check_exp(self):
    #     if (self.level == 1 or self.level == 2 and self.experience >= 500) or (self.level >= 3 and self.experience >= 1000):
    #         self.lvl_up(self)

    # def lvl_up(self):
    #     if (self.level == 1 or self.level == 2):
    #         self.experience -= 500
    #     else:
    #         self.experience -= 1000
    #     self.level += 1
            
    def click_to_enemy(self, enemy:Enemy):
        # show info about this enemy: location, and health
        # if you are a team leader you see the "Attack" button and you can press it if the team has enough members
        enemy_location = enemy.get_location(enemy)
        #enemy_health = enemy.get_health(enemy)
        return enemy_location
        # if self.team_lead == True:
        #   button.is_showed = True
        # if button.is_showed == True and team.members >= 2
        #   button.is_active = True
        
    # checker
    # def is_inside_tower(self, tower:Tower):
    #     cur_location = self.get_location()
    #     tower_location = tower.get_location()
    #     if (cur_location[0] >= tower_location[0] - tower.power_radius \
    #         and cur_location[0] <= tower_location[0] + tower.power_radius) \
    #         and (cur_location[1] >= tower_location[1] - tower.power_radius \
    #         and cur_location[1] <= tower_location[1] + tower.power_radius):
    #             return True
    #     return False
    
    # def check_all_towers(self, *towers:Tower):
    #     for tower in towers:
    #         if self.is_inside_tower(tower):
    #             tower.give_the_power(self)
    #             return tower.get_name()
    #     return "You are not in a tower area!"