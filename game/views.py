import json

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from core.models import Gameplay


@csrf_exempt
def start_game(request):
    rows = 6
    columns = 7

    if request.method == 'GET':
        game = Gameplay()
        game.save()
        request.session['game_id'] = game.pk

    if request.method == 'POST':
        data = json.loads(request.body)

        game_info = {f"ai_turn_{data['turn']}": data['col']}
        game = Gameplay.objects.filter(pk=request.session['game_id']).update(**game_info)

        # match data['turn']:
        #     case 1:
        #         game.ai_turn_1 = data['col']
        #     case 2:
        #         game.ai_turn_2 = data['col']
        #     case 3:
        #         game.ai_turn_3 = data['col']
        #     case 4:
        #         game.ai_turn_4 = data['col']

    return render(request, 'board.html', context={'rows': rows, 'columns': columns})
