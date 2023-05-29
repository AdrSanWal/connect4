from django.shortcuts import render
import numpy as np


def game(request):
    rows = 6
    columns = 7
    start_board = np.zeros((rows, columns), int)
    start_board[0][1] = 2
    return render(request, 'board.html', context={'start_board': start_board,
                                                  'columns': range(columns)})
