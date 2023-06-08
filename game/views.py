import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .utils import Game, PlayerCPU, PlayerIA
from core.models import Gameplay, GameWinner


game = Game()


@csrf_exempt
def start_game(request, move=None):
    if request.method == 'HEAD':
        if int(request.GET.get('oponent')):  # if True ia, else cpu
            game.computer = PlayerIA(game)
        else:
            game.computer = PlayerCPU(game)
        game.starts = int(request.GET.get('starts'))

    if request.method == 'GET':
        # restart board
        game.restart_board()
        # delete all rows without winnwer
        Gameplay.objects.filter(winner=None).delete()
        gameplay = Gameplay()
        gameplay.save()
        request.session['game_id'] = gameplay.pk

    if request.method == 'POST':
        data = json.loads(request.body)
        game.player = int(data['playerId'])
        match game.player:
            case 1:  # cpu
                move = game.make_move()
            case 2:  # user
                move = game.make_move(column=int(data['col']))
                game.last_move = int(data['col'])
        info = {f"ai_turn_{data['turn']}": move[1]}
        Gameplay.objects.filter(pk=request.session['game_id']).update(**info)
        game.add_token(*move)
        game.turn += 1
        game.winner = game.is_winning_game()
        # game.show()

        if game.winner:
            GameWinner(game_winner=game.winner, turns=game.turn).save()

            g = Gameplay.objects.get(pk=request.session['game_id'])
            g.winner = game.winner == game.starts
            g.save_game()

        return JsonResponse({'move': move, 'winner': game.winner})

    return render(request, 'board.html', context={'rows': game.ROWS,
                                                  'columns': game.COLUMNS})
