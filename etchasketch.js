// const HEIGHT = 16;
// const WIDTH = 16;

let dimension = 16;
const SIZE = "720px";

let row;
let column;

const BODY = document.querySelector('body');

let style = 0;

// dimension selector
let sizeSelector = document.createElement('button');
sizeSelector.textContent = "Select dimension";
sizeSelector.style.marginBottom = "25px";
sizeSelector.addEventListener('click', (event) => {
    // get user value
    let newDimension = prompt("select dimension (from 1 to 100)");
    if(newDimension < 0 || newDimension > 100){
        alert("can't handle that ("+ newDimension +")");
        return;
    }
    if(+newDimension){
        // delete container node
        dimension = newDimension;
        let containerNode = document.querySelector('.container');
        if(containerNode){
            containerNode.remove();
        }
        renderContainer(newDimension);
    }
    else{
        alert("Not a number ("+ newDimension +")");
        return;
    }

});
BODY.appendChild(sizeSelector);

const WORKSPACE = document.createElement('div');
WORKSPACE.style.display = 'flex';
WORKSPACE.style.flex = SIZE;
WORKSPACE.style.width = "1000px";
WORKSPACE.style.justifyContent = "space-evenly";

const STYLESELECTORS = document.createElement('div');
STYLESELECTORS.style.display = 'flex';
STYLESELECTORS.style.flexDirection = 'column';
STYLESELECTORS.style.gap = '15px';
STYLESELECTORS.style.paddingTop = '20px';

let defaultButton = document.createElement('button');
defaultButton.textContent = "Default";
defaultButton.addEventListener('click', (event) => {
    style = 0;
});

let eraserButton = document.createElement('button');
eraserButton.textContent = "Eraser";
eraserButton.addEventListener('click', (event) => {
    style = 1;
});

let darkerButton = document.createElement('button');
darkerButton.textContent = "Darken";
darkerButton.addEventListener('click', (event) => {
    style = 2
});

let randomButton = document.createElement('button');
randomButton.textContent = "RAINBOW";
randomButton.addEventListener('click', (event) => {
    style = 3;
});

let clearButton = document.createElement('button');
clearButton.textContent = "Clear";
clearButton.addEventListener('click', (event) => {
    let containerNode = document.querySelector('.container');
    if(containerNode){
        containerNode.remove();
    }
    renderContainer(dimension);
});


STYLESELECTORS.appendChild(defaultButton);
STYLESELECTORS.appendChild(eraserButton);
STYLESELECTORS.appendChild(darkerButton);
STYLESELECTORS.appendChild(randomButton);
STYLESELECTORS.appendChild(clearButton);
WORKSPACE.appendChild(STYLESELECTORS);

BODY.appendChild(WORKSPACE);

function renderContainer(dimension){

    let container = document.createElement('div');
    container.classList.add('container');
    container.style.width = SIZE;
    
    for (let i = 0; i<dimension; i++){
        row = document.createElement('div');
        row.style.display = 'flex';
        row.style.flex = 1;
        row.style.alignContent = 'stretch';
        row.id = i;
        for (let j = 0; j<dimension; j++){
            column = document.createElement('div');
            column.id = i+"x"+j;
            column.style.flex = 1;
            column.style.backgroundColor = 'white';
            column.style.filter = "brightness(100%)"
            column.classList.add('box');
            column.addEventListener('mouseenter', f = (event)=> {
                switch (style){

                    case 1:
                        event.target.style.backgroundColor = 'white';
                        event.target.style.filter = "brightness(100%)";
                        break;

                    case 2:
                        let box = event.target.style.filter;
                        filterValue = box.split('(')[1];
                        filterValue = filterValue.split('%')[0];
                        filterValue -= 10;
                        event.target.style.filter = "brightness("+filterValue+"%)";
                        break;

                    case 3:
                        event.target.style.backgroundColor = "#" + getRandomColor();
                        event.target.style.filter = "brightness(100%)";
                        break;

                    default:
                        event.target.style.backgroundColor = 'black';
                }
            })
            row.appendChild(column);
        }

        container.appendChild(row);
    }
    
    
    WORKSPACE.appendChild(container);
}

// code from https://css-tricks.com/snippets/javascript/random-hex-color/
function getRandomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}

renderContainer(dimension);