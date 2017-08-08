
window.onload = function () {
createCircle();
  for (i=0; i<9; i++){
    var itm = document.getElementsByClassName("buttonrow")[0];
    // Copy the <li> element and its child nodes
    var cln = itm.cloneNode(true);
    // Append the cloned <li> element to <ul> with id="myList1"
    document.getElementById("buttons").appendChild(cln);
  }
  var elements  = document.getElementsByClassName("mdl-button");
    for (i = 0; i < elements.length; i++){
    elements[i].addEventListener("click", changeColor);
    elements[i].style.backgroundColor = "rgb(158, 158, 158)";
    }
  generateSet();

}

  var svgNS = "http://www.w3.org/2000/svg";
function createCircle()
{
  var zahl = 0;
  for (i=12; i<38; i+=25){
    for (j=12; j<38; j+=25){

      var myCircle = document.createElementNS(svgNS,"circle"); //to create a circle. for rectangle use "rectangle"
      myCircle.setAttributeNS(null,"id","mycircle" + zahl);
      myCircle.setAttributeNS(null,"cx",i);
      myCircle.setAttributeNS(null,"cy",j);
      myCircle.setAttributeNS(null,"r",10);
      myCircle.setAttributeNS(null,"fill","gray");
      myCircle.setAttributeNS(null,"stroke","none");

      document.getElementById("mySVG").appendChild(myCircle);
            zahl++;
    }
  }
}
var colors = ["rgb(158, 158, 158)", "rgb(255, 87, 34)", "rgb(233, 30, 99)", "rgb(156, 39, 176)", "rgb(33, 150, 243)", "rgb(255, 235, 59)", "rgb(139, 195, 74)"];
var set = [];

function changeColor(e) {
  var btn = e.target;
  var color = btn.style.backgroundColor;
  var i = 0;
  btn.style.backgroundColor = colors[(colors.indexOf(color) + 1) % colors.length];
}

function generateSet() {
  for (i = 0; i < 4; i++){
    var r = Math.floor((Math.random() * 6) + 0);
    set.push(colors[r]);
    var btn = document.getElementById("rb" + (i + 1));
    btn.style.backgroundColor = colors[r];
  }
}

function logic() {
  var buttonrow = document.getElementsByClassName("buttonrow");
  for (i=0; i<4; i++){
    var button = buttonrow[i].getElementsByClassName('b' + (i + 1))[i];
    if (buttons.style.backgroundColor.localeCompare(set[i])){
        alert();
    }
  }
}
