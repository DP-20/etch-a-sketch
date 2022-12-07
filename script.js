const DEFAULT_SIZE = 16;
let size = DEFAULT_SIZE;
let gridBox = [];
const grid = document.querySelector('#grid');

let colorBtn = document.querySelector('#sketch-btn');
let rainbowBtn = document.querySelector('#rainbow-btn');
let shadeBtn = document.querySelector('#shade-btn');
let lightenBtn = document.querySelector('#lighten-btn');
let eraserBtn = document.querySelector('#eraser-btn');
let linesBtn = document.querySelector('#gridlines-btn');
let clearBtn = document.querySelector('clear-btn');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);



//create amount of divs needed to make the grid
function gridSetup(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(let i = 0; i < size * size; i++){
        gridBox[i] = document.createElement('div');
        gridBox[i].classList.add('gridBox');
        gridBox[i].addEventListener('mouseover', changeColor);
        gridBox[i].addEventListener('mousedown', changeColor);
        grid.appendChild(gridBox[i]); 
    }
}

function changeColor(e){
    if(e.type === 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = 'black';
}



window.onload = () =>{
    gridSetup(DEFAULT_SIZE);
}