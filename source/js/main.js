var htmlCanvas;
var ctx;
var win_l;
var win_h;
var size;
var vectors;

function main() {
    htmlCanvas = document.getElementById("myCanvas");
    ctx = htmlCanvas.getContext('2d');
    vectors = [];
    win_l = window.innerWidth;
    win_h = window.innerHeight;
    size = Math.min(win_h, win_l);

    ctx.canvas.width  = size;
    ctx.canvas.height = size;

    htmlCanvas.addEventListener("mousedown",  function(ev) {
        if (ev.which === 1) {
            ctxEvent();
        }
    }, false);
}

function ctxEvent(){
    var coords = htmlCanvas.relMouseCoords(event);
    var radius = size / 60;
    var removed = false;
    var temp = null;

    if(coords.x > radius && coords.x < size - radius){
        if(coords.y > radius && coords.y < size - radius){
            for(var i = 0; i < vectors.length; i++){
                temp = vectors[i];
                if(temp != null && temp.isClicked(coords.x, coords.y)){
                    temp.clearRegion();
                    vectors[i] = null;
                    removed = true;
                }
            }

            if(removed == false){
                temp = new Node(coords.x, coords.y, radius, 'green', 1);
                if(!temp.isCollision(vectors)){
                    temp.draw();
                    vectors.push(temp);
                }
            }
        }
    }
}

function Edges(head, tail, weight, bi_dir){
    this.head = head;
    this.tail = tail;
    this.weight = weight;
    this.bi_dir = bi_dir;

    this.draw = function(){
        ctx.beginPath();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.moveTo(head.x, head.y);
        ctx.lineTo(tail.x, tail.y);
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over';
    }
}

function Node(x, y, r, fill, stroke) {
    this.startingAngle = 0;
    this.endAngle = 2 * Math.PI;
    this.x = x;
    this.y = y;
    this.r = r;
    this.region = r * 2.2;

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

    this.clearRegion = function() {
        ctx.clearRect(this.x - (this.region / 2), this.y - (this.region / 2), this.region, this.region);
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

    this.isCollision = function(arr){
        var clicked = false;
        
        for(var i = 0; i < arr.length; i++){
            if(arr[i] != null){
                var in_x = arr[i].x;
                var in_y = arr[i].y;

                if(in_x > (x - this.region) && in_x < (x + this.region)){
                    if(in_y > (y - this.region) && in_y < (y + this.region)){
                        clicked = true;
                    }
                }
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