import numpy as np
from scipy.signal import convolve2d


class Game():

    ROWS = 6
    COLUMNS = 7
    winner = False

    def __init__(self):
        self.board = np.zeros((6, 7), int)
        self.kernels = self._detection_kernels()
        self.player = None

    def restart_board(self):
        self.board = np.zeros((6, 7), int)

    def _detection_kernels(self):
        horizontal_kernel = np.array([[1, 1, 1, 1]])
        vertical_kernel = np.transpose(horizontal_kernel)
        diag1_kernel = np.eye(4, dtype=np.uint8)
        diag2_kernel = np.fliplr(diag1_kernel)
        return [horizontal_kernel, vertical_kernel, diag1_kernel, diag2_kernel]

    def add_token(self, row, column):
        self.board[int(row)][int(column)] = self.player

    def _last_empty_row(self, column):
        board_first_zeros = (self.board[::-1] == 0).argmax(axis=0)
        first_zeros = [5 - i for i in board_first_zeros]
        return int(first_zeros[column])

    def is_winning_move(self):
        for kernel in self.kernels:
            if (convolve2d(self.board == self.player, kernel, mode="valid") == 4).any():
                return True
        return False

    def make_move(self, column=None):
        if column is None:
            from random import randrange
            column = randrange(0, 7)
        row = self._last_empty_row(column)
        return row, column

    def show(self):
        print(self.board)
