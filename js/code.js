//Globale Var
var svgNS = "http://www.w3.org/2000/svg";
var colors = ["rgb(255, 87, 34)", "rgb(233, 30, 99)", "rgb(156, 39, 176)", "rgb(33, 150, 243)", "rgb(255, 235, 59)", "rgb(139, 195, 74)"]; //Spiel Farben
var solutionColors = []; // Farbe die gelöst werden soll
var currentRow = 0; //Aktuelle Zeile

window.onload = function () {
    createCircle();

    for (i = 0; i < 9; i++) {
        var itm = document.getElementsByClassName("buttonrow")[0];
        // Copy the <li> element and its child nodes
        var cln = itm.cloneNode(true);
        // Append the cloned <li> element to <ul> with id="myList1"
        document.getElementById("buttons").appendChild(cln);
    }
    var elements = document.getElementsByClassName("mdl-button");
    for (i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "rgb(158, 158, 158)";
    }
    generateSet();
    clickListenerForCurrentRow(currentRow)
}

function clickListenerForCurrentRow(currentRow) {
    var elements = document.getElementsByClassName("mdl-button");
    for (i = currentRow * 4; i < currentRow * 4 + 4; i++) {
        elements[i].addEventListener("click", changeColor);

    }

}


function createCircle() {
    var zahl = 0;
    for (i = 12; i < 38; i += 25) {
        for (j = 12; j < 38; j += 25) {

            var myCircle = document.createElementNS(svgNS, "circle"); //to create a circle. for rectangle use "rectangle"
            myCircle.setAttributeNS(null, "id", "mycircle" + zahl);
            myCircle.setAttributeNS(null, "cx", i);
            myCircle.setAttributeNS(null, "cy", j);
            myCircle.setAttributeNS(null, "r", 10);
            myCircle.setAttributeNS(null, "fill", "gray");
            myCircle.setAttributeNS(null, "stroke", "none");

            document.getElementById("mySVG").appendChild(myCircle);
            zahl++;
        }
    }
}


function changeColor(e) {
    var btn = e.target;
    var color = btn.style.backgroundColor;
    var i = 0;
    btn.style.backgroundColor = colors[(colors.indexOf(color) + 1) % colors.length];
}

function generateSet() {
    // for (i = 0; i < 4; i++) {
    //     var r = Math.floor((Math.random() * 6) + 0);
    //     solutionColors.push(colors[r]);
    //     var btn = document.getElementById("rb" + (i + 1));
    //     btn.style.backgroundColor = colors[r];
    // }
    for (i = 0; i < 2; i++) {
        var r = Math.floor(2);
        solutionColors.push(colors[r]);
        var btn = document.getElementById("rb" + (i + 1));
        btn.style.backgroundColor = colors[r];
    }
    for (i = 2; i < 4; i++) {
        var r = Math.floor(1);
        solutionColors.push(colors[r]);
        var btn = document.getElementById("rb" + (i + 1));
        btn.style.backgroundColor = colors[r];
    }
}

function logic() {
    var duploesung = JSON.parse(JSON.stringify(solutionColors));

    var korrektePosition = 0;
    var korrekteFarbe = 0;
    var buttonrow = document.getElementsByClassName("buttonrow")[currentRow];

    var eingabefarben = [];
    for (var i = 0; i < 4; i++) {
        var button = buttonrow.getElementsByClassName('b' + (i + 1))[0];
        eingabefarben.push(button.style.backgroundColor);
    }

    for (var i = 0; i < 4; i++) {
        if (eingabefarben[i] === solutionColors[i]) {
            korrektePosition++;
            eingabefarben[i] = "a";
            duploesung[i] = "";
        }
    }
    for (var i = 0; i < 4; i++) {
        var pos = duploesung.indexOf(eingabefarben[i]);
        if (pos > -1) {
            korrekteFarbe++;
            eingabefarben[i] = "a";
            duploesung[i] = "";
        }
    }

    if (korrektePosition === 4) {
        alert("Gewonnen");
    }
    currentRow++;
    clickListenerForCurrentRow(currentRow);
    //alert("pos: " + korrektePosition + " farb: " + korrekteFarbe);
    colorSVG(buttonrow, korrektePosition, korrekteFarbe);
}

function colorSVG(buttonrow, korrektePosition, korrekteFarbe) {
    for (var i = 0; i < korrekteFarbe; i++) {
        var svg = buttonrow.getElementsByTagName("svg")[0];
        var svgcircle = svg.getElementById("mycircle" + i);
        svgcircle.setAttributeNS(null, "fill", "white");

    }
    for (i = korrekteFarbe; i < korrekteFarbe + korrektePosition; i++) {
        var svg = buttonrow.getElementsByTagName("svg")[0];
        var svgcircle = svg.getElementById("mycircle" + i);
        svgcircle.setAttributeNS(null, "fill", "black");
    }

}
