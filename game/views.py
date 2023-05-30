import json

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import numpy as np

from .utils import Game
from core.models import Gameplay


ROWS = 6
COLUMNS = 7

board = Game()


@csrf_exempt
def start_game(request):

    if request.method == 'GET':
        # TODO: uncomment
        # # delete all rows without winnwer
        # Gameplay.objects.filter(winner='').delete()

        game = Gameplay()
        game.save()
        request.session['game_id'] = game.pk
        print(board)

    if request.method == 'POST':
        data = json.loads(request.body)

        game_info = {f"ai_turn_{data['turn']}": data['col']}
        game = Gameplay.objects.filter(pk=request.session['game_id']).update(**game_info)

        # board[int(data['row'])][int(data['col'])] = 2
        board.add_token(data['row'], data['col'])

        print(board.is_winning_move(2))

    return render(request, 'board.html', context={'rows': ROWS, 'columns': COLUMNS})
