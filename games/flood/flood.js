/**
 * Created by romy on 22.08.2017.
 */
new Vue({
    el: '#flood',

    data: {
        colors: [ //TODO find good colors
            {color: 'rgb(255, 87, 34)'},
            {color: 'rgb(156, 39, 176)'},
            {color: 'rgb(33, 150, 243)'},
            {color: 'rgb(255, 235, 59)'},
            {color: 'rgb(139, 195, 74)'},
            {color: 'cyan'}
        ],
        squareSize: 9,
        rows: [
            // wird bei Initialisierung belegt
        ],
        moves: 0,
    },

    methods: {
        initialize: function () {
            let tempRows = [];
            for (let i = 0; i < this.squareSize; i++) {
                let tempColumns = [];
                for (let j = 0; j < this.squareSize; j++) {
                    let r = Math.floor(Math.random() * (this.colors.length));
                    let color = this.colors[r].color;
                    tempColumns[j] = {color: color, borderStyleClass: 'none', index: -1};
                }
                tempRows[i] = {columns: tempColumns};
            }
            this.rows = tempRows;

            let color = this.rows[0].columns[0].color;
            this.floodFill(0, 0, color, color);
        },

        changeColor: function(item){
            let oldColor = this.rows[0].columns[0].color;
            let newColor = item.color;

            if (oldColor === newColor) {
                return;
            }

            this.moves++;
            this.floodFill(0, 0, oldColor, newColor);
            for (let i = 0; i < this.squareSize; i++) {
                for (let j = 0; j < this.squareSize; j++) {
                    if (this.rows[i].columns[j].index != -1 && this.rows[i].columns[j].borderStyleClass != 'four') {
                        this.changeBorder(i, j);
                    }
                }
            }
        },

        floodFill: function(x, y, oldColor, newColor){
            if (x < 0 || x >= this.squareSize || y < 0 || y >= this.squareSize) {
                return;
            }

            if (this.rows[x].columns[y].color === newColor && this.rows[x].columns[y].index === -1) {
                this.borderFlood(x, y, newColor);
                return;
            }

            if (this.rows[x].columns[y].color === oldColor && this.rows[x].columns[y].index != this.moves) {
                this.rows[x].columns[y].color = newColor;
                this.floodFill(x+1, y, oldColor, newColor);
                this.floodFill(x, y+1, oldColor, newColor);
                this.floodFill(x-1, y, oldColor, newColor);
                this.floodFill(x, y-1, oldColor, newColor);
            }
        },

        borderFlood: function (x, y, color) {
            if (x < 0 || x >= this.squareSize || y < 0 || y >= this.squareSize) {
                return;
            }

            if (this.rows[x].columns[y].color === color && this.rows[x].columns[y].index === -1) {
                this.rows[x].columns[y].index = this.moves;
                this.borderFlood(x+1, y, color);
                this.borderFlood(x, y+1, color);
                this.borderFlood(x-1, y, color);
                this.borderFlood(x, y-1, color);
            }
        },
        
        changeBorder: function (x, y) {
            let color = this.rows[x].columns[y].color;
            let neighbours = this.checkNeighbours(x, y, color);

            if (neighbours.left) {
                if (neighbours.right) {
                    if (neighbours.top) {
                        if (neighbours.bottom) {
                            // vier Nachbarn
                            this.rows[x].columns[y].borderStyleClass = 'four';
                            if (neighbours.cornerLT && neighbours.cornerLB && neighbours.cornerRT && neighbours.cornerRB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersAll';
                            } else if (neighbours.cornerLT && neighbours.cornerLB && neighbours.cornerRT ) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersNoneRightBottom';
                            } else if (neighbours.cornerLT && neighbours.cornerLB && neighbours.cornerRB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersNoneRightTop';
                            } else if (neighbours.cornerLT && neighbours.cornerRT && neighbours.cornerRB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersNoneLeftBottom';
                            } else if (neighbours.cornerLB && neighbours.cornerRT && neighbours.cornerRB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersNoneLeftTop';
                            } else if (neighbours.cornerLT && neighbours.cornerLB ) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersLeft';
                            } else if (neighbours.cornerLT && neighbours.cornerRT) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersTop';
                            } else if (neighbours.cornerLT && neighbours.cornerRB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersMainDiagonal';
                            } else if (neighbours.cornerLB && neighbours.cornerRT) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersSecondDiagonal';
                            } else if (neighbours.cornerLB && neighbours.cornerRB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersBottom';
                            } else if (neighbours.cornerRT && neighbours.cornerRB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersRight';
                            } else if (neighbours.cornerLT) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerLeftTop';
                            } else if (neighbours.cornerLB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerLeftBottom';
                            } else if (neighbours.cornerRT) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerRightTop';
                            } else if (neighbours.cornerRB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerRightBottom';
                            }
                        } else {
                            // kein unterer Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'threeNoneBottom';
                            if (neighbours.cornerLT && neighbours.cornerRT) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersTop';
                            } else if (neighbours.cornerLT) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerLeftTop';
                            } else if (neighbours.cornerRT) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerRightTop';
                            }
                        }
                    } else {
                        if (neighbours.bottom) {
                            // kein oberer Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'threeNoneTop';
                            if (neighbours.cornerLB && neighbours.cornerRB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersBottom';
                            } else if (neighbours.cornerLB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerLeftBottom';
                            } else if (neighbours.cornerRB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerRightBottom';
                            }
                        } else {
                            // linker und rechter Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'twoLeftRight';
                        }
                    }
                } else {
                    if (neighbours.top) {
                        if (neighbours.bottom) {
                            // kein rechter Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'threeNoneRight';
                            if (neighbours.cornerLT && neighbours.cornerLB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersLeft';
                            } else if (neighbours.cornerLT) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerLeftTop';
                            } else if (neighbours.cornerLB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerLeftBottom';
                            }
                        } else {
                            // linker und oberer Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'twoLeftTop';
                            if (neighbours.cornerLT) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerLeftTop';
                            }
                        }
                    } else {
                        if (neighbours.bottom) {
                            // linker und unterer Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'twoLeftBottom';
                            if (neighbours.cornerLB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerLeftBottom';
                            }
                        } else {
                            // linker Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'oneLeft';
                        }
                    }
                }
            } else {
                if (neighbours.right) {
                    if (neighbours.top) {
                        if (neighbours.bottom) {
                            // kein linker Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'threeNoneLeft';
                            if (neighbours.cornerRT && neighbours.cornerRB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornersRight';
                            } else if (neighbours.cornerRT) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerRightTop';
                            } else if (neighbours.cornerRB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerRightBottom';
                            }
                        } else {
                            // rechter und oberer Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'twoRightTop';
                            if (neighbours.cornerRT) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerRightTop';
                            }
                        }
                    } else {
                        if (neighbours.bottom) {
                            // rechter und unterer Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'twoRightBottom';
                            if (neighbours.cornerRB) {
                                this.rows[x].columns[y].borderStyleClass += ' cornerRightBottom';
                            }
                        } else {
                            // rechter Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'oneRight';
                        }
                    }
                } else {
                    if (neighbours.top) {
                        if (neighbours.bottom) {
                            // oberer und unterer Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'twoTopBottom';
                        } else {
                            // oberer Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'oneTop';
                        }
                    } else {
                        if (neighbours.bottom) {
                            // unterer Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'oneBottom';
                        } else {
                            // kein Nachbar
                            this.rows[x].columns[y].borderStyleClass = 'none';
                        }
                    }
                }
            }
        },

        checkNeighbours: function (x, y, color) {
            let l = false;
            let r = false;
            let t = false;
            let b = false;
            let cLT = false;
            let cLB = false;
            let cRT = false;
            let cRB = false;

            // 4er Nachbarchschaft prüfen
            if (y-1 >= 0 && this.rows[x].columns[y-1].color === color) {
                l = true;
            }
            if (y+1 < this.squareSize && this.rows[x].columns[y+1].color === color) {
                r = true;
            }
            if (x-1 >= 0 && this.rows[x-1].columns[y].color === color) {
                t = true;
            }
            if (x+1 < this.squareSize && this.rows[x+1].columns[y].color === color) {
                b = true;
            }

            // Ecken prüfen
            if (l && t && this.rows[x-1].columns[y-1].color != color) {
                cLT = true;
            }
            if (l && b && this.rows[x+1].columns[y-1].color != color) {
                cLB = true;
            }
            if (r && t && this.rows[x-1].columns[y+1].color != color) {
                cRT = true;
            }
            if (r && b && this.rows[x+1].columns[y+1].color != color) {
                cRB = true;
            }

            return {left: l, right: r, top: t, bottom: b, cornerLT: cLT, cornerLB: cLB, cornerRT: cRT, cornerRB: cRB};
        }
    },

    created(){
        this.initialize();
        for (let i = 0; i < this.squareSize; i++) {
            for (let j = 0; j < this.squareSize; j++) {
                this.changeBorder(i, j);
            }
        }
    }
});