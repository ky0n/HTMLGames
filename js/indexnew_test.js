new Vue({
  el: '#wrapper',
    data: {
        headline: 'Puzzle und Logik Games',
        smile: '',
        isSmiling: false,
        style: false,
        
        colorObj:{
            backgroundColor: '#446E73'
        }
    },
    methods: {
        action(){
            console.log("Action!");
            if(this.isSmiling){
                this.smile = ':(';
            }else{
                this.smile = ';)'
            }
            this.isSmiling = !this.isSmiling;
        },
        action2(){
            console.log("Action2!");
        }
    }
    
})