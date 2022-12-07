const DEFAULT_SIZE = 16;
let size = DEFAULT_SIZE;
const grid = document.querySelector('#grid');


//create amount of divs needed to make the grid
function gridSetup(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(let i = 0; i < size * size; i++){
        const gridBox = document.createElement('div');
        gridBox.classList.add('gridBox');
        gridBox.addEventListener('mousedown', changeColor);
        grid.appendChild(gridBox);
    }
}

function changeColor(e){
    e.target.style.backgroundColor = 'black';
}

window.onload = () =>{
    gridSetup(DEFAULT_SIZE);
}