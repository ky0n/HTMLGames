var can = document.getElementById("background");
var conWrap = document.getElementById("contentWrapper");
var wrap = document.getElementById("wrapper");
//var nav = document.getElementsByTagName('nav')[0];

can.width = window.innerWidth;
can.height = window.innerHeight;
wrap.width = window.innerWidth;
wrap.height = window.innerHeight;

c = can.getContext("2d");

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

//------responsiveCanvas---------------------------
$(document).ready( function(){
    //Get the canvas & context 
    var rc = $('#background');
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

}); 


//----data--------------------------------------------
var mouse = {
    x: undefined,
    y: undefined
}

var Ball = function(r,x,y,dx,dy){
    this.r = r;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    
    this.drawMouse = function(){
        c.beginPath();
        c.fillStyle = "#ff45f8";
        c.arc(this.x, this.y, r, 0, 2*Math.PI, false);
        c.stroke();
        c.fill();
    }
    
    this.draw = function(){
        c.beginPath();
        c.strokeStyle = "#8ea7d1";
        c.fillStyle = "#8ea7d1";
        c.arc(this.x, this.y, r, 0, 2*Math.PI, false);
        c.stroke();
        c.fill();
    }
    
    //Kollisionserkennung
    this.intersects = function(other){
        if( getDistance( this.x, this.y, other.x, other.y) < 
           this.rad + other.rad ){
            return true;            
        }else{
            return false;
        }
    }
    
    this.updateMouse = function(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.draw();
    }
    
    this.update = function(){
        
        //Geschwindigkeit am Fensterrand umkehren
        if(this.x > (innerWidth - this.r)||this.x<(0 + this.r)){
            this.dx = -this.dx;
        }
        if((this.y + this.r) > innerHeight || (this.y - this.r) < 0){
            this.dy = -this.dy;
        } 
        
        //Position anhand der Geschwindigkeit anpassen
        this.x += dx;
        this.y += dy;
        
        this.draw();
    }
}

//-----methods----------------------------------------

//Berechnet den Abstand der beiden über ihre Koordinaten angegebenen Kreise
function getDistance(x1, y1, x2, y2){
    var xDistance = x2 - x1;
    var yDistance = y2 - y1; 
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

//Kreis um Mauszeiger
var mouseCircle = new Ball(30,can.width-100,can.height-100,0,0);
mouseCircle.drawMouse();

//Partikel erstellen
var circles = [];
for(var i = 0; i<200; i++){
    var r = 5* Math.random();
    var x = Math.random()*(can.width-10);
    var y = Math.random()*(can.height-10);
    var dx = randomIntFromRange(-1,1);
    var dy = randomIntFromRange(-1,1);
    circles.push(new Ball(r,x,y,dx,dy));
    circles[i].draw();
}

animate = function(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    mouseCircle.updateMouse();
    for(var i = 0; i< circles.length; i++){
        circles[i].update();
        
        if(circles[i].intersects(mouseCircle)){
            circles[i].r -= 0.1;
            console.log("HIT");
        }
    }
}

animate();
