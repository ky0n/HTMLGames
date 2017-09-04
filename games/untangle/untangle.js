//-----VUE--------------------------------------------------------------------------------

new Vue({
    el: '#wrapper',
    data: {
        mouse:{
            x: 0,
            y: 0,
        },
        canvas: undefined,
        c: undefined,
        thumbs:[],
    },
    methods: {
        init: function() {
            let canvas = document.getElementById("game");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.canvas = canvas;
            let c = this.canvas.getContext("2d");
            this.c = c;
            let Thumb = function (x,y) {
                this.x = x;
                this.y = y;

                this.draw = function () {
                    this.x = Math.floor(Math.random()* (canvas.width-20));
                    this.y = Math.floor(Math.random()* (canvas.height-20));
                    c.beginPath();
                    c.fillStyle = "black";
                    c.arc(this.x,this.y,10,0,2*Math.PI,false);
                    c.fill();
                }
            }
            for(let i= 0; i< 7; i++){
                this.thumbs.push(new Thumb(100,100));
                console.log(this.thumbs[i].x);
                this.thumbs[i].draw();
            }
        },
        update: function(event){
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        },
        getDistance: function(x1, y1, x2, y2){
            var xDistance = Math.abs(x2 - x1);
            var yDistance = Math.abs(y2 - y1);
            return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        },
        intersects: function (other) {
            if( getDistance( this.x, this.y, other.x, other.y) <
                this.r + other.r ){
                return true;
            }else{
                return false;
            }
        },
        drag: function (event) {

        }
    },
    created(){
        this.init();
    }
    /*watch: {

    },
    mounted: {

    },
    beforeUpdate:{

    },
    updated:{

    }*/
    //wie initialize

})

