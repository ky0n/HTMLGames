/**
 * Created By Hendrik
 */
let minesweeper = new Vue({
    el: '#minesweeperField',
    data: {
        colors: [
            {color: "#87776e"},       // Felder
            {color: "#000000"},       // ist Bombe
            {color: "#1c49bc"},       // 1 Bombe
            {color: "#1f960d"},       // 2 Bomben
            {color: "#581f8e"},       // 3 Bomben
            {color: "#ba7821"},       // 4 Bomben
            {color: "#bc2112"}        // 5 Bomben
            //TODO Farbe fuer 6,7,8 BOMBEN
        ],
        numOfRows: 9,
        numOfColumns: 9,  // Anzahl der Spalten
        numOfBombs: 10,
        rows: [
            // wird bei der Initialisierung belegt
        ],
        bombs: [],
    },
    methods: {
        initialize: function () {
            this.spawnBombs();
            this.initializeFields();
            this.saveNearBombs();
        },

        spawnBombs: function () {
            for (let i = 0; i < this.numOfBombs; i++) {
                let fieldFound = false;
                while (!fieldFound) {
                    let k = Math.floor(Math.random() * (this.numOfRows * this.numOfColumns));
                    if (!this.bombs.includes(k)) {
                        this.bombs.push(k);
                        fieldFound = true;
                    }
                }
            }
        },

        initializeFields: function () {
            let tempRows = [];
            for (let i = 0; i < this.numOfRows; i++) {
                let tempColumns = [];
                for (let j = 0; j < this.numOfColumns; j++) {
                    let fieldIndex = i * this.numOfRows + j;
                    let field = {};
                    field.isBomb = this.bombs.includes(fieldIndex);
                    field.color = this.colors[0].color;
                    field.disabled = false;
                    field.clicked = false;
                    field.row = i;
                    field.column = j;
                    field.nearBombs = 0;
                    tempColumns[j] = field;
                }
                tempRows[i] = {columns: tempColumns};
            }
            this.rows = tempRows;
        },

        saveNearBombs: function () {
            for (let i = 0; i < this.numOfRows; i++) {
                for (let j = 0; j < this.numOfColumns; j++) {
                    let field = this.rows[i].columns[j];
                    if (!field.isBomb) {
                        if (i === 0) {
                            if (j === 0) {
                                if (this.rows[i].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j].isBomb) {
                                    field.nearBombs += 1;
                                }
                            } else if (j === this.numOfColumns - 1) {
                                if (this.rows[i].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j].isBomb) {
                                    field.nearBombs += 1;
                                }
                            } else {
                                if (this.rows[i].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                            }
                        } else if (i === this.numOfRows - 1) {
                            if (j === 0) {
                                if (this.rows[i - 1].columns[j].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                            } else if (j === this.numOfColumns - 1) {
                                if (this.rows[i - 1].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                            } else {
                                if (this.rows[i].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                            }
                        } else {
                            if (j === 0) {
                                if (this.rows[i - 1].columns[j].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                            } else if (j === this.numOfColumns - 1) {
                                if (this.rows[i - 1].columns[j].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j].isBomb) {
                                    field.nearBombs += 1;
                                }
                            } else {
                                if (this.rows[i - 1].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j - 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j].isBomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j + 1].isBomb) {
                                    field.nearBombs += 1;
                                }
                            }
                        }
                        field.color = this.colors[0].color;
                    }
                }
            }
        },

        /* left click things: */

        leftClick: function (field) {
            timeCount.startCounting();
            field.disabled = true;
            field.clicked = true;
            if (field.value === "F") {
                flags.remainingFlags++;
                field.value = "";
            }
            if (field.isBomb) {
                timeCount.stopCounting();
                this.clickedBomb = field;
                this.searchBombs(this.clickedBomb.row, this.clickedBomb.column);
            } else {
                if (field.nearBombs === 0) {
                    this.searchEmptyFields(field.row, field.column);
                } else {
                    field.color = this.colors[field.nearBombs + 1].color;
                    field.value = "" + field.nearBombs;
                }
            }
        },

        searchEmptyFields: function (i, j) {
            if (i < 0 || i >= this.numOfRows || j < 0 || j >= this.numOfColumns) {
                return;
            }

            let field = this.rows[i].columns[j];
            field.disabled = true;

            if (field.nearBombs === 0 && !field.visitedForEmptiness) {
                field.visitedForEmptiness = true;
                field.clicked = true;
                if (field.value === "F") {
                    flags.remainingFlags++;
                }
                field.value = null;
                field.color = this.colors[field.nearBombs + 1].color;

                this.searchEmptyFields(i + 1, j);
                this.searchEmptyFields(i, j + 1);
                this.searchEmptyFields(i - 1, j);
                this.searchEmptyFields(i, j - 1);
                this.searchEmptyFields(i - 1, j - 1);
                this.searchEmptyFields(i - 1, j + 1);
                this.searchEmptyFields(i + 1, j - 1);
                this.searchEmptyFields(i + 1, j + 1);
            } else if (field.nearBombs !== 0 && !field.visitedForEmptiness && !field.visitedNeighbour) {
                field.visitedNeighbour = true;
                field.clicked = true;
                field.color = this.colors[field.nearBombs + 1].color;
                field.value = "" + field.nearBombs;

            }
        },

        searchBombs: function (i, j) {
            if (i < 0 || i >= this.numOfRows || j < 0 || j >= this.numOfColumns) {
                return;
            }

            let field = this.rows[i].columns[j];
            field.disabled = true;

            if (!field.visitedForBomb) {
                field.visitedForBomb = true;
                if (field.isBomb && !Object.is(field, this.clickedBomb)) { //Object.is checkt ob die beiden Objekte gleich sind
                    field.value = "B";
                    field.color = this.colors[1].color;
                    field.clicked = true;
                } else if (Object.is(field, this.clickedBomb)) {
                    field.value = "B";
                    field.color = this.colors[6].color;
                }
                this.searchBombs(i + 1, j);
                this.searchBombs(i, j + 1);
                this.searchBombs(i - 1, j);
                this.searchBombs(i, j - 1);
            }
        },

        /* right click things : */

        rightClick: function (field, event) {
            event.preventDefault();
            flags.setFlag(field);
            this.checkForWin();
        },

        checkForWin: function () {
            for (let i = 0; i < this.bombs.length; i++) {
                let j = Math.floor(this.bombs[i] / this.numOfRows);
                let k = this.bombs[i] % this.numOfColumns;

                if (this.rows[j].columns[k].value !== "F") {
                    return;
                }
            }
            for (let i = 0; i < this.numOfRows; i++) {
                for (let j = 0; j < this.numOfColumns; j++) {
                    this.rows[i].columns[j].disabled = true;
                }
            }
            timeCount.stopCounting();
            alert('you won \n time needed: ' + timeCount.time);
        },

        setSizeAndBombs: function (numOfRows, numOfColumns, numBombs) {
            this.numOfRows = numOfRows;
            this.numOfColumns = numOfColumns;
            this.numOfBombs = numBombs;
        }
    },

    created() {
        this.initialize();
    }
});

