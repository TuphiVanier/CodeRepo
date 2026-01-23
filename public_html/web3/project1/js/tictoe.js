let cases = document.querySelectorAll(".case")
let message = document.querySelector("#message")
let replay = document.getElementById("replay")

let joueurX = true

const patrons = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
].map(p => ({ cells: p, blocked: false }));

document.body.classList.add("player-x");

function getImageURL(bg) {
  return bg.slice(-7, -2);
}

for (let boite of cases) {
    boite.active = true;
  boite.addEventListener("click", function () {
      
        //random code
        var ximg = ["images/1x.png", "images/2x.png", "images/3x.png", "images/4x.png", "images/5x.png"]
        var randomImgX = ximg[Math.floor(Math.random() * ximg.length)];
    
        var oimg = ["images/1o.png", "images/2o.png", "images/3o.png", "images/4o.png", "images/5o.png"]
        var randomImgO = oimg[Math.floor(Math.random() * oimg.length)];
    
        if (boite.active) {
            if (joueurX) {
              boite.style.backgroundImage = `url('${randomImgX}')`;
              joueurX = false;
            }
            else {
              boite.style.backgroundImage = `url('${randomImgO}')`;
              joueurX = true;
          }
            boite.style.backgroundSize = "cover"
            boite.active = false;
            document.body.classList.toggle("player-x");
            document.body.classList.toggle("player-o");
        }
        valide();
    })
}

const valide = function () {
  let victoire = false;
  let isTie = Array.from(cases).every(boite => !boite.active);
      if (isTie && !victoire) {
          showOverlayMessage("C'est une partie nulle!");
      }
  for (let pattern of patrons) {
      const [a, b, c] = pattern.cells;
      const val1 = getImageURL(cases[a].style.backgroundImage);
      const val2 = getImageURL(cases[b].style.backgroundImage);
      const val3 = getImageURL(cases[c].style.backgroundImage);
      if (val1 && val1 === val2 && val1 === val3) {
          victoire = true;
  
          let winner = "";
          if (val1.includes("x.png")) {
              winner = "x";
              showOverlayMessage("Zenith a gagne!");
          } else {
              winner = "o";
              showOverlayMessage("Kai a gagne!");
          }
  
          for (let boite of cases) {
              boite.active = false;
          }
          return;
      }
      
      if (pattern.blocked) continue;
      const vals = [
        getImageURL(cases[a].style.backgroundImage),
        getImageURL(cases[b].style.backgroundImage),
        getImageURL(cases[c].style.backgroundImage)
      ];
      if (vals.includes("")) continue;
  
      const images = {};
      vals.forEach(val => {
        images[val] = (images[val] || 0) + 1;
      });
  
      const keys = Object.keys(images);
      if (keys.length !== 2) continue;
  
      const [img1, img2] = keys;
      const count1 = images[img1];
      const count2 = images[img2];
  
      if (!((count1 === 2 && count2 === 1) || (count1 === 1 && count2 === 2))) {
        continue;
      }
  
      const lastImage = joueurX
        ? "o.png"
        : "x.png";
  
      const blockerImage = count1 === 1 ? img1 : img2;
      if (!blockerImage.includes(lastImage)) {
        continue;
      }
  
      pattern.blocked = true;
  
      const blockingPlayer = lastImage.includes("x") ? "x" : "o";
  
      showBlockCutin(blockingPlayer);
        }
  }

function showBlockCutin(player) {
  const cutinL = document.getElementById("cutinL");
  const cutinR = document.getElementById("cutinR");

  cutinL.classList.remove("show", "left");
  cutinR.classList.remove("show", "right");

  if (player === "x") {
    cutinL.classList.add("left");
    requestAnimationFrame(() => {
      cutinL.classList.add("show");
    });
  
    setTimeout(() => {
      cutinL.classList.remove("show", "left");
    }, 1500);
  } else if (player === "o") {
    cutinR.classList.add("right");
    requestAnimationFrame(() => {
      cutinR.classList.add("show");
    });
  
    setTimeout(() => {
      cutinR.classList.remove("show", "right");
    }, 1500);
  }
}

replay.addEventListener("click", function () {
    for (let boite of cases) {
        boite.active = true;
        boite.style.backgroundImage = "";
    }
    joueurX = true;
    overlayText.textContent = "";
    message.style.backgroundImage = "";

    // Reset player UI
    document.body.classList.remove("player-o");
    document.body.classList.add("player-x");

    // Reset cutins
    document.getElementById("cutinL").classList.remove("show", "left");
    document.getElementById("cutinR").classList.remove("show", "right");

    // Reset block tracking
    for (let pattern of patrons) {
        pattern.blocked = false;
    }

    hideOverlayMessage();
});

const overlay = document.getElementById("message");
const overlayText = document.getElementById("overlayText");
const closeOverlayBtn = document.getElementById("closeOverlay");

// Function to show the overlay with a message
function showOverlayMessage(text) {
  overlayText.textContent = text;
  overlay.classList.remove("hidden");
}

// Function to hide the overlay
function hideOverlayMessage() {
  overlay.classList.add("hidden");
}

// Call this when someone wins or tie detected:
function replayGame() {
  for (let boite of cases) {
    boite.active = true;
    boite.style.backgroundImage = "";
  }
  joueurX = true;
  overlayText.textContent = "";
  message.style.backgroundImage = "";

  document.body.classList.remove("player-o");
  document.body.classList.add("player-x");
  document.getElementById("cutinL").classList.remove("show", "left");
  document.getElementById("cutinR").classList.remove("show", "right");
  
  // Hide overlay just in case
  hideOverlayMessage();
}
