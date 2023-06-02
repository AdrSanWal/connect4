const url = 'http://localhost:8000'
const tokenVelocity = 0.002


class GameSettings {

}

class Game {

  constructor() {
    this.transparency = document.querySelector('.wait')
    this.turn = 1
    this.player
  }

  updateSettings() {
    this.player = document.querySelector('input[name=start]:checked').value;
    let color = document.querySelector('input[name=color]:checked').value;
    if (color == 'y') {
      var r = document.querySelector(':root');
      r.style.setProperty('--token-color-user', 'yellow');
      r.style.setProperty('--token-color-cpu', 'red');
    }

    const modal = document.querySelector('.settings-wrapper')
    modal.style.display = 'none'

    if (this.player == 1) {
      this.waitWindow(true)
      this.updateBoard()
    }
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

  async updateBoard(row=null, col=null) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'game': 'game',
          'player': this.player,
          'turn': this.turn++,
          "col": col,
          'row': row
        })
      })

      const json = await response.json()
      //TODO: check if there is a winner
      console.log(json.winner)
      const [r, c] = json.move
      let token = new Token(c, this.player)
      token.drop()

    } catch (error) {
      console.log(error)
    }
  }
}

let game = new Game()

const settingsBtn = document.querySelector('#settings-btn')
settingsBtn.addEventListener('click', () => game.updateSettings());

const dropToken = (col) => {

  // game.updateBoard(col=col)
  let token = new Token(col, this.player)
  token.drop()
}
