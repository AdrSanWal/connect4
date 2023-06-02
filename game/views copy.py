import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .utils import Game
from core.models import Gameplay


game = Game()


@csrf_exempt
def start_game(request, move=None):
    if request.method == 'GET':
        # TODO: uncomment
        # # delete all rows without winnwer
        # Gameplay.objects.filter(winner='').delete()
        gameplay = Gameplay()
        gameplay.save()
        request.session['game_id'] = gameplay.pk

    if request.method == 'POST':
        data = json.loads(request.body)
        game.player = int(data['player'])
        match data['player']:
            case '1':
                move = game.make_move()
                return JsonResponse({'move': move, 'winner': game.winner})

            case '2':
                info = {f"ai_turn_{data['turn']}": data['col']}
                gameplay = Gameplay.objects.filter(pk=request.session['game_id']).update(**info)
                move = game.make_move(data['row'], data['col'])
                game.winner = game.is_winning_move()

    return render(request, 'board.html', context={'rows': game.ROWS,
                                                  'columns': game.COLUMNS,
                                                  'move': move,
                                                  'winner': game.winner})
