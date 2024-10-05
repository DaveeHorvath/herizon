"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
	https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
	1. Add an import:  from my_app import views
	2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
	1. Add an import:  from other_app.views import Home
	2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
	1. Import the include() function: from django.urls import include, path
	2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from User.views import UserDetailView, \
						UserListView, \
						UserProfilePictureView, \
						UserLoginView, \
						UserLogoutView

from Friends.views import FriendsListView, \
						FriendshipDetailView

from Match.views import MatchView, \
						MatchDetailView

from Tower.views import TowerListView, \
							TowerDetailView

from Team.views import TeamListView, \
								TeamDetailView, \
								TeamMatchListView, \
								TeamMatchDetailView


urlpatterns = [
	path('api/admin/', admin.site.urls),

	# User views
	path('api/users/', UserListView.as_view()),
	path('api/users/<int:user_id>', UserDetailView.as_view()),
	path('api/users/<int:user_id>/profile_pictures/', UserProfilePictureView.as_view()),
	path('api/login/', UserLoginView.as_view()),
	path('api/logout/', UserLogoutView.as_view()),

	# Friends views
	path('api/friends/', FriendsListView.as_view()),
	path('api/friends/<int:friend_id>', FriendshipDetailView.as_view()),

	# Match Views
	path('api/match/', MatchView.as_view()),
	path('api/matches/<int:match_id>/', MatchDetailView.as_view()),

	# Player views
	path('api/tower/', TowerListView.as_view()),
	path('api/tower/<int:tower>', TowerDetailView.as_view()),

	# Team views
	path('api/teams/', TeamListView.as_view()),
	path('api/teams/<int:team_id>', TeamDetailView.as_view()),
	path('api/teams/<int:team_id>/players/', TeamPlayerListView.as_view()),
	path('api/teams/<int:team_id>/players/<int:teamplayer_id>', TeamPlayerDetailView.as_view()),
	path('api/teams/<int:team_id>/matches/', TeamMatchListView.as_view()),
	path('api/teams/<int:team_id>/matches/<int:team_match_id>', TeamMatchDetailView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

