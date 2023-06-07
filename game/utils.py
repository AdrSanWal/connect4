import numpy as np
from scipy.signal import convolve2d

from core.models import Gameplay


class PlayerCPU():

    def __init__(self, game):
        self.game = game

    def is_forced_movement(self):
        if (column := self.game.next_move_wins(1)):
            return column
        else:
            if (column := self.game.next_move_wins(2)):
                return column
        return False

    def best_move(self):
        """calculate the row in which the token will go.
        Checks if there's a move that the machine wins with and does it,
        if there isn't, it calculates if there's a move that the human wins
        with and blocks it.
        If none of the above cases apply, plays randomly"""

        if (forced_movement := self.is_forced_movement()):
            return forced_movement
        else:
            from random import choice
            return choice(self.game.posible_moves())


class PlayerIA(PlayerCPU):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def best_move(self):
        """calculate the row in which the token will go.
        Checks if there's a move that the machine wins with and does it,
        if there isn't, it calculates if there's a move that the human wins
        with and blocks it.
        If none of the above cases apply, checks previous games for the best move"""
        if (forced_movement := self.is_forced_movement()):
            return forced_movement
        else:
            print('turno', self.game.turn)
            # TODO: Logica de la IA
            if self.game.turn == 1:
                pass
            else:
                pass
            # who_has_started = self.game.starts
            # turn = self.game.turn
            from random import choice
            return choice(self.game.posible_moves())


class Game():

    ROWS = 6
    COLUMNS = 7
    winner = False

    def __init__(self):
        self.board = np.zeros((6, 7), int)
        self.kernels = self._detection_kernels()
        self.turn = 1
        self.player = None
        self.computer = None

    def restart_board(self):
        self.board = np.zeros((6, 7), int)
        self.turn = 1
        self.player = None
        self.computer = None

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

    def is_winning_move(self, player=None):
        if player is None:
            player = self.player
        for kernel in self.kernels:
            if (convolve2d(self.board == player, kernel, mode="valid") == 4).any():
                return self.player
        return False

    def posible_moves(self):
        first_row = self.board[0]
        return [i for i, val in enumerate(first_row) if val == 0]

    def next_move_wins(self, player):
        """It checks if there's a winning move and if so returns
        the column, else returns False"""
        posible_columns = self.posible_moves()
        for column in posible_columns:
            row = self._last_empty_row(column)
            self.board[row][column] = player
            if self.is_winning_move(player):
                self.board[row][column] = 0  # Return board to original
                return column
            self.board[row][column] = 0
        return False

    def make_move(self, column=None):
        """If column is None (computer turn), calculate the best column to drop
        the token and return a tuple (row, column).
        If column is not None (human turn) uses it's value.
        Then returns a tuple (row, column)"""
        if column is None:
            column = self.computer.best_move()
        row = self._last_empty_row(column)
        return row, column

    def show(self):
        print(self.board)
