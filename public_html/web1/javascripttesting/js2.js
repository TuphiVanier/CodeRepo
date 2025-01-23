console.log("JS IS LOADED !!")

const myParallelogram = document.getElementById("parallelogram")

myParallelogram.addEventListener("click", () => {
    //myParallelogram.style.background = "blue"
    myParallelogram.classList.toggle("change")
})