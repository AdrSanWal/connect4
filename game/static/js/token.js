class Token {
  constructor(column, player) {
    this.token = document.querySelector(`#token-${column}`)
    this.clone = this.token.cloneNode(true)
    this.tokenColor = player.color
    this.token.classList.add(`color-${this.tokenColor}`)
    this.tokenColumn = column
    this.lowestEmptyPosition = this.getLowestEmptyRow()
  }

  getLowestEmptyRow() {
    const emptyCells = document.querySelectorAll(`.column-${this.tokenColumn}.color-0`)
    return emptyCells[emptyCells.length - 1]
  }

  getPosition(el) { return el.getBoundingClientRect().top + window.scrollY }

  setTokenInLowestPosition() {
    this.lowestEmptyPosition.classList.replace('color-0', `color-${this.tokenColor}`)
  }

  drop() {
    this.token.style.visibility = 'visible'
    const tokenInitialPosition = this.getPosition(this.token)
    const tokenFinalPosition = this.getPosition(this.lowestEmptyPosition)
    const distance = tokenFinalPosition - tokenInitialPosition

    this.token.addEventListener("transitionend", (e) => {
      if (e.propertyName == 'transform') {
        const selector = this.token.parentNode
        this.token.remove()
        selector.appendChild(this.clone);
        this.setTokenInLowestPosition()
        waitWindow()

        // checks if there's a winner
        if (game.winner) {
          const winner = document.querySelector('#gameWinner')
          const winnerText = {1: '¡¡CPU Wins!!', 2: '¡¡You Win!!'}
          winner.textContent = winnerText[game.winner]

          const modal = document.querySelector('.modal.endgame')
          modal.style.display = 'flex'
          transparency.style.display = 'flex'
        } else {
          game.changeTurn()
        }
      }
    })
    waitWindow(true)
    this.token.style.transform = `translateY(${distance}px)`
    this.token.style.transition = `${settings.tokenVelocity * distance}s`
  }
}
