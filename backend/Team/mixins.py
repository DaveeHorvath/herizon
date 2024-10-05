from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status

from .models import Team
from .serializers import TeamSerializers
from .managers import TeamManager
from .exceptions import TeamInProgressException
from .teamState import TeamState
from User.models import User
from User.mixins import AuthenticateUserMixin
from Tokens.mixins import CreateTeamMatchTokenMixin


class CreateTeamMixin:
	"""
	Mixin for creating a team.
	Will create a team and a team player for the host.
	"""
	def create_team(self, request: Request) -> Response:
		body_data = request.data.copy()
		body_data['host_user'] = request.user.id

		team_creation_serializer = TeamSerializers.creation(data=body_data)
		if not team_creation_serializer.is_valid():
			return Response({"message": "Invalid request for team creation"}, status=status.HTTP_400_BAD_REQUEST)

		try:
			team = TeamManager.create_team_and_team_player_for_host(team_creation_serializer.validated_data)
			if not team:
				return Response({"message" : "Team was not found"}, status=status.HTTP_404_NOT_FOUND)
			host_team_player_serializer = TeamSerializers.player(team.players.all().first())
			return Response({
				'team': TeamSerializers.default(team).data,
				'team_player': host_team_player_serializer.data
			}, status=status.HTTP_201_CREATED)
		except Exception as e:
			return Response({"message": "Creating a team failed"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TeamDetailMixin:
	"""
	Mixin for getting team details.
	The response will have a different team serializer depending
	on if the user is the host of the ongoing team or not.
	"""
	def get_team_details(self, request: Request, team_id: int) -> Response:
		team = Team.objects.filter(id=team_id).first()
		if not team:
			return Response({"message" : f"Team {team_id} not found."}, status=status.HTTP_404_NOT_FOUND)
		if request.user == team.host_user and team.state == TeamState.IN_PROGRESS:
			serializer = TeamSerializers.in_progress(team)
		else:
			serializer = TeamSerializers.default(team)
		return Response(serializer.data, status=status.HTTP_200_OK)

class ChangeTeamStateMixin:
	"""
	Mixin for changing a team's state.
	If team's state is LOBBY, start team.
	If team's state is IN_PROGRESS, abort team.
	"""
	def change_team_state(self, team_id: int) -> Response:
		team = Team.objects.get(id=team_id)
		if team.state == TeamState.LOBBY:
			try:
				TeamManager.start_team(team)
				serializer = TeamSerializers.in_progress(team)
				return Response(serializer.data, status=status.HTTP_200_OK)
			except Exception as e:
				return Response({"message": "Starting team failed."}, status=status.HTTP_400_BAD_REQUEST)

		elif team.state == TeamState.IN_PROGRESS:
			TeamManager.abort_team(team)
			return Response({"message": "Team has been aborted."}, status=status.HTTP_200_OK)

class AbortTeamMixin:
	"""
	Abort team whose state is LOBBY or IN_PROGRESS.
	"""
	def abort_team(self, team_id: int) -> Response:
		team = Team.objects.filter(id=team_id).first()
		TeamManager.abort_team(team)
		return Response({"message": "Team has been aborted."}, status=status.HTTP_200_OK)

class GetTeamPlayersMixin:
	"""
	Mixin for getting a specific team's players.
	"""
	def get_team_players(self, team_id: int) -> Response:
		team = Team.objects.filter(id=team_id).first()
		if not team:
			return Response({"message" : f"Team {team_id} not found."}, status=status.HTTP_404_NOT_FOUND)
		team_players = team.players.all().order_by('id')
		team_players_serializers = TeamSerializers.player(team_players, many=True)
		return Response(team_players_serializers.data, status=status.HTTP_200_OK)
	
class CreateTeamPlayerMixin(AuthenticateUserMixin):
	"""
	Mixin for creating a player for a team.
	"""
	def create_team_player(self, request: Request, team_id: int) -> Response:
		result = self.authenticate_user(request)
		if not isinstance(result, User):
			response = result
			return response
		
		team = Team.objects.get(id=team_id)
		if team.players.count() >= team.player_amount:
			return Response({"message": "Team already has maximum number of players"}, status=status.HTTP_400_BAD_REQUEST)

		user = result
		username = user.username
		display_name = request.data.get('display_name', None)
		try:
			team_player = TeamManager.create_team_player(team, user, display_name or username)
			team_player_serializer = TeamSerializers.player(team_player)
			return Response(team_player_serializer.data, status=status.HTTP_201_CREATED)
		except Exception as e:
			return Response({"message": "Creating a team player failed"}, status=status.HTTP_400_BAD_REQUEST)

class TeamPlayerDetailMixin:
	"""
	Mixin for getting team player details.
	"""
	def get_team_player_details(self, team_id: int, teamplayer_id: int) -> Response:
		team = Team.objects.filter(id=team_id).first()
		team_player = team.players.filter(id=teamplayer_id).first()
		if not team_player:
			return Response({"message": f"Team {team.id} does not have teamplayer with id {teamplayer_id}"}, status=status.HTTP_404_NOT_FOUND)

		team_player_serializer = TeamSerializers.player(team_player)
		return Response(team_player_serializer.data, status=status.HTTP_200_OK)

class DeleteTeamPlayerMixin:
	"""
	Mixin for deleting a team player from team in LOBBY state.
	"""
	def delete_team_player(self, request: Request, team_id: int, teamplayer_id: int) -> Response:
		team = Team.objects.get(id=team_id)
		team_player = team.players.filter(id=teamplayer_id).first()
		if not team_player:
			return Response({"message": f"Team {team.id} does not have teamplayer with id {teamplayer_id}"}, status=status.HTTP_404_NOT_FOUND)

		if team_player.user == request.user:
			return Response({"message": "Cannot delete host team player"}, status=status.HTTP_404_NOT_FOUND)
		team_player.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class GetTeamMatchesMixin:
	"""
	Mixin for getting list of matches in a specific team.
	"""
	def get_team_matches(self, team_id: int) -> Response:
		team = Team.objects.filter(id=team_id).first()
		if not team:
			return Response({"message" : f"Team {team_id} not found."}, status=status.HTTP_404_NOT_FOUND)
		team_matches = team.matches.all().order_by('id')
		team_match_serializers = TeamSerializers.match(team_matches, many=True)
		return Response(team_match_serializers.data, status=status.HTTP_200_OK)

class TeamMatchDetailMixin(CreateTeamMatchTokenMixin):
	"""
	Mixin for getting details of a specific match in a team.
	If the requester is the host of the team in IN_PROGRESS state
	and the match is the next match to be played in the team, returns the match game url.
	"""
	def get_team_match_details(self, request: Request, team_id: int, team_match_id: int) -> Response:
		team = Team.objects.get(id=team_id)
		if not team:
			return Response({"message" : f"Team {team_id} not found"}, status=status.HTTP_404_NOT_FOUND)
		team_matches = team.matches.all().order_by('id')
		if team_match_id >= team_matches.count():
			return Response({"message": f"Team {team_id} does not have {team_match_id} match"}, status=status.HTTP_404_NOT_FOUND)

		if request.user == team.host_user \
			and team.state == TeamState.IN_PROGRESS \
			and team_matches.filter(state=TeamState.FINISHED).count() == team_match_id:

			try:
				TeamManager.raise_error_if_team_has_expired(team)
				TeamManager.raise_error_if_inactive_user_in_team(team)
			except TeamInProgressException as e:
				TeamManager.abort_team(team)
				return Response({"message" : f"{str(e)}; team aborted!"}, status=status.HTTP_400_BAD_REQUEST)

			if team_matches[team_match_id].state != TeamState.LOBBY:
				return Response({"message": f"The team match {team_match_id} is not in LOBBY state"}, status=status.HTTP_400_BAD_REQUEST)
			next_match = team_matches[team_match_id]
			token = self.create_team_match_token(next_match)
			pong_match_url = f'wss://localhost:8443/pong/{next_match.id}?token={token.token}'
			return Response(pong_match_url, status=status.HTTP_200_OK)

		else:
			team_match_serializer = TeamSerializers.match(team_matches[team_match_id])
			return Response(team_match_serializer.data, status=status.HTTP_200_OK)

class ChangeDeletedUserTeamNamesMixin:
	"""
    Mixin that changes a user's teamplayers' display names to deleted_user.
	Use only when deleting a user.
    """
	def change_team_player_names_to_deleted(self, user: User) -> None:
		team_players = user.team_players.all()
		for player in team_players:
			player.display_name = "deleted_user"
			player.save()
