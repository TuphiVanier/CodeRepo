console.log("the birb has arrived")

const alize = document.getElementById("alize")
const buttonRight = document.getElementById("right")
const buttonLeft = document.getElementById("left")
const buttonReset = document.getElementById("reset")
const buttonJump = document.getElementById("jump")
const stage = document.querySelector("main")

// function() can be replaced by () =>
alize.onclick = function(){
    alize.classList.toggle("wiggle")
}

stage.addEventListener("click", function(event){
    console.log(event.clientX + ", " + event.clientY)

// V or use >    var coords = "translateX("+event.clientX+"px) translateY("+event.clientY+"px)"
    var coords = `translateX(${event.clientX-150}px) translateY(${event.clientY-600}px)`
    alize.style.transform = coords
})

document.onkeydown = checkKeys

function checkKeys(e){

    var style = window.getComputedStyle(alize)
    var matrix = new WebKitCSSMatrix(style.transform)
    var xVal = matrix.m41
    var yVal = matrix.m42
    var coords

    if(e.keyCode == "37" || e.keyCode == "65"){
        console.log("left key pressed")
        coords = `translateX(${xVal-100}px) translateY(${yVal}px)`
        alize.style.transform = coords
    }

    if(e.keyCode == "39" || e.keyCode == "68"){
        console.log("right key pressed")
        coords = `translateX(${xVal+100}px) translateY(${yVal}px)`
        alize.style.transform = coords
    }

    if(e.keyCode == "38" || e.keyCode == "32" || e.keyCode == "87"){
        console.log("jump key pressed")
        alize.classList.add("jump")
        setTimeout(function(){
            alize.classList.remove("jump")
        }, 500)
    }

    if(e.keyCode == "40" || e.keyCode == "83"){
        console.log("crouch key pressed")
        alize.classList.add("crouch")
        setTimeout(function(){
            alize.classList.remove("crouch")
        }, 500)
    }
}

let alizeX = 0
let alizeY = 0

function move(){
    alize.style.transform = "translateX(" + alizeX + "px) translateY(" + alizeY + "px)"
}

function moveRight(){
    alizeX += 100
    move()
}

function moveLeft(){
    alizeX -= 100
    move()
}

function moveReset(){
    alizeX = 0
    alizeY = 0
    move()
}

buttonLeft.onclick = function(){
    console.log("left button pressed")
    moveLeft()
}

buttonRight.onclick = function(){
    console.log("right button pressed")
    moveRight()
}

buttonReset.onclick = function(){
    console.log("reset button pressed")
    moveReset()
}

buttonJump.onclick = function(){
    console.log("jump button pressed")
    alize.classList.add("jump")
    setTimeout(function(){
        alize.classList.remove("jump")
    }, 500)
}

let object
// add object
function addObject(){

    object = document.createElement("img")
    object.src = "img/crystal.svg"
    stage.append(object)

    let w = stage.clientHeight
    let h = stage.clientHeight

    let randomX = Math.floor((Math.random() * w) + 1)
    let randomY = Math.floor((Math.random() * h) + 1)

    object.style.transform = `translateX(${randomX}px) translateY(${randomY}px)`

    setTimeout(function(){
        object.remove()
        addObject()
    }, 5000)
}

addObject()

/**
* Game update loop
*/

let characterCoordX;
let characterCoordY;
let objectCoordX;
let objectCoordY;

setInterval(() => {
    // console.log("update loop is running")
    characterCoordX = alize.getBoundingClientRect().x;
    characterCoordY = alize.getBoundingClientRect().y;

    //optional: move character coordinates to its center
    characterCoordX += 100; // half the width of the character
    characterCoordY += 183; // half the height of the character
    objectCoordX = object.getBoundingClientRect().x;
    objectCoordY = object.getBoundingClientRect().y;

    if((characterCoordX >= objectCoordX && characterCoordX <= objectCoordX + object.width)
&& (characterCoordY >= objectCoordY && characterCoordY <= objectCoordY + object.height)) {
        console.log("Hit!");
        objectAction();
    }
}, 50);

function objectAction() {
   
    alize.classList.add("happy");
    setTimeout(() => {
        alize.classList.remove("happy");
    }, 1000);
    object.remove();

}