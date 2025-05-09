

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
document.getElementById("headOpen").click();

function openTab(evt, tabName) {
    // Declare all variables
    var i, bigsection, tablinks;

    // Get all elements with class="bigsection" and hide them
    bigsection = document.getElementsByClassName("bigsection");
    for (i = 0; i < bigsection.length; i++) {
      bigsection[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


function openHead(evt, tabName) {
  // Declare all variables
  var i, headsection, headlinks;

  // Get all elements with class="headsection" and hide them
  headsection = document.getElementsByClassName("headsection");
  for (i = 0; i < headsection.length; i++) {
    headsection[i].style.display = "none";
  }

  // Get all elements with class="headlinks" and remove the class "active"
  headlinks = document.getElementsByClassName("headlinks");
  for (i = 0; i < headlinks.length; i++) {
    headlinks[i].className = headlinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// var colors = document.getElementsByClassName("color")

// function colorZen(){
//   console.log("buttonclicked");
  
//   colors = document.getElementsByClassName("color");
//   for (i = 1; i <= colors.length; i++) {
//     colors[i].className = colors[i].className.remove(" color");
//     colors[i].className = colors[i].className.add(" zencolor");
//   }
// }

