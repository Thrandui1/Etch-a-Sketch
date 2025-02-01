const colorPicker = document.querySelector("#color-picker");
const board = document.querySelector('.board');
const buttonClear = document.querySelector('#clear');
const slider = document.querySelector('#size');
const sizeValue = document.querySelector('#sizeValue')
const eraser = document.querySelector('#eraser');
let pixels = document.querySelectorAll(".pixel");


getBoard(50, 50);

slider.oninput = () => {
    let val = slider.value;
    sizeValue.textContent = `${val} * ${val}`;
}

function getBoard(rows, columns) {
    if (board.hasChildNodes()) {
        clearBoard();
    }

    const pixelSize = 640 / rows;
    for (let i = 0; i < rows * columns; i++) {
        const divPixel = document.createElement('div');
        divPixel.classList.add('pixel');
        board.appendChild(divPixel);
    }

    pixels = document.querySelectorAll(".pixel");
    for (let pixel of pixels) {
        pixel.setAttribute("style", `height:${pixelSize}px; width:${pixelSize}px`);
    }
}

function clearBoard() {

    for (let pixel of pixels) {
        board.removeChild(pixel);
    }
}

let color = colorPicker.value;

colorPicker.addEventListener("input", () => {
    color = colorPicker.value;
});


// Переменные состояния

let isDrawing = true; 
let isEraser = false;
let isMouseDown = false;


board.addEventListener("mousedown", (event) => {
    isMouseDown = true;
    handleMouseAction(event);
});


document.addEventListener("mouseup", () => {
    isMouseDown = false; 
});


board.addEventListener("mouseover", (event) => {
    if (isMouseDown) {
        handleMouseAction(event);
    }
});


function handleMouseAction(event) {
    if (event.target.classList.contains('pixel')) {
        if (isDrawing) {
            event.target.style.backgroundColor = color; 
        } else if (isEraser) {
            event.target.style.backgroundColor = ''; 
        }
    }
}

// Ластик
eraser.addEventListener("click", () => {
    isEraser = !isEraser; 
    isDrawing = !isEraser; 

    setButtonToActive(eraser);
    if (!isEraser) {
        setButtonToInactive(eraser);
    }
});

function setButtonToInactive(button){
    button.classList.remove("button-active");
}

function setButtonToActive(button) {
    button.classList.add("button-active")
}



// Очистка доски

buttonClear.addEventListener("click", () => {
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = "unset";
    });
});

// Делаем динамическое изменение количества пикселей

slider.addEventListener("mouseup", () => {
    let val = slider.value;
    getBoard(val, val);
});