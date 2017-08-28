let minesweeper = new Vue({
    el: '#minesweeper',
    data: {
        colors: [
            {color: "#87776e"},       // ungeklicktes Feld
            {color: "#000000"},       // ist Bombe
            {color: "#87776e"},       // keine Bomben
            {color: "#1c49bc"},       // 1 Bombe
            {color: "#1f960d"},       // 2 Bomben
            {color: "#581f8e"},       // 3 Bomben
            {color: "#ba7821"},       // 4 Bomben
            {color: "#bc2112"}        // 5 Bomben
        ],
        squareSize: 9,
        numBombs: 10,
        rows: [
            // wird bei der Initialisierung belegt
        ],
        bombs: [],
        clickedBomb: null // die angeklickte Bombe erhält Farbe rot
    },
    methods: {
        initialize: function () {
            for (let i = 0; i < this.numBombs; i++) {
                let fieldFound = false;
                while (!fieldFound) {
                    let k = Math.floor(Math.random() * (this.squareSize * this.squareSize));
                    if (!this.bombs.includes(k)) {
                        this.bombs.push(k);
                        fieldFound = true;
                    }
                }
            }

            let tempRows = [];
            for (let i = 0; i < this.squareSize; i++) {
                let tempColumns = [];
                for (let j = 0; j < this.squareSize; j++) {
                    let field = i * this.squareSize + j;
                    let element = {};
                    element.isBomb = this.bombs.includes(field);
                    element.color = this.colors[0].color;
                    element.disabled = false;
                    element.clicked = false;
                    element.row = i;
                    element.column = j;
                    element.nearBombs = 0;
                    tempColumns[j] = element;
                }
                tempRows[i] = {columns: tempColumns};
            }
            this.rows = tempRows;

            for (let i = 0; i < this.squareSize; i++) {
                for (let j = 0; j < this.squareSize; j++) {
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
                            } else if (j === this.squareSize - 1) {
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
                        } else if (i === this.squareSize - 1) {
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
                            } else if (j === this.squareSize - 1) {
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
                            } else if (j === this.squareSize - 1) {
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
                    } else {
                        field.nearBombs = "bomb";
                    }

                }
            }
        },

        /* left click things: */

        leftClick: function (field) {
            field.disabled = true;
            field.clicked = true;
            if (field.value === "FLAG") {
                flags.numFlags++;
                field.value = "";
            }
            timeCount.startCounting();
            if (field.isBomb) {
                timeCount.stopCounting();
                this.clickedBomb = field;
                this.searchBombs(this.clickedBomb.row, this.clickedBomb.column);
            } else {
                if (field.nearBombs === 0) {
                    this.searchEmptyFields(field.row, field.column);
                } else {
                    field.color = this.colors[field.nearBombs + 2].color;
                    field.value = "" + field.nearBombs;
                }
            }

        },

        searchEmptyFields: function (i, j) {
            if (i < 0 || i >= this.squareSize || j < 0 || j >= this.squareSize) {
                return;
            }

            let field = this.rows[i].columns[j];
            field.disabled = true;

            if (field.nearBombs === 0 && !field.visitedForEmptiness) {
                field.visitedForEmptiness = true;
                field.clicked = true;
                field.color = this.colors[field.nearBombs + 2].color;

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
                field.color = this.colors[field.nearBombs + 2].color;
                field.value = "" + field.nearBombs;

            }
        },

        searchBombs: function (i, j) {
            if (i < 0 || i >= this.squareSize || j < 0 || j >= this.squareSize) {
                return;
            }

            let field = this.rows[i].columns[j];
            field.disabled = true;

            if (!field.visitedForBomb) {
                field.visitedForBomb = true;
                if (field.isBomb && !Object.is(field,this.clickedBomb)) { //Object.is checkt ob die beiden Objekte gleich sind
                    console.log("yo");
                    field.value = "BOMB";
                    field.color = this.colors[1].color;
                    field.clicked = true;
                }else if(Object.is(field,this.clickedBomb)){
                    field.value = "BOMB";
                    field.color = this.colors[7].color;
                }
                this.searchBombs(i + 1, j);
                this.searchBombs(i, j + 1);
                this.searchBombs(i - 1, j);
                this.searchBombs(i, j - 1);
            }
        },

        /* right click things : */

        rightClick: function (field, event) {
            event.preventDefault(); // blockiert Aufruf vom Contextmenu
            flags.setFlag(field);
            this.checkForWin();
        },

        checkForWin: function () {
            let win;
            for (let i = 0; i < this.bombs.length; i++) {
                let j = Math.floor(this.bombs[i] / this.squareSize);
                let k = this.bombs[i] % this.squareSize;

                if(this.rows[j].columns[k].value !== "FLAG"){
                    return;
                }
            }
            timeCount.stopCounting();
            alert('wonnered \n Time: '+ timeCount.time);
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
        numFlags: 20,
        remainingFlags: 20,
    },
    methods: {
        fillFlagsUp() {
            this.remainingFlags = this.numFlags;
        },
        setFlag: function (field) {
            if (this.remainingFlags > 0) {
                field.value = "FLAG";
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
    }
});