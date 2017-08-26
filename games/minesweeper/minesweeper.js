var vueObj = new Vue({
    el: '#minesweeper',
    data: {
        colors: [
            {color: "#6c1489"},       // ungeklicktes Feld
            {color: "#c57dce"},       // angeklicktes Feld
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
                    element.bomb = bombs.includes(field);
                    element.color = this.colors[0].color;
                    tempColumns[j] = element;
                }
                tempRows[i] = {columns: tempColumns};
            }
            this.rows = tempRows;

            for (let i = 0; i < this.squareSize; i++) {
                for (let j = 0; j < this.squareSize; j++) {
                    let field = this.rows[i].columns[j];
                    field.nearBombs = 0;
                    if (!field.bomb) {
                        if (i === 0) {
                            if (j === 0) {

                                if (this.rows[i].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j].bomb) {
                                    field.nearBombs += 1;
                                }
                            } else if (j === this.squareSize - 1) {
                                if (this.rows[i].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j].bomb) {
                                    field.nearBombs += 1;
                                }
                            } else {
                                if (this.rows[i].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                            }
                        } else if (i === 8) {
                            if (j === 0) {
                                if (this.rows[i - 1].columns[j].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                            } else if (j === this.squareSize - 1) {
                                if (this.rows[i - 1].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                            } else {
                                if (this.rows[i].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                            }
                        } else {
                            if (j === 0) {
                                if (this.rows[i - 1].columns[j].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                            } else if (j === this.squareSize - 1) {
                                if (this.rows[i - 1].columns[j].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j].bomb) {
                                    field.nearBombs += 1;
                                }
                            } else {
                                if (this.rows[i - 1].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i - 1].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i+1].columns[j - 1].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j].bomb) {
                                    field.nearBombs += 1;
                                }
                                if (this.rows[i + 1].columns[j + 1].bomb) {
                                    field.nearBombs += 1;
                                }
                            }
                        }
                        field.color = this.colors[field.nearBombs + 2].color;
                    } else {
                        field.nearBombs = "bomb";
                    }
                }
            }


        },

        leftClick: function () {

        },
        rightClick: function () {

        }


    },

    created() {
        this.initialize();
    }

});