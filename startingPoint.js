let canvas = document.getElementById("canvas");
let view = new View(canvas);

canvas.addEventListener("click", view.handleClick.bind(view), false);
setInterval(view.updateDisplay.bind(view), view.frameRate);