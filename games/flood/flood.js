/**
 * Created by romy on 22.08.2017.
 */

new Vue({
    el: '#flood',

    data: {
        colors: [ //TODO find good colors
            {color: "rgb(255, 87, 34)"},
            {color: "rgb(156, 39, 176)"},
            {color: "rgb(33, 150, 243)"},
            {color: "rgb(255, 235, 59)"},
            {color: "rgb(139, 195, 74)"},
            {color: "cyan"}
        ],
        firstColor: "",
        rows: [
            // wird bei Initialisierung (created Methode) belegt
        ],
    },

    methods: {
        changeColor: function(item){
            if (item.color === this.firstColor) {
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
                let r = Math.floor(Math.random() * (this.colors.length));
                let color = this.colors[r].color;
                tempC[j] = {color: color};
            }
            tempRows[i] = {columns: tempC};
        }
        this.firstColor = tempRows[0].columns[0].color;
        this.rows = tempRows;
    }
});