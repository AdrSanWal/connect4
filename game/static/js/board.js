var turn = 1

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    // left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}


const dropToken = (e, col) => {
  const token = e.querySelector('.token')
  const clone = token.cloneNode(true)
  const tokenInitialPosition = getOffset(token).top
  const emptyCells = document.querySelectorAll(`.col-${col}.color-0`)

  token.addEventListener("transitionend", (e) => {
    const emptyCells = document.querySelectorAll(`.col-${col}.color-0`)
    rowElement = emptyCells[emptyCells.length - 1]
    rowElement.classList.replace('color-0','color-1');
    row = rowElement.className.split(' ')[0].split('-')[1]
    // TODO: enviar columna elegida
    updateBoard(col, row)
    // TODO: detect if there is a winer
    if (isWin()) {
      console.log('winner')
    } else {
      console.log('not yet')
    }
    const selector = token.parentNode
    token.remove()
    selector.appendChild(clone);
  })

  const tokenFinalPosition = getOffset(emptyCells[emptyCells.length - 1]).top
  const distance = tokenFinalPosition - tokenInitialPosition

    token.style.transform = `translateY(${distance}px)`
    token.style.transition = `${0.005 * distance}s`
}

//TODO: si se llena una columna, la flecha queda inactiva


const startGame = (e) => {
  const startPlayer = document.querySelector('input[name=start]:checked').value;
  const color = document.querySelector('input[name=color]:checked').value;

  if (color == 'y') {
    var r = document.querySelector(':root');
    r.style.setProperty('--token-color-user', 'yellow');
    r.style.setProperty('--token-color-cpu', 'red');
  }

  const modal = document.querySelector('.settings-wrapper')
  modal.style.display = 'none'
}

const updateBoard = (col, row) => {

  fetch('http://localhost:8000', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

    },
    body: JSON.stringify({'turn': turn++, "col": col, 'row': row})
})

}

const isWin = () => {

}
