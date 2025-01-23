console.log("boo! you found me haha")

const panel = document.getElementById("panel")

panel.onclick = function(){
    this.classList.toggle("moved")
}