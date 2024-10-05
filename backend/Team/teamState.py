from django.db import models

class TeamState(models.IntegerChoices):
	LOBBY = 0, 'lobby'
	FINISHED = 2, 'finished'