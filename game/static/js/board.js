const arrows = document.getElementsByClassName('arrow')

for (arrow of arrows) {
  arrow.addEventListener('click', (e) => {
    colNumber = e.target.getAttribute('class').split('-')[1]
    const columnCells = document.getElementsByClassName(`col-${colNumber}`)
    for (col of columnCells) {
      console.log(col)

    }
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
