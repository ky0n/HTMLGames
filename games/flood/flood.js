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
        squareSize: 16,
        rows: [
            // wird bei Initialisierung belegt
        ],
        moves: 0,
    },

    methods: {
        initialize: function () {
            let tempRows = [];
            for (let i = 0; i < this.squareSize; i++) {
                let tempColumns = [];
                for (let j = 0; j < this.squareSize; j++) {
                    let r = Math.floor(Math.random() * (this.colors.length));
                    let color = this.colors[r].color;
                    tempColumns[j] = {color: color};
                }
                tempRows[i] = {columns: tempColumns};
            }
            this.rows = tempRows;
        },

        changeColor: function(item){
            let oldColor = this.rows[0].columns[0].color;
            let newColor = item.color;

            if (oldColor === newColor) {
                return;
            }

            this.floodFill(0, 0, oldColor, newColor);
            this.moves++;
        },

        floodFill(i,j,oldColor,newColor){
            if (i < 0 || i >= this.squareSize || j < 0 || j >= this.squareSize) {
                return;
            }
            if (this.rows[i].columns[j].color === oldColor) {
                this.rows[i].columns[j].color = newColor;
                this.floodFill(i+1, j, oldColor, newColor);
                this.floodFill(i, j+1, oldColor, newColor);
                this.floodFill(i-1, j, oldColor, newColor);
                this.floodFill(i, j-1, oldColor, newColor);
            }
        }
    },

    created(){
        this.initialize();
    }
});