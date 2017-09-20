/**
 * Created By Hendrik
 */
let sudokuObj = new Vue({
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
            [0, 0, 0, 2, 0, 0, 0, 6, 3],
            [3, 0, 0, 0, 0, 5, 4, 0, 1],
            [0, 0, 1, 0, 0, 3, 9, 8, 0],
            [0, 0, 0, 0, 0, 0, 0, 9, 0],
            [0, 0, 0, 5, 3, 8, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 6, 3, 0, 0, 5, 0, 0],
            [5, 0, 3, 7, 0, 0, 0, 0, 8],
            [4, 7, 0, 0, 0, 1, 0, 0, 0]
        ],
        sudoku3: [
            [0, 0, 0, 2, 0, 8, 0, 6, 3],
            [3, 0, 0, 0, 0, 5, 4, 0, 1],
            [0, 0, 1, 0, 0, 3, 9, 8, 0],
            [0, 0, 0, 0, 0, 0, 9, 9, 0],
            [0, 0, 0, 5, 3, 8, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 6, 3, 0, 0, 5, 0, 0],
            [5, 0, 3, 7, 0, 0, 0, 0, 8],
            [4, 7, 0, 0, 0, 1, 0, 0, 0]
        ],

        numbersForSudoku: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        sudoku2: [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]],
        savedWin: [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]],
        isUniqueWin: false,
        moreSolutionThenOne: false,
    },
    methods: {
        initialize: function () {
            console.log("p");
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
            //this.fillWithRandomNumber();
        },

        setPropertiesForIndex: function (row, column) {
            let field = {};
            field.row = row;
            field.column = column;
            if (this.sudoku[row][column] === 0) {
                field.number = "";
                field.color = this.colors.emptyField;
                field.given = false;
                console.log("yi");
            } else {
                field.number = this.sudoku[row][column];
                field.color = this.colors.givenField;
                field.given = true;
            }
            console.log("yi2");
            return field;
        },

        solveSudoku: function () {
            if (!(this.sudoku[0] instanceof Array)) {
                return false;
            }

            let allFieldsCalculated = false;
            let currentRow = 0;
            let currentColumn = 0;
            let isForward = true;
            let breaker = 0;
            while (!allFieldsCalculated) {
                breaker++;
                if (breaker > 50000) {
                    console.log("nope");
                    return false;
                }
                console.log("currentRow: "+currentRow);
                if (this.sudoku[currentRow][currentColumn] === this.givenFieldSign || !isForward) {
                    let isCorrect = this.calculateNumberForField(currentRow, currentColumn, isForward);
                    if (isCorrect) {
                        isForward = true;
                        if (currentColumn < 9) {
                            currentColumn++;
                        } else {
                            currentRow++;
                            currentColumn = 0;
                        }
                    } else {
                        if (currentColumn === 0 && currentRow === 0) {
                            console.log("RIPPED");
                            document.getElementById("display").innerHTML="only one solution";
                            if(this.isUniqueWin){
                                for(let i=0; i <9;i++){
                                    for(let j=0; j<9;j++){
                                        this.rows[i].columns[j].number = this.savedWin[i][j];
                                    }
                                }
                            }
                            return false;
                        }
                        isForward = false;
                        if (currentColumn > 0) {
                            currentColumn--;
                        } else {
                            currentRow--;
                            currentColumn = 8;
                        }
                    }
                } else {
                    if (isForward) {
                        if (currentColumn < 9) {
                            currentColumn++;
                        } else {
                            currentRow++;
                            currentColumn = 0;
                        }
                    } else {
                        if (currentColumn > 0) {
                            currentColumn--;
                        } else {
                            currentRow--;
                            currentColumn = 8;
                        }
                    }
                }
                if (currentRow === 9) {
                    if(!this.isUniqueWin) {
                        for (let i = 0; i < 9; i++) {
                            for (let j = 0; j < 9; j++) {
                                console.log("yo : " + i + " " + j);
                                this.savedWin[i][j] = this.rows[i].columns[j].number;
                                if(!this.rows[i].columns[j].given){
                                    this.sudoku[i][j] = 0;
                                    this.rows[i].columns[j].number = "";
                                }
                            }
                        }
                        this.isUniqueWin = true;
                        this.rows[8].columns[8].color = "blue";
                        this.solveSudoku();
                        return;
                    }else{
                        document.getElementById("display").innerHTML = "at least 2 Solutions";
                        alert("two wins");
                        for (let i = 0; i < 9; i++) {
                            for (let j = 0; j < 9; j++) {
                                console.log("yo2 : " + i + " " + j);
                                if(this.savedWin[i][j] !== this.sudoku[i][j]){
                                    console.log("Unterschied in Feld "+i+ " "+j);
                                }
                            }
                        }
                        return;
                    }

                }
            }console.log("yay");

        },

        calculateNumberForField: function (currentRow, currentColumn, isForward) {
            if (this.rows[currentRow].columns[currentColumn].given) {
                return isForward;
            }
            if (!isForward) {
                console.log("back");
                var oldInput = this.rows[currentRow].columns[currentColumn].number;
            }
            for (let input = isForward ? 1 : oldInput + 1; input < 10; input++) {
                let isUnique = true;

                let quarterRow = this.findQuarterPosition(currentRow);
                let quarterColumn = this.findQuarterPosition(currentColumn);
                for (let iterator = 0; iterator < 9; iterator++) {
                    this.rows[currentRow].columns[currentColumn].number = input;
                    //this.sudoku[currentColumn][currentRow] = input;

                    isUnique = isUnique && this.containsNumber(quarterRow, quarterColumn, currentRow, currentColumn, input, iterator);
                    if (!isUnique) {
                        break;
                    }
                    if (quarterColumn % 3 === 2) {
                        quarterRow++;
                        quarterColumn = this.findQuarterPosition(currentColumn);
                    } else {
                        quarterColumn++;
                    }
                    if (iterator === 8) {
                        if(currentRow === 8 && currentColumn === 8 && this.isUniqueWin){
                            return false;
                        }
                        return isUnique
                    }
                }
            }
            if (this.rows[currentRow].columns[currentColumn].number === 9) {
                this.rows[currentRow].columns[currentColumn].number = "";
            }
            return false;
        },

        containsNumber: function (quarterRow, quarterColumn, currentRow, currentColumn, input, iterator) {
            if (iterator !== currentRow) {
                if (this.rows[iterator].columns[currentColumn].number === input) {
                    return false;
                }
            }
            if (iterator !== currentColumn) {
                if (this.rows[currentRow].columns[iterator].number === input) {
                    return false;
                }
            }
            if (quarterRow === currentRow && quarterColumn === currentColumn) {
            } else {
                if (this.rows[quarterRow].columns[quarterColumn].number === input) {
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

        fillWithRandomNumber: function () {
            let solvable = false;
            let breaker = 0;
            while (!solvable) {
                breaker++;
                if (breaker > 100) {
                    console.log("rip");
                    return;
                }
                let fieldFound = false;
                let breaker2 = 0;
                while(!fieldFound) {
                    breaker2++;
                    if (breaker2 > 10){
                        console.log("rip");
                        return;
                    }
                    let randomColumn = Math.floor(Math.random() * 8);
                    let randomRow = Math.floor(Math.random() * 8);
                    console.log("randomColumn: " + randomColumn + " randomRow: " + randomRow);
                    if (!this.rows[randomRow].columns[randomColumn].given) {
                        fieldFound = true;
                        let randomNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
                        this.sudoku[randomRow][randomColumn] = randomNumber;
                        this.rows[randomRow].columns[randomColumn].color = this.colors.givenField;
                        this.rows[randomRow].columns[randomColumn].given = true;
                        this.rows[randomRow].columns[randomColumn].number = randomNumber;
                    }
                    if (this.solveSudoku()) {
                        solvable = true;
                    }
                }
            }
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
                textRange.moveStart('0');
                textRange.select();
                return true;
            } else if (node.setSelectionRange) { // fuer Chrome und Mozilla
                node.setSelectionRange(0, pos);
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
    },
    created() {
        this.initialize();
    }
});

