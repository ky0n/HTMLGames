//-----VUE--------------------------------------------------------------------------------
let game = new Vue({
    el: '#wrapper',
    data: {
       canvas: undefined,
       c: undefined,
       mouse: {
           x: 0,
           y: 0
       },
       thumb:{
            r: 20,
            posX: 0,
            posY: 0,
            draw: function (x,y) {
                this.posX = x;
                this.posY = y;
                game.c.beginPath();
                game.c.fillStyle = "black";
                game.c.arc(this.posX,this.posY,this.r,0,2*Math.PI,false);
                game.c.stroke();
                game.c.fill();
            }
        },
        thumbs:[],
    },
    methods: {
        init: function() {
            console.log(this.$refs.canvas);
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        },
        updateCan: function () {
            if(this.thumbs.length >= 7){
                this.c.clearRect(0,0,this.canvas.width,this.canvas.height);
                this.thumbs = [];
            }
            for(let i = 0; i < 7; i++){
                this.thumbs.push(this.thumb);
                this.thumbs[i].draw(Math.floor(Math.random()* (window.innerWidth-20)),Math.floor(Math.random()* (window.innerHeight-20)));
                console.log("Feldlänge: " + this.thumbs.length);
                console.log(this.thumbs[i]);
            }
        },
        drag: function (event) {

            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;

            for(let i = 0; i < this.thumbs.length; i++){
                console.log("1. " + (this.mouse.x >(this.thumbs[i].posX - this.thumbs[i].r)));
                console.log(this.mouse.x < (this.thumbs[i].posX + this.thumbs[i].r));
                console.log(this.mouse.y > (this.thumbs[i].posY - this.thumbs[i].r));
                console.log(this.mouse.y < (this.thumbs[i].posY + this.thumbs[i].r));

                if((this.mouse.x >(this.thumbs[i].posX - this.thumbs[i].r) && this.mouse.x < (this.thumbs[i].posX + this.thumbs[i].r)) && (this.mouse.y > (this.thumbs[i].posY - this.thumbs[i].r) && this.mouse.y < (this.thumbs[i].posY + this.thumbs[i].r)) ){
                    this.thumbs[i].posX = this.mouse.x;
                    this.thumbs[i].posY = this.mouse.y;
                    console.log("FIRED ANIMATION");
                }
            }
        }
    },
    beforeCreate(){
    },
    created(){
    },
    mounted(){
        this.canvas = this.$refs.canvas;
        this.c = this.canvas.getContext("2d");
        this.init();
    },
});


