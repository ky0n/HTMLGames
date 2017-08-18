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


var Ball = function(r,x,y){
    this.r = r;
    this.x = x;
    this.y = y;
    
    this.draw = function(){
        c.beginPath();
        c.strokeStyle = "black";
        c.fillStyle = "red";
        c.arc(this.x, this.y, r, 0, 2*Math.PI, false);
        c.stroke();
        c.fill();
    }
    
    this.update = function(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.draw();
    }
}

var mouseCircle = new Ball(30,can.width-100,can.height-100);
mouseCircle.draw();
console.log(mouseCircle.r);

animate = function(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    mouseCircle.update();
}

animate();
