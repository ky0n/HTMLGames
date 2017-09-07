let sudoku = new Vue({
    el: '#sudokuField',
    data: {
        colors: [],
        squareSize: 9,

        rows: [],
    },
    methods: {
        initialize: function () {
            let tempRows = [];
            for (let i = 0; i < this.squareSize; i++) {
                let tempColumns = [];
                for (let j = 0; j < this.squareSize; j++) {
                    tempColumns[j] = 1;
                }
                tempRows[i] = {columns: tempColumns};
            }
            this.rows = tempRows;

        }
    },

    created() {
        this.initialize();
    }
});