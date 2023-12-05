// const HEIGHT = 16;
// const WIDTH = 16;

let dimension = 16;
const SIZE = "720px";

let row;
let column;

const BODY = document.querySelector('body');

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


// etch-a-sketch container
function renderContainer(dimension){

    let container = document.createElement('div');
    container.classList.add('container');
    container.style.width = SIZE;
    container.style.flex = SIZE;
    
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
            column.classList.add('box');
            column.addEventListener('mouseenter', (event)=> {
                event.target.style.backgroundColor = 'black';
            })
            row.appendChild(column);
        }
        
        container.appendChild(row);
    }
    
    
    BODY.appendChild(container);
}

renderContainer(dimension);