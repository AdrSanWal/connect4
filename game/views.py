from django.shortcuts import render
import numpy as np


def game(request):
    rows = 6
    columns = 7
    start_board = np.zeros((rows, columns), int)
    start_board[5][1] = 2
    start_board[5][2] = 1
    return render(request, 'board.html', context={'start_board': start_board,
                                                  'columns': range(columns)})
