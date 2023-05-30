from django.db import models


# Create your models here.
class Gameplay(models.Model):
    player = [('p', 'player'), ('a', 'ai')]
    ai_turn_1 = models.CharField(max_length=2)
    ai_turn_2 = models.CharField(max_length=4)
    ai_turn_3 = models.CharField(max_length=6)
    ai_turn_4 = models.CharField(max_length=8)
    ai_turn_5 = models.CharField(max_length=10)
    ai_turn_6 = models.CharField(max_length=12)
    ai_turn_7 = models.CharField(max_length=14)
    ai_turn_8 = models.CharField(max_length=16)
    ai_turn_9 = models.CharField(max_length=18)
    ai_turn_10 = models.CharField(max_length=20)
    ai_turn_11 = models.CharField(max_length=22)
    ai_turn_12 = models.CharField(max_length=24)
    ai_turn_13 = models.CharField(max_length=26)
    ai_turn_14 = models.CharField(max_length=28)
    ai_turn_15 = models.CharField(max_length=30)
    ai_turn_16 = models.CharField(max_length=32)
    ai_turn_17 = models.CharField(max_length=34)
    ai_turn_18 = models.CharField(max_length=36)
    ai_turn_19 = models.CharField(max_length=38)
    ai_turn_20 = models.CharField(max_length=40)
    ai_turn_21 = models.CharField(max_length=42)
    winner = models.CharField(max_length=1, choices=player)
