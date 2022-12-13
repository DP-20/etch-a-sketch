const DEFAULT_SIZE = 16;
let currentSize = DEFAULT_SIZE;
let gridBox = [];
let lines = true;
let mouseDown = false;
let currentMode = 'blank';
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
    if(currentMode === 'blank'){
        e.target.style.backgroundColor = 'black';
    }
    else if(currentMode === 'color'){
        e.target.style.backgroundColor = colorChange.value;
    }
    else if(currentMode === 'rainbow'){
        //colorBtn.style.backgroundColor = 'grey';
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        const bgColor = "rgb("+ randomR + ", " + randomG + ", " + randomB + ")";
        e.target.style.backgroundColor = bgColor;
    }
    else if(currentMode === 'erase'){
        //colorBtn.style.backgroundColor = 'grey';
        e.target.style.backgroundColor = '';
    }
    else{

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
    sizeValue.innerHTML = `Grid Size: ${value} x ${value}`;
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
    if(currentMode != 'color'){
        setCurrentMode('color');
    }
    else{
        setCurrentMode('blank');
    }
    
}


//Add functionality to the rainbow button
let rainbowBtn = document.getElementById('rainbowBtn');
rainbowBtn.onclick = () => setRainbowMode();

/*This function will set the rainbow button to on
 * If it is clicked again, it will set rainbow mode to off
*/
function setRainbowMode(){
    if(currentMode != 'rainbow'){
        setCurrentMode('rainbow');
    }
    else{
        setCurrentMode('blank');
    }
}

//Add functionality to Erase button
let eraseBtn = document.getElementById('eraseBtn');
eraseBtn.onclick = () => setEraseMode();

/* This function will set the eraser button to on
 * If erase mode is on, any click of a color will reset the background to its original
 * color. Clicking the eraser button will turn of the erase mode
 */
function setEraseMode(){
    if(currentMode != 'erase'){
        setCurrentMode('erase');
    }
    else{
        setCurrentMode('blank');
    }
}

//This function will set which button is active
function activateButton(mode){
    if(currentMode == 'color'){
        colorBtn.classList.remove('active');
    }
    else if(currentMode == 'rainbow'){
        rainbowBtn.classList.remove('active');
    }
    else if(currentMode == 'erase'){
        eraseBtn.classList.remove('active');
    }

    if(mode == 'color'){
        colorBtn.classList.add('active');
        //colorBtn.classList.add('colorChange');
    }
    else if(mode == 'rainbow'){
        rainbowBtn.classList.add('active');
    }
    else if(mode == 'erase'){
        eraseBtn.classList.add('active');
    }
}

//This function will set the current mode and activate the corresponding button
function setCurrentMode(mode){
    if(mode == 'color'){
        myInterval = setInterval(() => {
            if(colorChange.value == "#000000"){
                colorBtn.style.color = 'white';
            }
            colorBtn.style.backgroundColor = colorChange.value;
        }, 200);
    }
    else if(mode != 'color'){
        clearInterval(myInterval);
        colorBtn.style.backgroundColor = 'grey';
    }
    activateButton(mode);
    currentMode = mode;

}


window.onload = () => {
    createGrid(DEFAULT_SIZE);
    activateButton(currentMode);
}