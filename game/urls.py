from django.urls import path

from . import views

urlpatterns = [
    path('', views.start_game, name='start_game'),
    path('stats', views.get_stats, name='start_game'),
]
