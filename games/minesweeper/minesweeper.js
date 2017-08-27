let vueObj = new Vue({
    el: '#minesweeper',
    data: {
        colors: [
            {color: "#6c1489"},       // ungeklicktes Feld
            {color: "#ffffff"},       // ist Bombe
            {color: "#87776e"},       // keine Bomben
            {color: "#1c49bc"},       // 1 Bombe
            {color: "#1f960d"},       // 2 Bomben
            {color: "#d1ce2f"},       // 3 Bomben
            {color: "#ba7821"},       // 4 Bomben
            {color: "#bc2112"}        // 5 Bomben

        ],
        squareSize: 9,
        numBombs: 10,
        rows: [
            // wird bei der Initialisierung belegt
        ],
        gameOver: false
    },
    methods: {
        initialize: function () {
            let bombs = [];
            for (let i = 0; i < this.numBombs; i++) {
                let fieldFound = false;
                while (!fieldFound) {
                    let k = Math.floor(Math.random() * (this.squareSize * this.squareSize));
                    if (!bombs.includes(k)) {
                        bombs.push(k);
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
                    element.isBomb = bombs.includes(field);
                    element.color = this.colors[0].color;
                    element.disabled = false;
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

        leftClick: function (field) {
            timeCount.startCounting();
            field.disabled = true;
            if (field.isBomb) {
                field.color = this.colors[7].color;
                this.gameOver = true;
                timeCount.stopCounting();
                this.searchBombs(field.row, field.column);
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
            } else {
                var field = this.rows[i].columns[j];
                field.disabled = true;
            }
            if (field.nearBombs === 0 && !field.visited) {
                field.visited = true;
                field.color = this.colors[field.nearBombs + 2].color;

                this.searchEmptyFields(i + 1, j);
                this.searchEmptyFields(i, j + 1);
                this.searchEmptyFields(i - 1, j);
                this.searchEmptyFields(i, j - 1);
                this.searchEmptyFields(i - 1, j - 1);
                this.searchEmptyFields(i - 1, j + 1);
                this.searchEmptyFields(i + 1, j - 1);
                this.searchEmptyFields(i + 1, j + 1);
            } else if (field.nearBombs !== 0 && !field.visited && !field.visitedNeighbour) {
                field.color = this.colors[field.nearBombs + 2].color;
                field.value = "" + field.nearBombs;
                field.visitedNeighbour = true;
            }
        },

        searchBombs: function (i, j) {
            if (i < 0 || i >= this.squareSize || j < 0 || j >= this.squareSize) {
                return;
            } else {
                var field = this.rows[i].columns[j];
                field.disabled = true;
            }
            if (!field.visited) {
                field.visited = true;
                if (field.isBomb) {
                    field.value = "BOMB";
                    field.color = this.colors[1].color;
                }
                this.searchBombs(i + 1, j);
                this.searchBombs(i, j + 1);
                this.searchBombs(i - 1, j);
                this.searchBombs(i, j - 1);
            }
        },

        rightClick: function (field, event) {
            event.preventDefault();
            field.value = "FLAG";
            flags.setFlag();
        },
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
            clearInterval(this.intervalID)
        }
    }

});

let flags = new Vue({
    el: '#flags',
    data: {
        numFlags: 10
    },
    methods: {
        setFlag: function () {
            if (this.numFlags > 0) {
                this.numFlags--;
            }else{
                //TODO sound ?
            }
        }
    }
});