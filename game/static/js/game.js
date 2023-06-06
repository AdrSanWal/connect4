const url = 'http://localhost:8000'
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
    this.winner = false
  }

  async updateSettings() {
    this.startsGame = document.querySelector('input[name=start]:checked').value;
    this.colorUser = document.querySelector('input[name=color]:checked').value;
    this.tokenVelocity = 0.05 / document.querySelector('#tokenVelocity').value; // To invert min/max
    this.ia = document.querySelector('input[name=oponent]:checked').value;

    if (this.colorUser == 'y') {
      user.color = 'yellow'
      cpu.color = 'red'
    }

    this.startsGame == 'user' ? user.gameTurn = true : cpu.gameTurn = true

    const response = await fetch(`${url}?oponent=${this.ia}`, {
      method: 'HEAD',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
    })
  }

  displayGame() {
    const modal = document.querySelector('.modal-wrapper.settings')
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

      this.winner = json.winner
      const [r, c] = json.move
      let token = new Token(c, this.activePlayer)
      token.drop()

      if (r == 0) {

        // block the column (the column is full)
        const selectorArrow = document.querySelector(`.arrow-${c}`).parentNode
        selectorArrow.classList.add('disabled')
      }

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

const closeGame = document.querySelector('#closeGame')
closeGame.addEventListener('click', () => {

  window.close()  // TODO: It doesn't work because it's the user who has opened the page
})
