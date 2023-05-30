import numpy as np
from scipy.signal import convolve2d


class Game():

    ROWS = 6
    COUMNS = 7

    def __init__(self):
        self.board = np.zeros((6, 7), int)
        self.kernels = self._detection_kernels()

    def _detection_kernels(self):
        horizontal_kernel = np.array([[1, 1, 1, 1]])
        vertical_kernel = np.transpose(horizontal_kernel)
        diag1_kernel = np.eye(4, dtype=np.uint8)
        diag2_kernel = np.fliplr(diag1_kernel)
        return [horizontal_kernel, vertical_kernel, diag1_kernel, diag2_kernel]

    def add_token(self, row, column):
        self.board[int(row)][int(column)] = 2

    def is_winning_move(self, player):
        for kernel in self.kernels:
            if (convolve2d(self.board == player, kernel, mode="valid") == 4).any():
                return True
        return False

    def show(self):
        print(self.board)
