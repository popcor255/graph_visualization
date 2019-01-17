var htmlCanvas;
var ctx;
var win_l;
var win_h;
var size;
var radius;
var vectors;

function main() {
    htmlCanvas = document.getElementById("myCanvas");
    ctx = htmlCanvas.getContext('2d');
    vectors = [];
    win_l = window.innerWidth;
    win_h = window.innerHeight;
    size = Math.min(win_h, win_l);
    radius = size / 70;

    ctx.canvas.width  = size;
    ctx.canvas.height = size;

    htmlCanvas.addEventListener("mousedown",  function(ev) {
        if (ev.which === 1) {
            ctxEvent();
        }
    }, false);


    htmlCanvas.addEventListener('wheel', function(ev) {
        scrollEvent(ev);
    });
}

function ctxEvent(){
    var coords = htmlCanvas.relMouseCoords(event);
    var removed = false;
    var temp = null;

    nodeEventHandler(coords, radius, removed, temp);
    
}

function scrollEvent(ev){
    var scroll = 0;
    var y = ev.deltaY;

    if(vectors.length > 0){
        if (y < 0 && radius >= (size / 65)) {
            console.log("down");
            scroll = -2;   
        }

        if (y > 0 && radius <= (size / 60)) {
            console.log("up");
            scroll = 2;   
        }
    }

    radius += scroll;

    for(var i = 0; i < vectors.length; i++){
        temp = vectors[i];
        vectors[i].clearRegion();
        vectors[i] = new Node(temp.x, temp.y, radius, temp.fill, 1, i);
        vectors[i].draw();
    }
}

function nodeEventHandler(coords, radius, removed, temp){

    //The conditions go as follows:
    //1) The circle must fit in the canvas (lines 42-43)
    //2) The circle must not overlap (lines 47)
    //3) If the circle is already present do not add, but remove

    if(coords.x > radius && coords.x < size - radius){
        if(coords.y > radius && coords.y < size - radius){
            for(var i = 0; i < vectors.length; i++){
                temp = vectors[i];
                if(temp != null && temp.isClicked(coords.x, coords.y)){
                    temp.clearRegion();
                    vectors.splice(i, 1);
                    removed = true;
                }
            }

            if(removed == false){
                temp = new Node(coords.x, coords.y, radius, 'white', 1, vectors.length - 1);
                if(!temp.isCollision(vectors)){
                    vectors.push(temp);
                }
            }
        }
    }

    //redraw nodes as follows
    //if the head your blue
    //if the tail your red
    //else your green

    if(vectors.length > 0){
        temp = vectors[0];
        temp.clearRegion();
        vectors[0] = new Node(temp.x, temp.y, temp.r, 'blue', 1, 0);
        vectors[0].draw();
    }

    for(var i = 1; i < vectors.length - 1; i++){
        temp = vectors[i];
        vectors[i].clearRegion();
        vectors[i] = new Node(temp.x, temp.y, temp.r, 'white', 1, i);
        vectors[i].draw();
    }

    if(vectors.length > 1){
        temp = vectors[vectors.length - 1];
        temp.clearRegion();
        vectors[vectors.length - 1] = new Node(temp.x, temp.y, temp.r, 'red', 1, vectors.length - 1);
        vectors[vectors.length - 1].draw();
    }
    
}

function Edge(head, tail){
    this.head = head;
    this.tail = tail;

    this.draw = function(){
        ctx.beginPath();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.moveTo(head.x, head.y);
        ctx.lineTo(tail.x, tail.y);
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over';
    }
}

function Node(x, y, r, fill, stroke, index) {
    this.startingAngle = 0;
    this.endAngle = 2 * Math.PI;
    this.x = x;
    this.y = y;
    this.r = r;
    this.region = (size / 60) * 2.2;
    
    this.index = index;
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
        if(r >= size / 60){
            ctx.font = '8pt Calibri';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText(index, this.x, this.y+3);
        }
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

CanvasRenderingContext2D.prototype.clear = function(){
    ctx.clearRect(0,0,size,size);
    vectors = [];
}