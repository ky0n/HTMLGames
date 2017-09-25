let can = document.getElementById("background");
let wrap = document.getElementById("wrapper");

can.width = window.innerWidth;
can.height = window.innerHeight;
wrap.width = window.innerWidth;
wrap.height = window.innerHeight;

c = can.getContext("2d");

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

//------responsiveCanvas---------------------------
$(document).ready( function(){
    //Get the canvas & context 
    let rc = $('#background');

    //Run function when browser resizes
    $(window).resize( respondCanvas );

    function respondCanvas(){
        rc.attr('width', Math.max(document.documentElement.clientWidth, window.innerWidth || 0) ); //max width
        rc.attr('height', Math.max(document.documentElement.clientHeight, window.innerHeight || 0) ); //max height

        //Call a function to redraw other content (texts, images etc)
    }

    //Initial call
    respondCanvas();

});


//----data--------------------------------------------
let mouse = {
    x: undefined,
    y: undefined
};

var col = [
    "rgba(165, 205, 179, 0.6)",
    "rgba(150, 183, 198, 0.6)",
    "rgba(223, 129, 91, 0.6)",
    "rgba(229, 211, 137, 0.6)",
];

let Ball = function(r,x,y,dx,dy, color){
    this.r = r;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    
    this.drawMouse = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        c.stroke();
        c.fill();
    };
    
    this.draw = function(){
        c.beginPath();
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        c.stroke();
        c.fill();
    };
    
    //Kollisionserkennung
    this.intersects = function(other){
        return getDistance(this.x, this.y, other.x, other.y) <
            this.r + other.r;
    };

    /*der Kreis folgt dem Mauszeiger*/
    this.updateMouse = function(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.draw();
    };
    
    this.update = function(){
        
        //Geschwindigkeit am Fensterrand umkehren
        if(this.x >= (innerWidth - this.r)||this.x <= (0 + this.r)){
            this.dx = -this.dx;
        }
        if((this.y + this.r) > innerHeight || (this.y - this.r) < 0){
            this.dy = -this.dy;
        } 
        
        //Position anhand der Geschwindigkeit anpassen
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
};

//-----methods----------------------------------------

//Berechnet den Abstand der beiden über ihre Koordinaten angegebenen Kreise
function getDistance(x1, y1, x2, y2){
    let xDistance = Math.abs(x2 - x1);
    let yDistance = Math.abs(y2 - y1);
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}


function randomNumFromRange(min, max ){
    let rando = Math.random();
    if(rando !== 0){
        if (min < 0) {
            return min + rando * (Math.abs(min)+max);
        }else {
            return min + rando * max;
        }
    }else{
        randomNumFromRange(min,max);
    }
}

function explode() {
    mouseCircle.r = MOUSE_START_RAD;
    let countDiff = CIRCLECOUNT - circles.length;
    let posx;
    let posy;
    for(let j = 0; j < (countDiff); j++){
        let velx = randomNumFromRange(-SPEED_MAX,SPEED_MAX);
        let vely = randomNumFromRange(-SPEED_MAX,SPEED_MAX);
        if(velx >= 0){
            posx = mouseCircle.x + randomNumFromRange(mouseCircle.r,mouseCircle.r + 10);
        }else{
            posx = mouseCircle.x - randomNumFromRange(mouseCircle.r,mouseCircle.r + 10);
        }
        if(vely >= 0){
            posy = mouseCircle.y + randomNumFromRange(mouseCircle.r,mouseCircle.r + 10);
        }else{
            posy = mouseCircle.y - randomNumFromRange(mouseCircle.r,mouseCircle.r + 10);
        }

        circles.push(new Ball(5* randomNumFromRange(0.5,2),posx,posy,velx,vely,col[0]));
        circles[j].draw();
    }
}
//-----main------------------------------------------

const CIRCLECOUNT = 400;
const MOUSE_GROWTH = 0.2;
const MOUSE_START_RAD = 30;
const MOUSE_MAX = 100;
const SPEED_MAX = 1.2;
const CIRCLE_SHRINK = 0.8;
const CIRCLE_MIN = 2;
//Kreis um Mauszeiger erstellen
let mouseCircle = new Ball(MOUSE_START_RAD,can.width-100,can.height-100,0,0,col[0]);
let circles = [];

init = function(){

    mouseCircle.drawMouse();

    //Partikel erstellen
    for(let i = 0; i<CIRCLECOUNT; i++){
        let r = 5* randomNumFromRange(0.5,2);
        let x = Math.random()*(can.width-10);
        let y = Math.random()*(can.height-10);
        let dx = randomNumFromRange(-SPEED_MAX,SPEED_MAX);
        let dy = randomNumFromRange(-SPEED_MAX,SPEED_MAX);
        let color = col[Math.floor(Math.random() * (col.length))];
        circles.push(new Ball(r,x,y,dx,dy,color));
        //circles[i].color = col[Math.floor(Math.random() * (col.length))];
        circles[i].draw();
    }
};

animate = function(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    mouseCircle.updateMouse();
    for(let i = 0; i< circles.length; i++){
        circles[i].update();
        /*wird jedes mal aufgerufen, wenn der Mauskreis einen anderne berührt*/
        if(circles[i].intersects(mouseCircle)){

            /*ist ein Kreis noch groß genug, um in seinem Radius nicht ins Negative zu kommen, so wird von diesem
            * der circleShrink-Wert
            * abgezogen, solange er den Mauskreis berührt, sobald er 0 erreichen würde wird der Kreis aus der Liste
            * entfernt und verschwindet*/
            if((circles[i].r - CIRCLE_SHRINK) > CIRCLE_MIN){
                circles[i].r -= CIRCLE_SHRINK;
            }else{
                circles = circles.slice(0,i).concat( circles.slice(i+1) );
            }

            /*der Mauskreis wird bei jeder Berührung mit einem anderen Kreis größer, bis er 100 erreicht,
            dannach wird er auf den Startradius zurückgesetzt*/
            if(mouseCircle.r <= MOUSE_MAX){
                mouseCircle.r += MOUSE_GROWTH;

            }else{
                explode();
            }
        }
    }
};

init();
animate();
