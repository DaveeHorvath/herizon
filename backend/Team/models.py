from django.db import models
from django.utils import timezone

from User.models import User
from .TeamState import TeamState

class Team(models.Model):
	host_user = models.ForeignKey(User, related_name='Team_hosts', on_delete=models.CASCADE)
	name = models.CharField(max_length=30, null=True, blank=True, default=None)
	state = models.IntegerField(choices=TeamState.choices, default=TeamState.LOBBY)
	next_match = models.IntegerField(default=0)
	player_amount = models.PositiveIntegerField(null=False, blank=False)
	winner = models.ForeignKey(User, related_name='Team_winners', on_delete=models.CASCADE, null=True, blank=True, default=None)

	insert_ts = models.DateTimeField(auto_now_add=True)
	start_ts = models.DateTimeField(null=True, blank=True)
	end_ts = models.DateTimeField(null=True, blank=True)
	update_ts = models.DateTimeField(auto_now=True)

	expire_ts = models.DateTimeField(null=True, blank=True)

	def start_Team(self):
		if self.state == TeamState.LOBBY:
			self.state = TeamState.IN_PROGRESS
			self.start_ts = timezone.now()
			self.save()

	def finish_Team(self):
		if self.state == TeamState.IN_PROGRESS:
			self.state = TeamState.FINISHED
			self.end_ts = timezone.now()
			self.save()

	def abort_Team(self):
		if self.state in (TeamState.LOBBY, TeamState.IN_PROGRESS):
			self.state = TeamState.ABORTED
			self.end_ts = timezone.now()
			self.save()

	def __str__(self):
		# The method to retrieve the human-readable representation of an IntegerChoices enumeration is get_FOO_display(), where FOO is the name of the field.
		return f'Team {self.pk} - {self.get_state_display()}'


class TeamPlayer(models.Model):
	Team = models.ForeignKey(Team, related_name='players', on_delete=models.CASCADE)
	user = models.ForeignKey(User, related_name='Team_players', on_delete=models.CASCADE)
	display_name = models.CharField(max_length=30, null=True, blank=True, default=None)

	class Meta:
		unique_together = ('Team', 'user')
