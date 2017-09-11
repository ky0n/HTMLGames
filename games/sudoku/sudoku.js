let sudoku = new Vue({
    el: '#sudokuField',
    data: {
        colors: {
            emptyField: '#ffffff',
            clickedField: '#e2e2d9',
            givenField: "#657564"
        },
        squareSize: 9,
        sudoku: [
            [0, 1, 9, 0, 0, 2, 0, 0, 0],
            [4, 7, 0, 6, 9, 0, 0, 0, 1],
            [0, 0, 0, 4, 0, 0, 0, 9, 0],
            [0, 0, 8, 1, 0, 2, 9, 0, 0],
            [7, 0, 0, 0, 0, 0, 0, 0, 8],
            [0, 0, 6, 7, 0, 8, 2, 0, 0],
            [0, 0, 2, 6, 0, 9, 5, 0, 0],
            [8, 0, 0, 2, 0, 3, 0, 0, 9],
            [0, 0, 5, 0, 1, 0, 3, 0, 0]
        ],
        rows: [],
        lastClicked: undefined,
    },
    methods: {
        initialize: function () {
            let tempRows = [];
            for (let i = 0; i < this.squareSize; i++) {
                let tempColumns = [];
                for (let j = 0; j < this.squareSize; j++) {
                    tempColumns[j] = this.setPropertiesForIndex(i,j);
                }
                tempRows[i] = {columns: tempColumns};
            }
            this.rows = tempRows;
            this.solveSudoku();
        },

        setPropertiesForIndex: function(row, column){
            let field = {};
            field.row = row;
            field.column = column;
            if(this.sudoku[row][column] === 0){
                field.number = "";
                field.color = this.colors.emptyField;
                field.given = false;
            }else{
                field.number = this.sudoku[row][column];
                field.color = this.colors.givenField;
                field.given = true;
            }
            return field;
        },

        onClick: function (field, event) {
            const CURSOR_ON_SECOND_POSITION = 1;
            if (this.lastClicked !== undefined) {
                this.rows[this.lastClicked.row].columns[this.lastClicked.column].color = this.emptyField;
            }
            console.log(field.row + " "+field.column);
            this.lastClicked = field;
            field.color = this.colors.clickedField;
            this.setCursor(event.target, CURSOR_ON_SECOND_POSITION);
        },

        setCursor: function (node, pos) {
            if (!node) {
                return false;
            } else if (node.createTextRange) {
                let textRange = node.createTextRange();
                textRange.collapse(true);
                textRange.moveEnd(pos);
                textRange.moveStart(pos);
                textRange.select();
                return true;
            } else if (node.setSelectionRange) { // fuer Chrome und Mozilla
                node.setSelectionRange(pos, pos);
                return true;
            }
            return false;
        },

        isNumber: function (value, event) {
            const BACKSPACE_CHARCODE_MOZILLA = 8;
            const CHARCODE_FOR_1 = 49;
            const CHARCODE_FOR_9 = 57;
            event = (event) ? event : window.event;
            let charCodeKeyboard = (event.which) ? event.which : event.keyCode;
            if (charCodeKeyboard === BACKSPACE_CHARCODE_MOZILLA) {
                return true;
            }
            else if ((isNaN(value) || value.toString().length === 0) &&
                charCodeKeyboard >= CHARCODE_FOR_1 && charCodeKeyboard <= CHARCODE_FOR_9) {
                return true;
            } else {
                event.preventDefault();
            }
        },

        solveSudoku: function () {
            // TODO not working rn
            const ALREADY_FILLED = 0;
            let currentRow = 0;
            let currentColumn = 0;

            for (let i = 0; i < this.squareSize; i++) {
                for (let j = 0; j < this.squareSize; j++) {
                    if (this.sudoku[currentRow][currentColumn] === ALREADY_FILLED) {
                        let input = 1;
                        this.rows[currentRow].columns[currentColumn] = input;
                        for (let k = 0; k < this.squareSize; k++) {
                            if (k !== currentRow) {
                                if (this.rows[k].columns[currentColumn] === input) {
                                    input++;
                                }
                            }
                            if (k !== currentColumn) {
                                if (this.rows[currentRow].columns[k] === input) {
                                    return;
                                }
                            }
                        }
                        input++;
                    }
                }
            }
        }


    },


    created() {
        this.initialize();
    }
});

