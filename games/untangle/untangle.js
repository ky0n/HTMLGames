var can = document.getElementById("can");

can.width = window.innerWidth;
can.height = window.innerHeight;

c = can.getContext("2d");

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

//------responsiveCanvas---------------------------
$(document).ready( function(){
    //Get the canvas & context 
    var rc = $('#can');
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






//---main-------------------------------------------------

console.log("HI");
animate = function(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

}

//-----VUE--------------------------------------------------------------------------------

new Vue({
  el: '#can',
    data: {
        
    },
    methods: {

    }
    
})
