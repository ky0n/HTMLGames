/**
 * Created By Hendrik
 */
let sudoku = new Vue({
    el: '#sudokuField',
    data: {
        colors: {
            emptyField: '#ffffff',
            clickedField: '#e2e2d9',
            givenField: "#657564"
        },
        squareSize: 9,
        givenFieldSign: 0,
        lastClicked: undefined,
        rows: [],
        sudoku: [
            [0, 8, 9, 2, 0, 3, 0, 0, 1],
            [0, 0, 6, 0, 8, 5, 0, 0, 0],
            [0, 0, 4, 6, 9, 0, 0, 0, 0],
            [6, 1, 0, 0, 0, 0, 8, 0, 0],
            [0, 0, 7, 0, 0, 0, 2, 0, 0],
            [0, 0, 5, 0, 0, 0, 0, 1, 3],
            [0, 0, 0, 0, 1, 6, 9, 0, 0],
            [0, 0, 0, 8, 5, 0, 1, 0, 0],
            [4, 0, 1, 9, 3, 2, 0, 7, 8]
        ],
    },
    methods: {
        initialize: function () {
            let tempRows = [];
            for (let i = 0; i < this.squareSize; i++) {
                let tempColumns = [];
                for (let j = 0; j < this.squareSize; j++) {
                    tempColumns[j] = this.setPropertiesForIndex(i, j);
                }
                tempRows[i] = {columns: tempColumns};
            }
            this.rows = tempRows;
            this.solveSudoku();
        },

        setPropertiesForIndex: function (row, column) {
            let field = {};
            field.row = row;
            field.column = column;
            if (this.sudoku[row][column] === 0) {
                field.number = "";
                field.color = this.colors.emptyField;
                field.given = false;
            } else {
                field.number = this.sudoku[row][column];
                field.color = this.colors.givenField;
                field.given = true;
            }
            return field;
        },

        onClick: function (field, event) {
            if (field.given) {
                return;
            }

            const CURSOR_ON_SECOND_POSITION = 1;
            if (this.lastClicked !== undefined) {
                this.rows[this.lastClicked.row].columns[this.lastClicked.column].color = this.colors.emptyField;
            }
            this.lastClicked = field;
            field.color = this.colors.clickedField;
            let clickedInputField = event.target;
            this.setCursor(clickedInputField, CURSOR_ON_SECOND_POSITION);
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
            let allFieldsCalculated = false;
            let currentRow = 0;
            let currentColumn = 0;
            let isForward = true;
            let breaker = 0;
            while (!allFieldsCalculated) {
                //console.log("XX: "+currentRow+" "+currentColumn);
                breaker++;
                if(breaker > 20000){
                    return;
                }
                if (this.sudoku[currentRow][currentColumn] === this.givenFieldSign || !isForward){
                    let isCorrect = this.calculateNumberForField(currentRow, currentColumn, isForward);
                    //console.log("isCorrect: "+isCorrect);
                    if(isCorrect){
                        isForward = true;
                        if(currentColumn < 9){
                            currentColumn++;
                        }else{
                            currentRow++;
                            currentColumn = 0;
                        }
                    }else{
                        if(currentColumn === 0 && currentRow === 0){
                            //console.log("keine Lösung");
                            return;
                        }
                        isForward = false;
                        if(currentColumn > 0){
                            currentColumn--;
                        }else{
                            currentRow--;
                            currentColumn = 8;
                        }
                    }
                }else{
                    if(isForward) {
                        if (currentColumn < 9) {
                            currentColumn++;
                        } else {
                            currentRow++;
                            currentColumn = 0;
                        }
                    }else{
                        if(currentColumn > 0){
                            currentColumn--;
                        }else{
                            currentRow--;
                            currentColumn = 8;
                        }
                    }
                }
                if(currentRow === 9){ // schon geaddet
                    allFieldsCalculated = true;
                }
            }
        },

        calculateNumberForField: function (currentRow, currentColumn, isForward) {
            //console.log("given row: "+currentRow+" given column: "+currentColumn);
            if(this.rows[currentRow].columns[currentColumn].given){
                return isForward;
            }
            if(!isForward){
                console.log("back");
                var oldInput = this.rows[currentRow].columns[currentColumn].number;
            }
            for(let input = isForward ? 1 : oldInput+1; input < 10; input++) {
                let isUnique = true;

                let quarterRow = this.findQuarterPosition(currentRow);
                let quarterColumn = this.findQuarterPosition(currentColumn);
                //console.log(" qq: "+quarterRow + " "+quarterColumn);
                //console.log("input: "+input);
                for (let iterator = 0; iterator < 9; iterator++) {
                    this.rows[currentRow].columns[currentColumn].number = input;

                    isUnique = isUnique && this.containsNumber(quarterRow, quarterColumn, currentRow, currentColumn, input, iterator);
                    //console.log("isUnique: "+isUnique + " Iterator: "+iterator);
                    if (!isUnique) {
                        break;
                    }
                    if (quarterColumn%3 === 2) {
                        quarterRow++;
                        quarterColumn = this.findQuarterPosition(currentColumn);
                    } else {
                        quarterColumn++;
                    }
                    if(iterator === 8){
                        return isUnique
                    }
                }
            }
            if(this.rows[currentRow].columns[currentColumn].number === 9){
                this.rows[currentRow].columns[currentColumn].number = "";
            }
            return false;
        },

        containsNumber: function(quarterRow, quarterColumn, currentRow, currentColumn, input, iterator){
            if (iterator !== currentRow) {
                if (this.rows[iterator].columns[currentColumn].number === input) {
                    //console.log("x");
                    return false;
                }
            }
            if (iterator !== currentColumn) {
                if (this.rows[currentRow].columns[iterator].number === input) {
                    //console.log("y");
                    return false;
                }
            }
            if (quarterRow === currentRow && quarterColumn === currentColumn){}else{
                //console.log("currentRow Quarter: "+ quarterRow+ " currentColumn Quarter: "+quarterColumn);
                if (this.rows[quarterRow].columns[quarterColumn].number === input) {
                    //console.log("z");
                    return false;
                }
            }
            return true;
        },


        findQuarterPosition: function (index) {
            if (index > 2) {
                if (index > 5) {
                    return 6;
                } else {
                    return 3;
                }
            } else {
                return 0;
            }
        },
    },

    created() {
        this.initialize();
    }
});

