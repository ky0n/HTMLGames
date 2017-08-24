/**
 * Created by romy on 22.08.2017.
 */
//var colors = ["green", "red", "blue"]; //TODO find good colors
var colors = ["rgb(255, 87, 34)", "rgb(156, 39, 176)", "rgb(33, 150, 243)", "rgb(255, 235, 59)", "rgb(139, 195, 74)", "cyan"];
var firstColor;


new Vue({
    el: '#flood',

    data: {
        rows: [
            // wird bei Initialisierung (created Methode) belegt
        ],
    },

    methods: {
        changeColor: function(item){
            if (item.color === firstColor) {
                return;
            }

            //TODO implement floodfill (recursive)
            item.color = '#446E73';
        }
    },

    created(){
        let tempRows = [];

        for (let i = 0; i < 9; i++) {
            let tempC = [];
            for (let j = 0; j < 9; j++) {
                //TODO better solution for random numbers
                let r = Math.floor((Math.random() * 5));
                let color = colors[r];

                tempC[j] = {color: color};
            }
            tempRows[i] = {columns: tempC};
        }

        firstColor = tempRows[0].columns[0].color;
        this.rows = tempRows;
    }
});