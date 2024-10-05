from django.db import transaction
from django.utils import timezone
from datetime import timedelta

from .models import Team, TeamPlayer
from .serializers import TeamCreationSerializer
from .exceptions import TeamSetupException, TeamInProgressException
from .teamState import TeamState
from .teamMacros import Team_EXPIRY_TIME_SECONDS
from User.models import User
from Match.models import Match
from Match.matchState import MatchState
from Player.models import Player

class TeamManager:
    @staticmethod
    def create_team_and_team_player_for_host(validated_data: TeamCreationSerializer.validated_data):
        try:
            with transaction.atomic():
                team = Team.objects.create(
                    name=validated_data.get('name', None),
                    host_user=validated_data['host_user'],
                    player_amount=validated_data['player_amount'],
                    expire_ts=timezone.now() + timedelta(Team_EXPIRY_TIME_SECONDS),
                )

                display_name = validated_data.get('host_user_display_name', None)
                username = team.host_user.username
                try:
                    TeamManager.create_team_player(team, team.host_user, display_name or username)
                except Exception as e:
                    team.delete()
                    raise Exception(e)

                return team

        except Exception as e:
            raise TeamSetupException(e)

    @staticmethod
    def setup_team_matches(team: Team) -> None:
        if team.state != TeamState.LOBBY or team.next_match != 0:
            raise TeamSetupException("Team is not in a valid state to set up matchups.")

        team_players = list(team.players.all())
        if len(team_players) != team.player_amount:
            raise TeamSetupException("The number of team_players does not match the expected player amount.")

        match_amount = team.player_amount - 1
        if match_amount not in [3, 7]:
            raise TeamSetupException("Match amount can only be 3 or 7.")

        try:
            with transaction.atomic():

                # assignment of players to initial matches are done based on the order of the TeamPlayers
                # if you want to set the players for the initial matches based on some other algorithm, replace this part
                for i in range(0, len(team_players), 2):
                    match = Match.objects.create(
                        team=team
                    )
                    Player.objects.create(
                        user=team_players[i].user,
                        match=match
                    )
                    Player.objects.create(
                        user=team_players[i+1].user,
                        match=match
                    )

                # create the rest of the team matches
                # the match winners will be assigned to them later
                for unfilled_matches in range(len(team_players) // 2, match_amount):
                    Match.objects.create(
                        team=team
                    )

        except Exception as e:
            raise TeamSetupException(f"An error occurred while setting up matchups: {e}")

    @staticmethod
    def start_team(team: Team) -> TeamCreationSerializer:
        player_amount = team.players.count()
        if player_amount != team.player_amount:
            raise TeamSetupException(f"Team must have {team.player_amount} players to start, but currently it has {player_amount} players.")
        TeamManager.setup_team_matches(team)
        team.start_team()
        team.save()


    @staticmethod
    def raise_error_if_team_has_expired(team: Team) -> None:
        if timezone.now() > team.expire_ts:
            raise TeamInProgressException(f"Team not finished in time")

    @staticmethod
    def raise_error_if_inactive_user_in_team(team: Team) -> None:
        team_players = TeamPlayer.objects.filter(team=team)
        inactive_users = team_players.filter(user__is_active=False)
        if inactive_users.exists():
            raise TeamInProgressException(f"A user in the unfinished team has deleted their account")

    @staticmethod
    def abort_team(team: Team) -> None:
        team.abort_team()
        TeamManager.abort_team_matches(team)
