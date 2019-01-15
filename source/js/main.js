var htmlCanvas;
var ctx;
var win_l;
var win_h;
var size;
var vectors;

//testing var
var temp;

function main() {
    htmlCanvas = document.getElementById("myCanvas");
    ctx = htmlCanvas.getContext('2d');
    win_l = window.innerWidth;
    win_h = window.innerHeight;
    size = win_h;
    vectors = [];

    if(win_l < win_h){
        size = win_l;
    }

    ctx.canvas.width  = size;
    ctx.canvas.height = size;
    //...drawing code...
    
    var centerX = size / 2;
    var centerY = size / 2;
    var radius = size / 60;

    temp = new Circle(centerX, centerY, radius, 'green', 1);
    temp.draw();
    vectors.push(temp);

    htmlCanvas.addEventListener("mousedown",  function(ev) {
        if (ev.which === 1) {
            ctxEvent();
        }
    }, false);
}

function ctxEvent(){
    var coords = htmlCanvas.relMouseCoords(event);
    console.log(coords.x);
    console.log(coords.y);
    console.log(temp.isClicked(coords.x, coords.y));
}

function Circle(x, y, r, fill, stroke) {
    this.startingAngle = 0;
    this.endAngle = 2 * Math.PI;
    this.x = x;
    this.y = y;
    this.r = r;

    this.fill = fill;
    this.stroke = stroke;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, this.startingAngle, this.endAngle);
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.strokeStyle = this.stroke;
        ctx.stroke();
    }

    this.isClicked = function (in_x, in_y) {
        var clicked = false;

        if(in_x > (x - r) && in_x < (x + r)){
            if(in_y > (y - r) && in_y < (y + r)){
                clicked = true;
            }
        }

        return clicked;
    }
}

function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;