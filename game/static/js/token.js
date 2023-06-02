class Token {

  constructor(column, player) {
    this.token = document.querySelector(`#token-${column}`)
    this.token.classList.add(`color-${player}`)
    this.clone = this.token.cloneNode(true)
    this.token.style.visibility = 'visible'
    this.tokenColumn = column
    this.tokenPlayer = player
    this.lowestEmptyPosition = this.getLowestEmptyRow()
  }

  getLowestEmptyRow() {
    const emptyCells = document.querySelectorAll(`.col-${this.tokenColumn}.color-0`)
    return emptyCells[emptyCells.length - 1]
  }

  getPosition(el) { return el.getBoundingClientRect().top + window.scrollY }

  setTokenInLowestPosition() {
    this.lowestEmptyPosition.classList.replace('color-0',`color-${this.player}`);
  }

  drop() {
    const tokenInitialPosition = this.getPosition(this.token)
    const tokenFinalPosition = this.getPosition(this.lowestEmptyPosition)
    const distance = tokenFinalPosition - tokenInitialPosition

    this.token.addEventListener("transitionend", (e) => {
      if (e.propertyName == 'transform') {
        const selector = this.token.parentNode
        this.token.remove()
        selector.appendChild(this.clone);
        console.log(`color-${this.tokenPlayer}`)
        this.getLowestEmptyRow().classList.replace('color-0', `color-${this.colors[this.tokenPlayer]}`)
      }
    })

    this.token.style.transform = `translateY(${distance}px)`
    this.token.style.transition = `${tokenVelocity * distance}s`
  }
}
