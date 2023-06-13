from django.db import models, connection


class GameWinner(models.Model):
    CHOICES = [(0, 'Draw'), (1, 'Computer'), (2, 'Human')]
    game_winner = models.IntegerField(choices=CHOICES)
    turns = models.PositiveIntegerField()

    def chunker(self, iterable, size):
        result, subgroup, counter = [], [], 0
        for element in iterable:
            if counter < size:
                subgroup.append(element)
                counter += 1
            else:
                result.append(sum(subgroup) / size)
                subgroup = [element]
                counter = 1
        result.append(sum(subgroup) / counter)
        return result

    def count_winners_statistics(self):
        sql_query = """SELECT id, game_winner, count(game_winner) AS total
                       FROM core_gamewinner
                       GROUP BY game_winner
                       """
        rawquery = GameWinner.objects.raw(sql_query)
        games = {_.game_winner: _.total for _ in rawquery}
        return games

    def groups_lenght(self, games):
        relation = {50: 1, 200: 5, 1000: 20, 5000: 100, 10000: 200}
        for key in relation:
            if games <= key:
                return relation[key]
        return 1000

    def labels(self, games, chunk_size):
        chunk_labels = []
        groups = int(games / chunk_size) + (games % chunk_size > 0)
        for group in range(groups):
            if group * chunk_size < (games - chunk_size):
                if group * chunk_size + 1 == group * chunk_size + chunk_size:
                    chunk_labels.append(group * chunk_size + 1)
                else:
                    chunk_labels.append(f'{group * chunk_size + 1} - '
                                        + f'{group * chunk_size + chunk_size}')
            else:
                if group * chunk_size + 1 == games:
                    chunk_labels.append(games)
                else:
                    chunk_labels.append(f'{group * chunk_size + 1} - {games}')
        return chunk_labels

    def serie_winners_statistics(self):
        games = GameWinner.objects.all()
        groups_length = self.groups_lenght(games.count())
        winners_history = [game.game_winner for game in games]
        return self.chunker(winners_history, groups_length), self.labels(len(winners_history),
                                                                         groups_length)


class Gameplay(models.Model):
    winner = models.BooleanField(null=True)  # Indicates if the player who started the game won

    ai_turn_1 = models.CharField(max_length=1)
    ai_turn_2 = models.CharField(max_length=2)
    ai_turn_3 = models.CharField(max_length=3)
    ai_turn_4 = models.CharField(max_length=4)
    ai_turn_5 = models.CharField(max_length=5)
    ai_turn_6 = models.CharField(max_length=6)
    ai_turn_7 = models.CharField(max_length=7)
    ai_turn_8 = models.CharField(max_length=8)
    ai_turn_9 = models.CharField(max_length=9)
    ai_turn_10 = models.CharField(max_length=10)
    ai_turn_11 = models.CharField(max_length=11)
    ai_turn_12 = models.CharField(max_length=12)
    ai_turn_13 = models.CharField(max_length=13)
    ai_turn_14 = models.CharField(max_length=14)
    ai_turn_15 = models.CharField(max_length=15)
    ai_turn_16 = models.CharField(max_length=16)
    ai_turn_17 = models.CharField(max_length=17)
    ai_turn_18 = models.CharField(max_length=18)
    ai_turn_19 = models.CharField(max_length=19)
    ai_turn_20 = models.CharField(max_length=20)
    ai_turn_21 = models.CharField(max_length=21)
    ai_turn_22 = models.CharField(max_length=22)
    ai_turn_23 = models.CharField(max_length=23)
    ai_turn_24 = models.CharField(max_length=24)
    ai_turn_25 = models.CharField(max_length=25)
    ai_turn_26 = models.CharField(max_length=26)
    ai_turn_27 = models.CharField(max_length=27)
    ai_turn_28 = models.CharField(max_length=28)
    ai_turn_29 = models.CharField(max_length=29)
    ai_turn_30 = models.CharField(max_length=30)
    ai_turn_31 = models.CharField(max_length=31)
    ai_turn_32 = models.CharField(max_length=32)
    ai_turn_33 = models.CharField(max_length=33)
    ai_turn_34 = models.CharField(max_length=34)
    ai_turn_35 = models.CharField(max_length=35)
    ai_turn_36 = models.CharField(max_length=36)
    ai_turn_37 = models.CharField(max_length=37)
    ai_turn_38 = models.CharField(max_length=38)
    ai_turn_39 = models.CharField(max_length=39)
    ai_turn_40 = models.CharField(max_length=40)
    ai_turn_41 = models.CharField(max_length=41)
    ai_turn_42 = models.CharField(max_length=42)

    def _save_symmetrical_game(self, moves):
        changes = {'0': '6', '1': '5', '2': '4', '3': '3', '4': '2', '5': '1', '6': '0'}
        symmetrical_moves = {k: changes.get(v, '') for k, v in moves.items()}
        symmetrical_moves['id'] = moves['id'] + 1
        symmetrical_moves['winner'] = moves['winner']
        Gameplay(**symmetrical_moves).save()

    def _is_same_game(self, game):
        """Checks if there's a equal game in bd"""
        filters = {f'ai_turn_{n}': game[f'ai_turn_{n}'] for n in range(1, 43)}
        games = Gameplay.objects.filter(**filters).exclude(id=game['id'])
        if games:
            return True
        return False

    def save_game(self):
        """Updates in bd the winner. If the player who starts the game is
        the same player who wins, it returns True, otherwise it returns False.
        Then checks if there is already a saved game with the same movements.
        If it exists, it removes the one that was added. If it doesn't, saves
        a symmetrical game."""
        moves = self.__dict__.copy()
        del moves['_state']
        if not self._is_same_game(moves):
            self.save()
            self._save_symmetrical_game(moves)
            print('no hay duplicado')
