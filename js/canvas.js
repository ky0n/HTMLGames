var can = document.getElementById("background");
var wrap = document.getElementById("wrapper");

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

var col = [
    "#8ea7d1",
    "#41A97C",
    "#C480AB"
]

var Ball = function(r,x,y,dx,dy){
    this.r = r;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = "#8ea7d1";
    
    this.drawMouse = function(){
        c.beginPath();
        c.fillStyle = "#41A97C";
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        c.stroke();
        c.fill();
    }
    
    this.draw = function(){
        c.beginPath();
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        c.stroke();
        c.fill();
    }
    
    //Kollisionserkennung
    this.intersects = function(other){
        if( getDistance( this.x, this.y, other.x, other.y) < 
           this.r + other.r ){
            return true;            
        }else{
            return false;
        }
    }

    /*der Kreis folgt dem Mauszeiger*/
    this.updateMouse = function(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.draw();
    }
    
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

var circleCount = 250;
var mouseGrowth = 0.2;
var mouseStartRad = 30;
var mouseMax = 100;
var maxSpeed = 0.8;
var circleSchrink = 0.7;

//Kreis um Mauszeiger erstellen
var mouseCircle = new Ball(mouseStartRad,can.width-100,can.height-100,0,0);
var circles = [];

init = function(){

    mouseCircle.drawMouse();

    //Partikel erstellen
    for(var i = 0; i<circleCount; i++){
        var r = 5* randomIntFromRange(0.5,1);
        var x = Math.random()*(can.width-10);
        var y = Math.random()*(can.height-10);
        var dx = randomIntFromRange(-maxSpeed,maxSpeed);
        var dy = randomIntFromRange(-maxSpeed,maxSpeed);
        circles.push(new Ball(r,x,y,dx,dy));
        circles[i].color = col[Math.floor(Math.random() * (col.length))];
        circles[i].draw();
    }
}


animate = function(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    mouseCircle.updateMouse();
    for(let i = 0; i< circles.length; i++){
        circles[i].update();
        /*wird jedes mal aufgerufen, wenn der Mauskreis einen anderne berührt*/
        if(circles[i].intersects(mouseCircle)){

            /*der Mauskreis wird bei jeder Berührung mit einem anderen Kreis größer, bis er 100 erreicht, dannach wird
            * er auf den Startradius zurückgesetzt*/
            if(mouseCircle.r <= mouseMax){
                mouseCircle.r += mouseGrowth;

            }else{
                mouseCircle.r = mouseStartRad;
                for(let j = 0; j < (circleCount - circles.length); j++){
                    circles.push(new Ball(5* randomIntFromRange(0.5,1),mouseCircle.x + randomIntFromRange(mouseCircle.r,mouseCircle.r +5),mouseCircle.y + randomIntFromRange(mouseCircle.r,mouseCircle.r +5),randomIntFromRange(-0.8,0.8),randomIntFromRange(-0.8,0.8)));
                    //circles[j].color = col[Math.floor(Math.random() * (col.length))];
                    circles[j].color = col[2];
                    console.log(circles[j].color);
                    circles[j].draw();
                }

            }

            /*ist ein Kreis noch groß genug, um in seinem Radius nicht ins Negative zu kommen, so wird von diesem 0,5
            * abgezogen, solange er den Mauskreis berührt, sobald er 0 erreichen würde wird der Kreis aus der Liste
            * entfernt und verschwindet*/
            if((circles[i].r - circleSchrink) > 0){
                circles[i].r -= circleSchrink;
            }else{
                circles = circles.slice(0,i).concat( circles.slice(i+1) );
            }
        }
    }
}

init();
animate();
