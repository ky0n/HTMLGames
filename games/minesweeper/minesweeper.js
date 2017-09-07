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
        ],
        height: 9, // Anzahl der Zeilen
        width: 9,  // Anzahl der Spalten
        numBombs: 10,
        rows: [
            // wird bei der Initialisierung belegt
        ],
        bombs: [],
    },
    methods: {
        initialize: function () {
            for (let i = 0; i < this.numBombs; i++) {
                let fieldFound = false;
                while (!fieldFound) {
                    let k = Math.floor(Math.random() * (this.height * this.width));
                    if (!this.bombs.includes(k)) {
                        this.bombs.push(k);
                        fieldFound = true;
                    }
                }
            }

            let tempRows = [];
            for (let i = 0; i < this.height; i++) {
                let tempColumns = [];
                for (let j = 0; j < this.width; j++) {
                    let fieldIndex = i * this.height + j;
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

            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
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
                            } else if (j === this.width - 1) {
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
                        } else if (i === this.height - 1) {
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
                            } else if (j === this.width - 1) {
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
                            } else if (j === this.width - 1) {
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
            if (i < 0 || i >= this.height || j < 0 || j >= this.width) {
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
            if (i < 0 || i >= this.height || j < 0 || j >= this.width) {
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

        rightClick: function (field) {
            flags.setFlag(field);
            this.checkForWin();
        },

        checkForWin: function () {
            for (let i = 0; i < this.bombs.length; i++) {
                let j = Math.floor(this.bombs[i] / this.height);
                let k = this.bombs[i] % this.width;

                if (this.rows[j].columns[k].value !== "F") {
                    return;
                }
            }
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    this.rows[i].columns[j].disabled = true;
                }
            }
            timeCount.stopCounting();
            alert('you won \n time needed: ' + timeCount.time);
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
    },
    methods: {
        startCounting: function () {
            if (!this.started) {
                this.started = true;
                this.intervalID = setInterval(this.oneSecondPassed, 1000); // die Methode wird nach jeder vergangenen Sekunde aufgerufen
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
            if (minesweeper.numBombs === null) {

            } else {
                this.remainingFlags = minesweeper.numBombs;
            }
        },
        setFlag: function (field) {
            if (this.remainingFlags > 0) {
                field.value = "F";
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
        gameMode: 'Beginner',
        height: undefined,
        width: undefined,
        numBombs: null
    },
    methods: {
        onChange: function () {
            switch (this.gameMode) {
                case 'Beginner':
                    minesweeper.height = 9;
                    minesweeper.width = 9;
                    minesweeper.numBombs = 10;
                    break;
                case 'Intermediate':
                    minesweeper.height = 16;
                    minesweeper.width = 16;
                    minesweeper.numBombs = 40;
                    break;
                case 'Expert':
                    minesweeper.height = 16;
                    minesweeper.width = 30;
                    minesweeper.numBombs = 99;
                    break;
                case 'Custom':
                    if (this.height < 40 && this.width < 40 && this.numBombs < this.height * this.width) {
                        minesweeper.height = this.height;
                        minesweeper.width = this.width;
                        minesweeper.numBombs = this.numBombs;
                    } else {
                        return;
                    }
                    break;
            }
            restartGame.newGame();
        }
    },
});