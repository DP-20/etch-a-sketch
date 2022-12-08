const DEFAULT_SIZE = 16;
let currentSize = DEFAULT_SIZE;
let gridBox = [];
let mouseDown = false;
let lines = true;
let colors = false;
let rainbow = false;
const grid = document.getElementById('grid');
const colorChange = document.getElementById('colorpicker');

/* Funciton used to create the grid where the drawing will be done one
 * The function will take in a size and create the grid with dimensions size x size
*/
function createGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++){
        gridBox[i] = document.createElement('div');
        gridBox[i].classList.add('gridBox');
        if(lines){
            gridBox[i].classList.add('gridLines');
        }
        gridBox[i].addEventListener('mouseover', changeColor);
        gridBox[i].addEventListener('mousedown', changeColor);
        grid.appendChild(gridBox[i]);
    }
}

//Adding option to only highlight squares if mouse is down
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


// This function will be used to change the color of the squares in the grid
function changeColor(e){
    if(e.type === 'mouseover' && !mouseDown) return;
    if(colors == false && rainbow == false){
        e.target.style.backgroundColor = 'black';
    }
    else{
        if(colors){
            e.target.style.backgroundColor = colorChange.value;
        }
    }

    if(rainbow){
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        const bgColor = "rgb("+ randomR + ", " + randomG + ", " + randomB + ")";
        console.log(bgColor);
        e.target.style.backgroundColor = bgColor;
    }
    
}


//Adding functionality to clear button to remove colors from the grid
let clearBtn = document.getElementById('clearBtn');
clearBtn.onclick = () => refreshGrid();

//This function will clear the grid and reset it to its original state.
function clearGrid(){
    grid.innerHTML = '';
    for(let i = 0; i < gridBox.length; i++){
        gridBox[i].style.backgroundColor = '';
    }
}

//Add functionality to the slider
let sizeValue = document.getElementById('sizeVal');
let sizeSlider = document.getElementById('sizeSlider');

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

//This function updates the size value shown in the text 'size x size'
function updateSizeValue(value){
    sizeValue.innerHTML = `${value} x ${value}`;
}

/* This function is used to update the size of the grid depending on the value of the slider
 * Once the size is updated, it will clear the grid of any color and create a new one
 * with the updated size
 */
function changeSize(size){
    setCurrentSize(size);
    updateSizeValue(size);
    refreshGrid();
}

// This is a setter function to update the size of the grid
function setCurrentSize(newSize){
    currentSize = newSize;
}

// This function will create a new grid with any changes made
function refreshGrid(){
    clearGrid();
    createGrid(currentSize);
}

//Adding functionallity to the grid lines button
let gridLinesBtn = document.getElementById('linesBtn');
gridLinesBtn.onclick = () => toggleGridLines();


/*This function will make the grid lines button operational
 * If the button is pressed it will remove the grid lines
 * If the button is pressed again it will add the grid lines
 */
function toggleGridLines(){
    if(lines){
        for(let i = 0; i < gridBox.length; i++){
            gridBox[i].classList.remove('gridLines');
        }
        lines = false;
    }
    else{
        for(let i = 0; i < gridBox.length; i++){
            gridBox[i].classList.add('gridLines');
        }
        lines = true;
    }
}

// Add functionality to Color Mode button
let colorBtn = document.getElementById('colorBtn');
colorBtn.onclick = () => setColorMode();

/* This function will set the color mode to on if the color mode button is clicked
 * If the button is clicked again it will be set to off
*/
function setColorMode(){
    if(colors == false){
        colors = true;
    }
    else{
        colors = false;
        colorChange.value = '#000000';
    }
}

//Add functionality to the rainbow button
let rainbowBtn = document.getElementById('rainbowBtn');
rainbowBtn.onclick = () => setRainbowMode();

/*This function will set the rainbow button to on
 * If it is clicked again, it will set rainbow mode to off
*/
function setRainbowMode(){
    if(rainbow == false){
        rainbow = true;
    }
    else{
        rainbow = false;
        colorChange.value = '#000000';
    }
}


window.onload = () => {
    createGrid(DEFAULT_SIZE);
}