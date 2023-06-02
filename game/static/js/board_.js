// CPU = 1, Player = 2

let turn = 1
const tokenVelocity = 0.002
const url = 'http://localhost:8000'
const transparency = document.querySelector('.wait')
let winner = false


function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    // left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

const waitWindow = () => {
  document.body.classList.add('waiting');
  transparency.style.display = 'flex'
}

const playWindow = () => {
  document.body.classList.remove('waiting');
  transparency.style.display = 'none'
}


const dropToken = (e, col) => {
  const token = e.querySelector('.token')
  const clone = token.cloneNode(true)
  const tokenInitialPosition = getOffset(token).top
  const emptyCells = document.querySelectorAll(`.col-${col}.color-0`)

  token.addEventListener("transitionend", (e) => {
    if (e.propertyName == 'transform') {
      const emptyCells = document.querySelectorAll(`.col-${col}.color-0`)
      rowElement = emptyCells[emptyCells.length - 1]
      rowElement.classList.replace('color-0','color-1');
      row = rowElement.className.split(' ')[0].split('-')[1]
      // TODO: enviar columna elegida
      updateBoard(col, row)
      // TODO: detect if there is a winer


      const selector = token.parentNode
      token.remove()
      selector.appendChild(clone);
      playWindow()
    }
  })

  const tokenFinalPosition = getOffset(emptyCells[emptyCells.length - 1]).top
  const distance = tokenFinalPosition - tokenInitialPosition

  waitWindow()

  token.style.transform = `translateY(${distance}px)`
  token.style.transition = `${tokenVelocity * distance}s`
}

//TODO: si se llena una columna, la flecha queda inactiva


const startGame = () => {
  // game settings
  let player = document.querySelector('input[name=start]:checked').value;
  const color = document.querySelector('input[name=color]:checked').value;

  if (color == 'y') {
    var r = document.querySelector(':root');
    r.style.setProperty('--token-color-user', 'yellow');
    r.style.setProperty('--token-color-cpu', 'red');
  }

  const modal = document.querySelector('.settings-wrapper')
  modal.style.display = 'none'

  playGame()
}

const updateBoard = (player, row=null, col=null) => {
  fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

    },
    body: JSON.stringify({
      'game': 'game',
      'player': player,
      'turn': turn++,
      "col": col,
      'row': row
    })
  })
}

const playGame = () => {
  console.log('player', player)
  //while (!winner) {
    if (player == 1) {
      // computer turn
      console.log('aqui')
      waitWindow()

      player = 2
    } else {
      //player turn
      playWindow()

      player = 1
    }
  //}
}
