let wrap = document.getElementById("wrapper");
let can = document.getElementById("game");
let restart = document.getElementById("restart");

wrap.width = window.innerWidth;
wrap.height = window.innerHeight;
can.width = window.innerWidth;
can.height = window.innerHeight;

c = can.getContext("2d");

//---Enventlistening-------------------------------------------------------
restart.addEventListener('click', function (event) {
    init();
});

can.addEventListener('mousedown', function(){
    can.addEventListener('mousemove', onMouseMove);
    can.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}

function onMouseUp(){
    can.removeEventListener('mousemove', onMouseMove);
    can.removeEventListener('mouseup', onMouseUp);
}
//--------------------------------------------------------------------------


//------responsiveCanvas---------------------------

/*window.addEventListener('resize', function(event){
    can.width = window.innerWidth;
    can.height = window.innerHeight;
    wrap.width = window.innerWidth;
    wrap.height = window.innerHeight;

});*/

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
let mouse = {
    x: undefined,
    y: undefined
}

let Thumb = function(r,x,y){
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

    this.drawLineTo = function(other){
        c.beginPath();
        c.moveTo(this.x,this.y);
        c.lineTo(other.x,other.y);
        c.stroke();
    }

    this.update = function(){
        this.draw();
        if(mouse.x >= (this.x - this.r) && mouse.x <= (this.x +this.r) && mouse.y >= (this.y - this.r) && mouse.y <= (this.y + this.r)){
            this.x = mouse.x;
            this.y = mouse.y;
        }
    }
}

//-----methods----------------------------------------

//Berechnet den Abstand der beiden über ihre Koordinaten angegebenen Kreise
function getDistance(x1, y1, x2, y2){
    let xDistance = Math.abs(x2 - x1);
    let yDistance = Math.abs(y2 - y1);
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function randomIntFromRange( min, max ){
    let rando = Math.random();
    if(rando !== 0){
        return Math.floor(rando*(max-min+1)+min);
    }else{
        randomIntFromRange(min,max);
    }
}

//TODO: not working right now
function drawLines(){

    if(thumbs.length > 0){
        for(let i = 0; i<thumbs.length; i++) {
            randJ = randomIntFromRange(2, 5);
            for (let j = 0; j < randJ ; j++) {
                let k = randomIntFromRange(0, 6);
                console.log(k);
                thumbs[i].drawLineTo(thumbs[k]);
            }
        }
    }
}

//-----main------------------------------------------

let thumbCount = 7;
let thumbRad = 10;

let thumbs = [];


init = function(){
    c.clearRect(0,0,can.width,can.height);
    //Greifpunkte erstellen
    for(let i = 0; i<thumbCount; i++){
        let x = randomIntFromRange(200, can.width-200);
        let y = randomIntFromRange(200, can.height-200);
        thumbs.push(new Thumb(thumbRad,x,y));
        thumbs[i].draw();
    }
}

animate = function(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,can.width,can.height);
    for(let i = 0; i < thumbs.length; i++){
        thumbs[i].update();

        //TODO not working right now
        //zeichnen der Linien zwischen den Anfasserpunkten
        for(let i = 0; i<thumbs.length; i++){
            for( let j = 0; j < randomIntFromRange(2,5); j++){
                let k = randomIntFromRange(0,6);
                console.log(k);
                thumbs[i].drawLineTo(thumbs[k]);
            }
        }



    }
}

init();
//animate();