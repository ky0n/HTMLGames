/**
 * Created By Hendrik
 */
let minesweeper = new Vue({
    el: '#minesweeperField',
    data: {
        colors: {
            unclickedField: "#87776e",
            isBomb: "#000000",
            clickedFieldWithBomb: "#f90000",
            numberOfNearBombs: [
                "#2e5cb2", // 1 near bomb
                "#1f960d", // 2 near bombs
                "#d63131", // 3 near bombs
                "#0e1e84", // 4 near bombs
                "#87530e", // 5 near bombs
                "#00FFFF", // 6 near bombs
                "#111111", // 7 near bombs
                "#827f78"  // 8 near bombs
            ],
        },
        numOfRows: 9,
        numOfColumns: 9,
        numOfBombs: 10,
        rows: [
            // wird bei der Initialisierung-Methode belegt
        ],
        bombs: [],
        imagesForButtons: {
            bomb: "Bomb.svg",
            flag: "Flag.svg"
        }
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
                    field.color = this.colors.unclickedField;
                    field.disabled = false;
                    field.clicked = false;
                    field.row = i;
                    field.column = j;
                    field.nearBombs = 0;
                    field.image = null;
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
                    }
                }
            }
        },

        /* left click things: */

        leftClick: function (field) {
            timeCount.startCounting();
            field.disabled = true;
            field.clicked = true;
            if (field.image === this.imagesForButtons.flag) {
                flags.remainingFlags++;
                field.image = null;
            }
            if (field.isBomb) {
                timeCount.stopCounting();
                this.searchBombs(field.row, field.column, field);
            } else {
                if (field.nearBombs === 0) {
                    this.searchEmptyFields(field.row, field.column);
                } else {
                    field.color = this.colors.numberOfNearBombs[field.nearBombs];
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
                if (field.image === this.imagesForButtons.flag) {
                    field.image = null;
                    flags.remainingFlags++;
                }
                field.value = null;
                field.color = this.colors.numberOfNearBombs[field.nearBombs];

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
                field.color = this.colors.numberOfNearBombs[field.nearBombs];
                if (field.image === this.imagesForButtons.flag) {
                    field.image = null;
                    flags.remainingFlags++;
                }
                field.value = "" + field.nearBombs;

            }
        },

        searchBombs: function (i, j, firstClickedField) {
            if (i < 0 || i >= this.numOfRows || j < 0 || j >= this.numOfColumns) {
                return;
            }

            let field = this.rows[i].columns[j];
            field.disabled = true;

            if (!field.visitedForBomb) {
                field.visitedForBomb = true;
                if (field.isBomb && !Object.is(field, firstClickedField)) { //Object.is checkt ob die beiden Objekte gleich sind
                    field.image = this.imagesForButtons.bomb;
                    field.color = this.colors.unclickedField;
                    field.clicked = true;
                } else if (Object.is(field, firstClickedField)) {
                    field.image = this.imagesForButtons.bomb;
                    field.background = this.colors.clickedFieldWithBomb;
                }
                this.searchBombs(i + 1, j);
                this.searchBombs(i, j + 1);
                this.searchBombs(i - 1, j);
                this.searchBombs(i, j - 1);
            }
        },

        /* right click things : */

        rightClick: function (field, event) {
            if (field.image === this.imagesForButtons.flag) {
                return;
            }
            event.preventDefault();
            field.image = this.imagesForButtons.flag;
            flags.setFlag();
            this.checkForWin();
        },

        checkForWin: function () {
            for (let i = 0; i < this.bombs.length; i++) {
                let j = Math.floor(this.bombs[i] / this.numOfRows);
                let k = this.bombs[i] % this.numOfColumns;

                if (this.rows[j].columns[k].value !== this.imagesForButtons.flag) { // doesnt work for expert and more fields..
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
        setFlag: function () {
            if (this.remainingFlags > 0) {
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
        gameMode: null,
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
    },

    created(){
        this.gameMode = this.beginner;
    }
});