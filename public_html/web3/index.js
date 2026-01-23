// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function openPeel(evt, peelName) {

  var i, x, tablinks;

  x = document.getElementsByClassName("peel");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" effect", ""); 
  }
  document.getElementById(peelName).style.display = "block";
  evt.currentTarget.className += " effect";
}