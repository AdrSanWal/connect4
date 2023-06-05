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
        # restart board
        game.restart_board()
        # TODO: uncomment
        # # delete all rows without winnwer
        # Gameplay.objects.filter(winner='').delete()
        gameplay = Gameplay()
        gameplay.save()
        request.session['game_id'] = gameplay.pk

    if request.method == 'POST':
        data = json.loads(request.body)
        game.player = int(data['playerId'])
        match game.player:
            case 1:  # cpu
                move = game.make_move()
                game.add_token(*move)
                game.winner = game.is_winning_move()
                game.show()
                return JsonResponse({'move': move, 'winner': game.winner})

            case 2:  # user
                column = int(data['col'])
                # info = {f"ai_turn_{data['turn']}": column}
                # gameplay = Gameplay.objects.filter(pk=request.session['game_id']).update(**info)
                move = game.make_move(column)
                game.add_token(*move)
                game.winner = game.is_winning_move()
                game.show()
                return JsonResponse({'move': move, 'winner': game.winner})

    return render(request, 'board.html', context={'rows': game.ROWS,
                                                  'columns': game.COLUMNS})
