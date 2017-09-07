let sudoku = new Vue({
    el: '#sudokuField',
    data: {
        colors: [
            '#000000',
            '#dfe8da'

        ],
        squareSize: 9,

        rows: [],
    },
    methods: {
        initialize: function () {
            let tempRows = [];
            for (let i = 0; i < this.squareSize; i++) {
                let tempColumns = [];
                for (let j = 0; j < this.squareSize; j++) {
                    let field = {};
                    field.color = this.colors[0];
                    tempColumns[j] = field;
                }
                tempRows[i] = {columns: tempColumns};
            }
            this.rows = tempRows;
        },

        onClick(field){
            console.log("field");
            field.color = this.color[1];
            for(let i = 0; i < this.squareSize; i++){
                for(let j = 0; j < this.squareSize; i++){
                    field.color = this.color[0];
                }
            }
        }


    },

    created() {
        this.initialize();
    }
});