const url = 'http://localhost:8000'
//const tokenVelocity = 0.004
const tokenVelocity = 0.01
const cpuPlayer = 1
const userPlayer = 2
const transparency = document.querySelector('.wait')


const waitWindow = (wait) => {
  if (wait) {
    document.body.classList.add('waiting');
    transparency.style.display = 'flex'
  } else {
    document.body.classList.remove('waiting');
    transparency.style.display = 'none'
  }
}

class GameSettings {
  constructor() {
    cpu.id = cpuPlayer
    user.id = userPlayer
  }

  updateSettings() {
    this.startsGame = document.querySelector('input[name=start]:checked').value;
    this.colorUser = document.querySelector('input[name=color]:checked').value;

    if (this.colorUser == 'y') {
      user.color = 'yellow'
      cpu.color = 'red'
    }

    this.startsGame == 'user' ? user.gameTurn = true : cpu.gameTurn = true
  }

  displayGame() {
    const modal = document.querySelector('.settings-wrapper')
    modal.style.display = 'none'
  }
}

class Game {

  constructor() {
    this.turn = 1
    this.activePlayer
  }

  playTurn() {
    // chech who plays
    user.gameTurn ? this.activePlayer = user : this.activePlayer = cpu
    this.activePlayer == cpu ? cpu.placeToken() : user.placeToken()
  }

  changeTurn() {
    this.turn++
    gamePlayerInstances.forEach(inst=>inst.gameTurn = !inst.gameTurn)
    this.playTurn()
  }

  async updateBoard(col=null) {
    console.log('token cayendo')
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'playerId': this.activePlayer.id,
          'turn': this.turn,
          "col": col,
        })
      })

      const json = await response.json()
      //TODO: check if there is a winner

      const [r, c] = json.move

      let token = new Token(c, this.activePlayer)
      token.drop()

      // change player and play turn
      // this.changeTurn()

    } catch (error) {
      console.log(error)
    }
  }
}

const cpu = new GamePlayer(cpuPlayer, 'yellow')
const user = new GamePlayer(userPlayer, 'red')
const settings = new GameSettings()
const game = new Game()


const settingsBtn = document.querySelector('#settings-btn')
settingsBtn.addEventListener('click', () => {
  settings.updateSettings()
  settings.displayGame()
  game.playTurn()
});

const dropToken = (column) => {
  game.updateBoard(column)
}
