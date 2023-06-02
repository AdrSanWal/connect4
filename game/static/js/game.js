const url = 'http://localhost:8000'
const tokenVelocity = 0.002
const cpuPlayer = 1
const userPlayer = 2


class GameSettings {
  constructor() {
    this.colors = {1: 'yellow', 2: 'red'}
  }

  updateSettings() {
    this.startsGame = document.querySelector('input[name=start]:checked').value;
    this.colorPlayer = document.querySelector('input[name=color]:checked').value;

    if (this.colorPlayer == 'y') {
      this.colors = {2: 'yellow', 1: 'red'}
    }
  }

  displayGame() {
    const modal = document.querySelector('.settings-wrapper')
    modal.style.display = 'none'
  }
}

class Game {

  constructor() {
    this.transparency = document.querySelector('.wait')
    this.turn = 1
    this.activePlayer
  }

  playTurn() {
    var r = document.querySelector(':root');
    r.style.setProperty('--token-color-active', settings.colors[this.activePlayer]);

    if (this.activePlayer == cpuPlayer) {
      this.waitWindow(true)
      this.updateBoard()
    } else {
      this.waitWindow()
    }
  }

  changePlayer() {
    this.turn++
    this.activePlayer == 1 ? this.activePlayer = 2 : this.activePlayer = 1
    this.playTurn()
  }

  waitWindow(wait) {
    if (wait) {
      document.body.classList.add('waiting');
      this.transparency.style.display = 'flex'
    } else {
      document.body.classList.remove('waiting');
      this.transparency.style.display = 'none'
    }
  }

  async updateBoard(col=null) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'game': 'game',
          'player': this.activePlayer,
          'turn': this.turn,
          "col": col,
        })
      })

      const json = await response.json()
      //TODO: check if there is a winner
      console.log(json.winner)
      const [r, c] = json.move
      let token = new Token(c, this.activePlayer)
      token.colors = settings.colors
      if (this.turn != 1) {
        console.log('turno otros')
        document.addEventListener('transitionend', (e) => {
          if (e.propertyName == 'transform') {
            token.drop()
            this.changePlayer()
          }

        })
      } else {
        console.log('turno 1')
        token.drop()
        this.changePlayer()
      }


      // change player
      // if (this.activePlayer == 1) {
      //   this.activePlayer = 2

      //   // document.addEventListener('transitionend', () => {
      //   //   console.log
      //   })
      // } else {
      //   this.activePlayer = 1
      // }


    } catch (error) {
      console.log(error)
    }
  }
}

const settings = new GameSettings()
const game = new Game()

const settingsBtn = document.querySelector('#settings-btn')
settingsBtn.addEventListener('click', () => {
  settings.updateSettings()
  settings.displayGame()
  game.activePlayer = settings.startsGame
  game.playTurn()
});



const dropToken = (column) => {
  game.updateBoard(column)
  // let token = new Token(col, this.activePlayer)
  // token.drop()
}
