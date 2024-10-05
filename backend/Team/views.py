from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from django.utils.decorators import method_decorator

from .teamState import TeamState
from .mixins import (
	CreateTeamMixin, TeamDetailMixin, ChangeTeamStateMixin,
	AbortTeamMixin, GetTeamPlayersMixin, CreateTeamPlayerMixin,
	TeamPlayerDetailMixin, DeleteTeamPlayerMixin, GetTeamMatchesMixin,
	TeamMatchDetailMixin
)
from shared_utilities.decorators import must_be_authenticated, validate_team_request


class TeamListView(APIView, CreateTeamMixin):
	@method_decorator(must_be_authenticated)
	def post(self, request: Request) -> Response:
		return self.create_team(request)

class TeamDetailView(APIView, TeamDetailMixin, ChangeTeamStateMixin, AbortTeamMixin):
	@method_decorator(must_be_authenticated)
	def get(self, request: Request, team_id: int) -> Response:
		return self.get_team_details(request, team_id)

	@method_decorator(must_be_authenticated)
	def patch(self, request: Request, team_id: int) -> Response:
		return self.change_team_state(team_id)

	@method_decorator(must_be_authenticated)
	def delete(self, request: Request, team_id: int) -> Response:
		return self.abort_team(team_id)

class TeamPlayerListView(APIView, GetTeamPlayersMixin, CreateTeamPlayerMixin):
	@method_decorator(must_be_authenticated)
	def get(self, request: Request, team_id: int) -> Response:
		return self.get_team_players(team_id)

	@method_decorator(must_be_authenticated)
	def post(self, request: Request, team_id: int) -> Response:
		return self.create_team_player(request, team_id)

class TeamPlayerDetailView(APIView, TeamPlayerDetailMixin, DeleteTeamPlayerMixin):
	@method_decorator(must_be_authenticated)
	def get(self, request, team_id, teamplayer_id):
		self.get_team_player_details(team_id, teamplayer_id)

	@method_decorator(must_be_authenticated)
	def delete(self, request, team_id, teamplayer_id):
		return self.delete_team_player(request, team_id, teamplayer_id)

class TeamMatchListView(APIView, GetTeamMatchesMixin):
	@method_decorator(must_be_authenticated)
	def get(self, request: Request, team_id: int) -> Response:
		return self.get_team_matches(team_id)

class TeamMatchDetailView(APIView, TeamMatchDetailMixin):
	@method_decorator(must_be_authenticated)
	def get(self, request, team_id, team_match_id):
		return self.get_team_match_details(request, team_id, team_match_id)

