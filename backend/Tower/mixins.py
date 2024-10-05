from rest_framework.response import Response
from rest_framework import status
from django.db.models.query import QuerySet

from .models import Tower
from Match.models import Match


class GetAllTowersMixin:
	'''
	Mixin to get all match towers.
	'''
	def get_all_towers(self) -> QuerySet:
		return Tower.objects.all().order_by('id')

class GetTowerMixin:
	'''
	Get a specific match tower.
	'''
	def get_tower(self, tower_id: int) -> Tower | Response:
		tower = Tower.objects.filter(pk=tower_id).first()
		if not tower:
			return Response({"message": "Tower not found."}, status=status.HTTP_404_NOT_FOUND)
		return tower
