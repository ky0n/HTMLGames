//Globale Var
var svgNS = "http://www.w3.org/2000/svg";
var colors = ["rgb(255, 87, 34)", "rgb(156, 39, 176)", "rgb(33, 150, 243)", "rgb(255, 235, 59)", "rgb(139, 195, 74)", "cyan"]; //Spiel Farben
var solutionColors = []; // Farbe die gelöst werden soll
var currentRow = 0; //Aktuelle Zeile
var gray = "rgb(158, 158, 158)";
var white = "white";
var black = "black";
var cyan = "cyan";


let buttons = new Vue({
        el: '#buttons',

        data: {
            colors: ["rgb(255, 87, 34)", "rgb(156, 39, 176)", "rgb(33, 150, 243)", "rgb(255, 235, 59)", "rgb(139, 195, 74)", "cyan"],
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

        methods: {
            initialize: function () {
                let tempRows = [];
                for (let i = 0; i < 9; i++) {
                    let tempC = [];
                    for (let j = 0; j < 4; j++) {
                        tempC[j] = {color: gray};
                    }
                    tempRows[i] = {columns: tempC};
                }
                this.firstColor = tempRows[0].columns[0].color;
                this.rows = tempRows;
            }
            ,

            removeSVGClickListener: function () {
                var buttonrow = getButtonRow(currentRow - 1);//mit currentRow kann nicht so bleiben ist pfusch
                var svg = buttonrow.getElementsByTagName("svg")[0];
                svg.removeEventListener("click", logic);
                svg.removeEventListener("click", this.removeSVGClickListener);
            }
            ,

            clickListenerForCurrentRow: function (currentRow) {
                var elements = document.getElementsByClassName("btn-circle");
                for (var i = currentRow * 4; i < currentRow * 4 + 4; i++) {
                    elements[i].addEventListener("click", this.changeColor);
                    elements[i].addEventListener("click", this.checkAllButtonsClicked);
                }
            }
            ,


            changeColor: function (item) {
                var color = item.color;
                item.color = this.colors[(this.colors.indexOf(color) + 1) % this.colors.length];
            }
            ,

            getInputColor: function () {
                var inputColor = [];
                var buttonrow = getButtonRow(currentRow);
                for (var i = 0; i < 4; i++) {
                    var button = buttonrow.getElementsByClassName('b' + (i + 1))[0];
                    inputColor.push(button.style.backgroundColor);
                }
                return inputColor;
            }
            ,

            // Prüfen ob alle Buttons eingefärbt sind um Spielergebnis zu prüfen
            checkAllButtonsClicked: function () {
                var inputColor = this.getInputColor();
                if (inputColor.every(e => e !== gray)) {
                    this.colorSvgCyan()
                }
            }
            ,


            // Das SVG in Cyan einfärben, damit  der spieler weiß er kann das spiel auswerten
            // ClickListener für SVG
            colorSvgCyan: function () {
                var buttonrow = getButtonRow(currentRow);
                var svg = buttonrow.getElementsByTagName("svg")[0];
                svg.addEventListener("click", logic);
                svg.addEventListener("click", this.removeSVGClickListener);

                for (var i = 0; i < 4; i++) {
                    var svgcircle = svg.getElementById("mycircle" + i);
                    svgcircle.setAttributeNS("", "fill", "cyan");
                }

            }
            ,


            createCircle: function () {
                var number = 0;
                for (var i = 12; i < 38; i += 25) {
                    for (var j = 12; j < 38; j += 25) {

                        var myCircle = document.createElementNS(svgNS, "circle"); //to create a circle. for rectangle use "rectangle"
                        myCircle.setAttributeNS("", "id", "mycircle" + number);
                        myCircle.setAttributeNS("", "cx", "" + i);
                        myCircle.setAttributeNS("", "cy", "" + j);
                        myCircle.setAttributeNS("", "r", "10");
                        myCircle.setAttributeNS("", "fill", gray);
                        myCircle.setAttributeNS("", "stroke", "none");

                        document.getElementById("mySVG").appendChild(myCircle);
                        number++;
                    }
                }
            }
            ,

            logic: function () {
                var duplicateSolution = JSON.parse(JSON.stringify(solutionColors));
                var correctPosition = 0;
                var correctColor = 0;
                var inputColor = getInputColor();

                for (var i = 0; i < 4; i++) {
                    if (inputColor[i] === solutionColors[i]) {
                        correctPosition++;
                        inputColor[i] = "a";
                        duplicateSolution[i] = "b";
                    }
                }
                for (var i = 0; i < 4; i++) {
                    var pos = duplicateSolution.indexOf(inputColor[i]);
                    if (pos > -1) {
                        correctColor++;
                        inputColor[i] = "a";
                        duplicateSolution[pos] = "b";
                    }
                }

                if (correctPosition === 4) {
                    alert("Gewonnen");
                }

                this.colorSVG(correctPosition, correctColor);
                currentRow++;
                this.clickListenerForCurrentRow(currentRow);
            }
            ,

            colorCircle: function (start, end, color) {
                var buttonRow = this.getButtonRow(currentRow);
                for (var i = start; i < end; i++) {
                    var svg = buttonRow.getElementsByTagName("svg")[0];
                    var svgcircle = svg.getElementById("mycircle" + i);
                    svgcircle.setAttributeNS("", "fill", color);
                }
            }
            ,

            colorSVG: function (correctPosition, correctColor) {
                this.colorCircle(0, correctColor, white);
                this.colorCircle(correctColor, correctColor + correctPosition, black);
                this.colorCircle(correctPosition + correctColor, 4, gray);
            }
            ,

            getButtonRow: function (pos) {
                return document.getElementsByClassName("buttonrow")[pos];
            }


        }
        ,


        created() {
            this.initialize();
            this.createCircle();
            this.checkAllButtonsClicked();

        }
    })
;

new Vue({
    el: '#result',

    data: {
        solutionColors: [],
        row: [
            // wird bei Initialisierung (created Methode) belegt
        ],
    },

    methods: {
        initialize: function () {
            let tempC = [];
            for (let i = 0; i < 4; i++) {
                let r = Math.floor((Math.random() * 5));
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

