let canvas = document.getElementById("game");
let wrap = document.getElementById("wrapper");
let gamecon = document.getElementById("gamecontainer");
wrap.width = window.innerWidth;
wrap.height = window.innerHeight;
gamecon.width = window.innerWidth;
gamecon.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousedown', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log("fired");
    firstThumb.update();
});

//context bzw Stift
let c = canvas.getContext('2d');

let Thumb = function (x,y) {
    this.x = x;
    this.y = y;

    this.draw = function () {
        c.beginPath();
        c.fillStyle = "black";
        c.arc(x,y,10,0,2*Math.PI,false);
        c.fill();
    }

    this.update = function (){
        this.x = mouse.x;
        this.y = mouse.y;
        this.draw();
        console.log(this.x);
    }
}

let firstThumb = new Thumb(100,100);
firstThumb.draw();

//------responsiveCanvas---------------------------
/*
$(document).ready( function(){
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

});
*/

