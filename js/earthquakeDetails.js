function showEarthquakeDetails(dot, eq)
{
    var div = document.getElementById("details");
    console.log(eq);

    div.style.visibility = "visible";

    div.innerHTML = "<div id=\"detailsHeader\" style=\"background-color: rgb(202, 250, 195);\">Earthquake details</div>";

    div.innerHTML += "<br><a> Title : "+ eq.properties.title + "</a>"
    div.innerHTML += "<br><a> Alert : "+ eq.properties.alert + "Cdi :"+ eq.properties.cdi +"</a>"
    div.innerHTML += "<br><a> Code : "+ eq.properties.code + "Dmin :"+ eq.properties.dmin +"</a>"
    div.innerHTML += "<br><a> Felt : "+ eq.properties.felt + "Gap :"+ eq.properties.gap +"</a>"
    div.innerHTML += "<br><a> Ids : "+ eq.properties.ids + "Magnitude :"+ eq.properties.mag + eq.properties.magType + "</a>"
    div.innerHTML += "<br><a> Mmi : "+ eq.properties.mmi + "Rms :"+ eq.properties.rms +"</a>"
    div.innerHTML += "<br><a> Country : "+ eq.properties.net + "Place :"+ eq.properties.place +"</a>"
    div.innerHTML += "<br><a> Sig : "+ eq.properties.sig + "Time :"+ eq.properties.time +"</a>"
    div.innerHTML += "<br><a> Url : <a href="+ eq.properties.url+">"+eq.properties.url+"</a><br><br>"


    var header = document.getElementById("detailsHeader");
    header.style.backgroundColor = '#' + dot.material.color.getHexString();

    dragElement(document.getElementById("details"));
}

// Make the DIV element draggable:
dragElement(document.getElementById("details"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "Header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}