//Globale Var
var svgNS = "http://www.w3.org/2000/svg";
var colors = ["rgb(255, 87, 34)", "rgb(156, 39, 176)", "rgb(33, 150, 243)", "rgb(255, 235, 59)", "rgb(139, 195, 74)", "cyan"]; //Spiel Farben
var solutionColors = []; // Farbe die gelöst werden soll
var currentRow = 0; //Aktuelle Zeile
var gray = "rgb(158, 158, 158)";
var white = "white";
var black = "black";
var cyan = "cyan";

//currentrow muss geändert!!!!!!!


window.onload = function () {
    createCircle();

    for (var i = 0; i < 9; i++) {
        var buttonRow = getButtonRow(0);

        var clone = buttonRow.cloneNode(true);

        document.getElementById("buttons").appendChild(clone);
    }
    var elements = document.getElementsByClassName("btn-circle");
    for (i = 0; i < elements.length; i++) {
         elements[i].style.backgroundColor = gray;
    }
    generateSet();
    clickListenerForCurrentRow(currentRow);
};

function removeSVGClickListener() {
    var buttonrow = getButtonRow(currentRow-1);//mit currentRow kann nicht so bleiben ist pfusch
    var svg = buttonrow.getElementsByTagName("svg")[0];
    svg.removeEventListener("click", logic );
    svg.removeEventListener("click", removeSVGClickListener);
}

function clickListenerForCurrentRow(currentRow) {
    var elements = document.getElementsByClassName("btn-circle");
    for (var i = currentRow * 4; i < currentRow * 4 + 4; i++) {
        elements[i].addEventListener("click", changeColor);
        elements[i].addEventListener("click", checkAllButtonsClicked);
    }
}

// Prüfen ob alle Buttons eingefärbt sind um Spielergebnis zu prüfen
function checkAllButtonsClicked() {
    var eingabeFarben = getInputColor();
    if (eingabeFarben.every( e => e !== gray)){
       colorSvgCyan()
    }
}

// Das SVG in Cyan einfärben, damit  der spieler weiß er kann das spiel auswerten
// ClickListener für SVG
function colorSvgCyan() {
    var buttonrow = getButtonRow(currentRow);
    var svg = buttonrow.getElementsByTagName("svg")[0];
    svg.addEventListener("click", logic );
    svg.addEventListener("click", removeSVGClickListener);

    for (var i = 0; i < 4; i++) {
        var svgcircle = svg.getElementById("mycircle" + i);
        svgcircle.setAttributeNS("", "fill", "cyan");
    }

}

function getButtonRow(pos) {
    return document.getElementsByClassName("buttonrow")[pos];
}

function getInputColor() {
    var eingabefarben = [];
    var buttonrow = getButtonRow(currentRow);
    for (var i = 0; i < 4; i++) {
        var button = buttonrow.getElementsByClassName('b' + (i + 1))[0];
        eingabefarben.push(button.style.backgroundColor);
    }
    return eingabefarben;
}

function createCircle() {
    var zahl = 0;
    for (var i = 12; i < 38; i += 25) {
        for (var j = 12; j < 38; j += 25) {

            var myCircle = document.createElementNS(svgNS, "circle"); //to create a circle. for rectangle use "rectangle"
            myCircle.setAttributeNS("", "id", "mycircle" + zahl);
            myCircle.setAttributeNS("", "cx", ""+i);
            myCircle.setAttributeNS("", "cy", ""+j);
            myCircle.setAttributeNS("", "r", "10");
            myCircle.setAttributeNS("", "fill", gray);
            myCircle.setAttributeNS("", "stroke", "none");

            document.getElementById("mySVG").appendChild(myCircle);
            zahl++;
        }
    }
}

function changeColor(e) {
    var btn = e.target;
    var color = btn.style.backgroundColor;
    btn.style.backgroundColor = colors[(colors.indexOf(color) + 1) % colors.length];
}

function generateSet() {
    for (var i = 0; i < 4; i++) {
        var r = Math.floor((Math.random() * 5));
        solutionColors.push(colors[r]);
        var btn = document.getElementById("rb" + (i + 1));
        btn.style.backgroundColor = colors[r];
    }
}

function logic() {
    var duploesung = JSON.parse(JSON.stringify(solutionColors));
    var korrektePosition = 0;
    var korrekteFarbe = 0;
    var eingabefarben =  getInputColor();

    for (var i = 0; i < 4; i++) {
        if (eingabefarben[i] === solutionColors[i]) {
            korrektePosition++;
            eingabefarben[i] = "a";
            duploesung[i] = "b";
        }
    }
    for (var i = 0; i < 4; i++) {
        var pos = duploesung.indexOf(eingabefarben[i]);
        if (pos > -1) {
            korrekteFarbe++;
            eingabefarben[i] = "a";
            duploesung[pos] = "b";
        }
    }

    if (korrektePosition === 4) {
        alert("Gewonnen");
    }

    colorSVG(korrektePosition, korrekteFarbe);
    currentRow++;
    clickListenerForCurrentRow(currentRow);
}

function colorCircle(start, end, color) {
    var buttonRow = getButtonRow(currentRow);
    for (var i = start; i < end; i++) {
        var svg = buttonRow.getElementsByTagName("svg")[0];
        var svgcircle = svg.getElementById("mycircle" + i);
        svgcircle.setAttributeNS("", "fill", color);
    }
}

function colorSVG(korrektePosition, korrekteFarbe) {
    colorCircle(0,korrekteFarbe, white);
    colorCircle(korrekteFarbe,  korrekteFarbe+korrektePosition, black);
    colorCircle(korrektePosition+korrekteFarbe, 4, gray);
}