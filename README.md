# connect4

Connect 4 game developed in django. In which you can choose to face the computer or an AI.

https://github.com/AdrSanWal/connect4/assets/82061736/b6831031-ad3b-4594-abdc-9feae6795bdf

Instructions:
=

1º Clone the repository to a folder:

    git clone https://github.com/AdrSanWal/connect4.git

2º Enter in the repo folder:

    cd connect4

3º Create database:

    python3 manage.py migrate

4º If you want to train the ai with training data (otherwise skip this step):

    python3 manage.py loaddata core_gameplay.json core_gamewinner.json

5º Run the server:

    python3 manage.py runserver

6º Start playing:

    http://localhost:8000/
