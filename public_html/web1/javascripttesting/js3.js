console.log("i loaf coding")

const circles = document.querySelectorAll(".circle")

circles.forEach(function(item, index) {
    item.addEventListener("click", function() {
      console.log("circle number: " + (parseInt(index)+1))

      if(item.classList.contains("square")){
        item.classList.toggle("make-round")
      } else{
      item.classList.toggle("move-me")
      }
    })
  })
