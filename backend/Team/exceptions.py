from rest_framework.exceptions import APIException
from rest_framework import status


class TeamSetupException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'There was an error creating the Team or its players.'
    default_code = 'Team_creation_error'
