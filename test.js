let brushActive = false;
let isDrawing = true;
let isEraser = false;
let isMouseDown = false;

// Начинаем рисовать

board.addEventListener("mousedown", (event) => {
    brushActive = true;
    if (isDrawing && event.target.classList.contains('pixel')) {
        event.target.style.backgroundColor = 'black';
    }

});


document.addEventListener("mouseup", () => {
    brushActive = false;
});


board.addEventListener("mouseover", (event) => {
    if (isDrawing && brushActive && event.target.classList.contains('pixel')) {
        event.target.style.backgroundColor = 'black';
    }
});

// Ластик

eraser.addEventListener("click", () => {
    if (isEraser) {
        isEraser = false;
        isDrawing = true;
        setButtonToInactive(eraser);
        board.removeEventListener("mousedown", erase);
    } else {
        isEraser = true;
        isDrawing = false;
        setButtonToActive(eraser);
        board.addEventListener("mousedown", eraseStart);
        board.addEventListener("mousemove", erase); // Добавляем обработчик движения для ластика
        board.addEventListener("mouseup", eraseEnd); // Обработчик для окончания стирания
    }
});

function eraseStart(event) {
    isMouseDown = true; // Устанавливаем флаг нажатия
    erase(event); // Стираем сразу, если мышь нажата
}

function erase(event) {
    if (isMouseDown && event.target.classList.contains('pixel') && isEraser) {
        event.target.style.backgroundColor = 'unset'; 
    }
}

function eraseEnd() {
    isMouseDown = false; // Сбрасываем флаг нажатия
}

// Убедитесь, что обработчик для mouseup убирает состояние нажатия
board.addEventListener("mouseup", eraseEnd);