let timeCount = new Vue({
    el: '#timeCount',
    data: {
        started: false,
        time: 0,
        intervalID: null,
        oneSecondInMilliseconds: 1000,
    },
    methods: {
        startCounting: function () {
            if (!this.started) {
                this.started = true;
                this.intervalID = setInterval(this.oneSecondPassed, this.oneSecondInMilliseconds);
            }
        },
        oneSecondPassed: function () {
            this.time++;
        },
        stopCounting: function () {
            clearInterval(this.intervalID);
            this.started = false;
        }
    }
});

let flags = new Vue({
    el: '#flags',
    data: {
        remainingFlags: 10,
    },
    methods: {
        fillFlagsUp() {
            if (minesweeper.numOfBombs === null) {

            } else {
                this.remainingFlags = minesweeper.numOfBombs;
            }
        },
        setFlag: function (field) {
            if (this.remainingFlags > 0 && field.value !== "F") {
                field.value = "F";
                field.color = "red";
                this.remainingFlags--;
            } else {
                //TODO sound ?
            }
        }
    }
});

let restartGame = new Vue({
    el: '#restartButton',
    methods: {
        newGame: function () {
            timeCount.stopCounting();
            timeCount.time = 0;
            flags.fillFlagsUp();
            minesweeper.bombs.length = 0; // entfernt alle Elemente des Arrays
            minesweeper.initialize();
        }
    },
});

let difficulty = new Vue({
    el: '#fieldsetSelection',
    data: {
        gameMode: this.beginner,
        insertedNumOfRows: undefined,
        insertedNumOfColumns: undefined,
        insertedNumOfBombs: undefined,

        beginner: 'Beginner',
        beginnerRows: 9,
        beginnerColumns: 9,
        beginnerBombs: 10,

        intermediate: 'Intermediate',
        intermediateRows: 16,
        intermediateColumns: 16,
        intermediateBombs: 40,

        expert: 'Expert',
        expertRows: 16,
        expertColumns: 30,
        expertBombs: 99,

        custom: 'Custom',
        maxNumOfColumns: 99,
        maxNumOfRows: 99,
        maxNumOfBombs: this.maxNumOfColumns * this.maxNumOfRows - 1
    },
    methods: {
        onChange: function () {
            switch (this.gameMode) {
                case this.beginner:
                    minesweeper.setSizeAndBombs(this.beginnerRows, this.beginnerColumns, this.beginnerBombs);
                    break;
                case this.intermediate:
                    minesweeper.setSizeAndBombs(this.intermediateRows, this.intermediateColumns, this.intermediateBombs);
                    break;
                case this.expert:
                    minesweeper.setSizeAndBombs(this.expertRows, this.expertColumns, this.expertBombs);
                    break;
                case this.custom:
                    if (this.insertedNumOfRows < this.maxNumOfRows && this.insertedNumOfColumns < this.maxNumOfColumns &&
                        this.insertedNumOfBombs < this.maxNumOfBombs) {
                        minesweeper.setSizeAndBombs(this.insertedNumOfRows, this.insertedNumOfColumns, this.insertedNumOfBombs)
                    } else {
                        return;
                    }
                    break;
            }
            restartGame.newGame();
        },
    }
});