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

        },
        update: function(event){
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        },
        generate: function () {
            let canvas = document.getElementById("game");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.canvas = canvas;
            let c = this.canvas.getContext("2d");
            this.c = c;
            for(let i= 0; i< 7; i++){
                posx = Math.floor(Math.random()* 500)
                posy = Math.floor(Math.random()* 500);
                this.c.beginPath();
                this.c.fillStyle = "black";
                this.c.arc(posx,posy,20,0,2*Math.PI,false);
                this.c.fill();
            }

        }
    },
    /*created(){

    }
    watch: {

    },
    mounted: {

    },
    beforeUpdate:{

    },
    updated:{

    }*/
    //wie initialize

})

