var can = document.getElementById("background");
var wrap = document.getElementById("contentWrapper");
//var nav = document.getElementsByTagName('nav')[0];

can.width = window.innerWidth;
can.height = window.innerHeight;

c = can.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse.x + ", " + mouse.y);
})

//resize verursacht Probleme!!

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
