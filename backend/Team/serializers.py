from rest_framework import serializers

from .models import Team, TeamPlayer
from Match.models import Match
from Match.matchState import MatchState


class TeamSerializer(serializers.ModelSerializer):
	state_display = serializers.CharField(source='get_state_display', read_only=True)

	class Meta:
		model = Team
		fields = ['id', 'name', 'state_display', 'player_amount']

class TeamPlayerSerializer(serializers.ModelSerializer):
	class Meta:
		model = TeamPlayer
		fields = ['id', 'user', 'display_name']

class TeamMatchSerializer(serializers.ModelSerializer):
	Team_match_id = serializers.SerializerMethodField()
	state = serializers.CharField(source='get_state_display', read_only=True)
	Team_player_left = serializers.SerializerMethodField()
	Team_player_right = serializers.SerializerMethodField()
	winner = serializers.SerializerMethodField()
	class Meta:
		model = Match
		fields = ['Team_match_id', 'id', 'state', 'Team_player_left', 'Team_player_right', 'winner']

	def get_Team_match_id(self, match: Match) -> int:
		matches = match.Team.matches.all().order_by('id')
		match_ids = list(matches.values_list('id', flat=True))
		return match_ids.index(match.id)

	def get_Team_player_left(self, match: Match) -> TeamPlayerSerializer | None:
		first_player = match.players.first()
		if first_player:
			Team_player = TeamPlayer.objects.filter(
				Team=match.Team,
				user=first_player.user
			).first()
			return TeamPlayerSerializer(Team_player).data if Team_player else None
		return None

	def get_Team_player_right(self, match: Match) -> TeamPlayerSerializer | None:
		second_player = match.players.all()[1] if match.players.count() > 1 else None
		if second_player:
			Team_player = TeamPlayer.objects.filter(
				Team=match.Team,
				user=second_player.user
			).first()
			return TeamPlayerSerializer(Team_player).data if Team_player else None
		return None

	def get_winner(self, match: Match) -> TeamPlayerSerializer | None:
		if match.state == MatchState.FINISHED:
			winning_player = match.players.filter(match_winner=True).first()
			if winning_player:
				winning_Team_player = TeamPlayer.objects.filter(
					Team=match.Team,
					user=winning_player.user
				).first()
				return TeamPlayerSerializer(winning_Team_player).data if winning_Team_player else None
		return None

class TeamCreationSerializer(serializers.ModelSerializer):
	host_user_display_name = serializers.CharField(required=False, allow_blank=True, allow_null=True)

	class Meta:
		model = Team
		fields = [
			'name',
			'host_user',
			'host_user_display_name',
			'player_amount',
		]

	def validate_custom_name(self, custom_name: str) -> str:
		if custom_name == '':
			raise serializers.ValidationError("This field may not be blank.")
		if len(custom_name) > 30:
			raise serializers.ValidationError("Ensure this field has no more than 30 characters.")
		return custom_name

	def validate_Team_player_amount(self, player_amount: int) -> None:
		if player_amount not in [4, 8]:
			raise serializers.ValidationError("Must have 4 or 8 players.")

	def validate(self, data):
		Team_name = data.get('name')
		if Team_name:
			self.validate_custom_name(Team_name)
		# TODO: hostname should suffice
		host_user_display_name = data.get('host_user_display_name')
		if host_user_display_name:
			self.validate_custom_name(host_user_display_name)

		self.validate_Team_player_amount(data.get('player_amount'))

		return data

class TeamInProgressSerializer(serializers.ModelSerializer):
	state = serializers.CharField(source='get_state_display', read_only=True)

	class Meta:
		model = Team
		fields = [
			'id',
			'host_user',
			'name',
			'state',
			'expire_ts',
			'player_amount',
			'next_match',
		]

class TeamSerializers:
	default = TeamSerializer
	creation = TeamCreationSerializer
	in_progress = TeamInProgressSerializer
	player = TeamPlayerSerializer
	match = TeamMatchSerializer
