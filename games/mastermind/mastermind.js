//Globale Var
var colors = ["rgb(255, 87, 34)", "rgb(156, 39, 176)", "rgb(33, 150, 243)", "rgb(255, 235, 59)", "rgb(139, 195, 74)", "cyan"]; //Spiel Farben
let pos = [{cx:12, cy:12}, {cx:12, cy:37}, {cx:37,cy:12}, {cx:37,cy:37} ];// Position für SVG Kreise

let buttons = new Vue({
    el: '#buttons',

    data: {
        currentRow: 0,
        svgNS: "http://www.w3.org/2000/svg",
        gray: "rgb(158, 158, 158)",
        white: "white",
        black: "black",
        cyan: "cyan",
        rows: [
            // wird bei Initialisierung (created Methode) belegt
        ],
    },

    methods:{
        // 10 Zeilen und 4 Spalten mit runden Buttons anlegen mit grauer Farbe
        initialize: function () {
            let rows = [];
            for (let i = 0; i < 10; i++){
                let column = [];
                let svgCircle = [];
                for (let j = 0; j < 4; j++ ){
                    column[j] = {color: this.gray};
                    svgCircle[j] = {color: this.gray, pos: pos[j]};
                }

                rows[i] = {columns: column, svg: svgCircle, disabled: true};

            }

            this.rows = rows;
        },

        activateCurrentRow: function () {
            for (let i = 0; i<this.rows.length; i++){
                if ( i !== this.currentRow){
                    this.rows[i].disabled = true;

                }
                else {
                    this.rows[i].disabled = false;
                }
            }
        },



        // Methode zum wechseln der Farbe der Buttons
        changeColor: function (item) {
            var color = item.color;
            item.color = colors[(colors.indexOf(color) + 1) % colors.length];
            if(this.checkAllButtonsClicked()){
                this.colorSvgCyan();
            }

        },

        // Prüfen ob alle Buttons eingefärbt sind um Spielergebnis zu prüfen
        checkAllButtonsClicked: function () {
           return (this.rows[this.currentRow].columns.every(e => e.color !== this.gray));
        }
        ,

        // Das SVG in Cyan einfärben, damit  der spieler weiß er kann das spiel auswerten
        // ClickListener für SVG
        colorSvgCyan: function () {
            for (let i = 0; i < 4; i++){
                this.rows[this.currentRow].svg[i].color = this.cyan;
            }

        }
        ,
        logic: function () {
            if (!this.checkAllButtonsClicked()){
               return;
            }

            let duplicateSolution = JSON.parse(JSON.stringify(result.solutionColors));//richtige Kopie von SolutionColors
            let duplicateRow = JSON.parse(JSON.stringify(this.rows[this.currentRow]));
            let correctPosition = 0;
            let correctColor = 0;

            for (let i = 0; i < 4; i++) {
                if (duplicateRow.columns[i].color === duplicateSolution[i]) {
                    correctPosition++;
                    duplicateRow.columns[i].color = "a";
                    duplicateSolution[i] = "b";
                }
            }
            for (let i = 0; i < 4; i++) {
                let pos = duplicateSolution.indexOf(duplicateRow.columns[i].color);
                if (pos > -1) {
                    correctColor++;
                    duplicateRow.columns[i].color = "a";
                    duplicateSolution[pos] = "b";
                }
            }

            if (correctPosition === 4) {
                result.solved = true;
                this.rows[this.currentRow].disabled = true;
                alert("Gewonnen");

            }else if (this.currentRow === 9){
                this.rows[this.currentRow].disabled = true;
                result.solved = true;
                alert("Verloren");
            }

            this.colorSVG(correctPosition, correctColor);
            this.currentRow++;
            this.activateCurrentRow();

        }
        ,
        colorSVG: function (correctPosition, correctColor) {
            this.colorCircle(0, correctColor, this.white);
            this.colorCircle(correctColor, correctColor + correctPosition, this.black);
            this.colorCircle(correctPosition + correctColor, 4, this.gray);
        }
        ,
        colorCircle: function (start, end, color) {
           for (let i = start; i < end; i++) {
                this.rows[this.currentRow].svg[i].color = color;
           }
        }

    },





    created() {
        this.initialize();
        this.activateCurrentRow();
    }


});



let result = new Vue({
    el: '#result',

    data: {
        solutionColors: [],
        solved: false,
        row: [
            // wird bei Initialisierung (created Methode) belegt
        ],
    },

    methods: {
        initialize: function () {
            let tempC = [];
            for (let i = 0; i < 4; i++) {
                let r = Math.floor((Math.random() * 6));
                this.solutionColors.push(colors[r]);
                tempC[i] = {color: colors[r]};
            }
            this.row = {columns: tempC};
        }

    },

    created() {
        this.initialize();

    }
});
