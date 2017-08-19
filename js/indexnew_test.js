var can = document.getElementById("background");
var wrap = document.getElementById("contentWrapper");
//var nav = document.getElementsByTagName('nav')[0];

can.width = window.innerWidth;
can.height = window.innerHeight;

c = can.getContext("2d");

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse.x + ", " + mouse.y);
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
        rc.attr('width', $(container).width() ); //max width
        rc.attr('height', $(container).height() ); //max height

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
    this.dy =dy;
    
    this.drawMouse = function(){
        c.beginPath();
        c.strokeStyle = "black";
        c.fillStyle = "red";
        c.arc(this.x, this.y, r, 0, 2*Math.PI, false);
        c.stroke();
        c.fill();
    }
    
    this.draw = function(){
        c.beginPath();
        c.strokeStyle = "#FFF9E0";
        c.fillStyle = "#FFF9E0";
        c.arc(this.x, this.y, r, 0, 2*Math.PI, false);
        c.stroke();
        c.fill();
    }
    
    this.updateMouse = function(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.draw();
    }
    
    this.update = function(){
        this.x += dx;
        this.y += dy;
        this.draw();
    }
}

//-----methods----------------------------------------
function randomIntFromRange( min, max ){
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
}



//-----main-------------------------------------------
var mouseCircle = new Ball(30,can.width-100,can.height-100,0,0);
mouseCircle.drawMouse();

var circles = [];
for(var i = 0; i<200; i++){
    var r = 5* Math.random();
    var x = Math.random()*(can.width-10);
    var y = Math.random()*(can.height-10);
    var dx = -0.5 + Math.random();
    var dy = -0.5 + Math.random();
circles.push(new Ball(r,x,y,dx,dy));
}
for(var i = 0; i< circles.length; i++){
    circles[i].draw();
}

animate = function(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    mouseCircle.updateMouse();
    for(var i = 0; i< circles.length; i++){
    circles[i].update();
    }
}

animate();
