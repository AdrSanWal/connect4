let gamePlayerInstances = []

class GamePlayer {

  constructor(id, color) {
    this.id = id
    this.color = color
    this.gameTurn = false
    gamePlayerInstances.push(this)
  }

  placeToken() {
    var r = document.querySelector(':root');
    r.style.setProperty('--token-color-active', this.color);

    if (this.id == cpuPlayer) {
      // cpu is playing
      waitWindow(true)
      game.updateBoard()
    } else {
      // user is playing
      waitWindow()
    }
  }

}
