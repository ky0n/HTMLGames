var can = document.getElementById("game");
var wrap = document.getElementById("wrapper");

can.width = window.innerWidth;
can.height = window.innerHeight;
wrap.width = window.innerWidth;
wrap.height = window.innerHeight;

c = can.getContext("2d");

window.addEventListener('mousedown', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log("hi");
});

window.addEventListener('resize', function(event){
    can.width = window.innerWidth;
    can.height = window.innerHeight;
    wrap.width = window.innerWidth;
    wrap.height = window.innerHeight;
});
//------responsiveCanvas---------------------------
/*$(document).ready( function(){
    //Get the canvas & context
    var rc = $('#game');
    var ct = rc.get(0).getContext('2d');
    var container = $(rc).parent();

    //Run function when browser resizes
    $(window).resize( respondCanvas );

    function respondCanvas(){
        rc.attr('width', Math.max(document.documentElement.clientWidth, window.innerWidth || 0) ); //max width
        rc.attr('height', Math.max(document.documentElement.clientHeight, window.innerHeight || 0) ); //max height

        //Call a function to redraw other content (texts, images etc)
    }
    //Initial call
    respondCanvas();
});*/

//----data--------------------------------------------
var mouse = {
    x: undefined,
    y: undefined
}

var Thumb = function(r,x,y){
    this.r = r;
    this.x = x;
    this.y = y;
    this.color = "#000";

    this.draw = function(){
        c.beginPath();
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        c.stroke();
        c.fill();
    }

    this.update = function(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.draw();

    }
}

//-----methods----------------------------------------

//Berechnet den Abstand der beiden über ihre Koordinaten angegebenen Kreise
function getDistance(x1, y1, x2, y2){
    var xDistance = Math.abs(x2 - x1);
    var yDistance = Math.abs(y2 - y1);
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function randomIntFromRange( min, max ){
    var rando = Math.random();
    if(rando != 0){
        return Math.random() * ( max - min + 1 ) + min;
    }else{
        randomIntFromRange(min,max);
    }
}

//-----main------------------------------------------

var thumbCount = 7;
var thumbRad = 10;

var thumbs = [];


init = function(){
    //Greifpunkte erstellen
    for(let i = 0; i<thumbCount; i++){
        let x = randomIntFromRange(200, can.width-200);
        let y = randomIntFromRange(200, can.height-200);
        thumbs.push(new Thumb(thumbRad,x,y));
    }
}

animate = function(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,can.width,can.height);
    for(let i = 0; i < thumbs.length; i++){
        thumbs[i].draw();
        //zeichnen der Linien zwischen den Anfasserpunkten
        c.beginPath();
        c.moveTo(thumbs[i].x,thumbs[i].y);
        for(let j=0; j<thumbs.length; j++){
            c.lineTo(thumbs[j].x,thumbs[j].y);
        }
        c.stroke();
        //prüfen, ob Maus sich innerhalb eines Anfasserpunktes befindet
        if(mouse.x >= (thumbs[i].x - thumbs[i].r) && mouse.x <= (thumbs[i].x +thumbs[i].r) && mouse.y >= (thumbs[i].y - thumbs[i].r) && mouse.y <= (thumbs[i].y + thumbs[i].r)){
            thumbs[i].update();
        }
    }
}

init();
animate();