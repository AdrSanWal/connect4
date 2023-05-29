function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    // left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

const columnSelectors = document.getElementsByClassName('selector-arrow')

for (const columnSelector of columnSelectors) {
  columnSelector.addEventListener('click', (e) => {
    colNumber = e.target.getAttribute('id').split('-')[1]

    const token = document.getElementById(`token-${colNumber}`)
    const tokenInitialPosition = getOffset(token).top
    const row = document.getElementsByClassName(`col-${colNumber} color-0`)
    const tokenFinalPosition = getOffset(row[row.length - 1]).top
    console.log(tokenFinalPosition - tokenInitialPosition)

    token.style.transform = `translateY(${tokenFinalPosition - tokenInitialPosition}px)`

  })
}
// for (col of columnCells) {
//   col.classList.remove('color-0');
//   col.classList.add('color-1');
// }

// setTimeout(function(){

//   col.classList.remove('color-0');
//   col.classList.add('color-1');
// }, 1000);
