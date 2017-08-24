new Vue({
  el: '#app',
    data: {
        headline: 'Puzzle und Logik Games',
        smile: '',
        isSmiling: false
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
        }
    }
    
})