// Créer le canevas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.querySelector("#gameBox").appendChild(canvas);

//Charger les sprites
// Image d'arrière-plan
var bgReady = false;
var bgImage = new Image();
bgImage.src = "images/background.png";
bgImage.onload = function () {
    bgReady = true; 
};

// Estampe gagnant
var winReady = false;
var winImage = new Image(); 
winImage.src = "images/win.png"; 
winImage.onload = function () {
    winReady = true; 
};

// Image du joueur
var playerReady = false;
var playerImage = new Image(); 
playerImage.src = "images/player.png"; 
playerImage.onload = function () {
    playerReady = true; 
};

// Image des goodies
var goodyReady = false;
var goodyImage = new Image(); 
goodyImage.src = "images/goody.png"; 
goodyImage.onload = function () {
    goodyReady = true; 
};

// Image des baddies
var baddyReady = false;
var baddyImage = new Image(); 
baddyImage.src = "images/baddy.png"; 
baddyImage.onload = function () {
    baddyReady = true; 
};

// Créer des objets de jeu globaux 
var player = {
    speed : 6, // mouvement en pixels par tick 
    width: 32,
    height: 32
};

var goodies = [ // ceci est un tableau (array)
    { width: 32, height: 32 } // un goody
];

var baddies = [ // ceci est un tableau (array)
    //{ width: 32, height: 32 } // un goody
];

var checkWin;

var pts = 0;

// Variables de vitesse
var vX = 0;
var vY = 0;

// baddies speed
var bs = 1;

// baddies spawn
var bspawn = 0.985;

// Gérer les commandes du clavier
addEventListener("keydown", function (e) {
    //Touches
    if ((e.keyCode == 38) || (e.keyCode == 87)) { // HAUT
        vX = 0;
        vY = -player.speed;
    }
    if ((e.keyCode == 40) || (e.keyCode == 83)) { // BAS
        vX = 0;
        vY = player.speed;
    }
    if ((e.keyCode == 37) || (e.keyCode == 65)) { // GAUCHE
        vX = -player.speed;
        vY = 0;
    }
    if ((e.keyCode == 39) || (e.keyCode == 68)) { // DROITE
        vX = player.speed;
        vY = 0;
    }
}, false);

addEventListener("keyup", function () {
    vX = 0;
    vY = 0;
});

// Gérer les commandes tactiles
addEventListener("touchstart", function (e) {
    if (e.target.id == "uArrow") { // HAUT
        vX = 0;
        vY = -player.speed;
    }
    else if (e.target.id == "dArrow") { // BAS
        vX = 0;
        vY = player.speed;
    }
    else if (e.target.id == "lArrow") { // GAUCHE
        vX = -player.speed;
        vY = 0;
    }
    else if (e.target.id == "rArrow") { //DROIT
        vX = player.speed;
        vY = 0;
    }
});

addEventListener("touchend", function () {
    vX = 0;
    vY = 0;
})

//Définir l'état initial
var init = function () {
    //Mettre le joueur au centre
    player.x = (canvas.width - player.width) / 2; 
    player.y = (canvas.height - player.height) / 2;

    //Placez des goodies à des endroits aléatoires 
    for (var i in goodies) {
        goodies[i].x = (Math.random() * (canvas.width - goodies[i].width));
        goodies[i].y = (Math.random() * (canvas.height - goodies[i].height));
    }

        //Placez des baddies à des endroits aléatoires 
    for (var i in baddies) {
        baddies[i].x = (Math.random() * (canvas.width - baddies[i].width));
        baddies[i].y = (Math.random() * (canvas.height - baddies[i].height));
        let a = (Math.floor(Math.random() * 6) * 32) + 32;
        baddies[i].width = a;
       // console.log(a);
    }

    pts = 0;
    checkWin = false;
};

// La boucle de jeu principale
var main = function () {
    if (checkWin) {
        //GAGNANT Afficher le cadre
        if (winReady) {
            ctx.drawImage(winImage, (canvas.width - winImage.width)/2, 
                (canvas.height - winImage.height)/2);
        }
    } 
    else {
        //Pas encore gagné, jouer le jeu
        //déplacer le joueur
        if (player.x > 0 && player.x < canvas.width - player.width) {
            player.x += vX;
           //  console.log("x" + player.x);
        }
        else {
            player.x -= vX;
            vX = -vX; //bounce
        }
        if (player.y > 0 && player.y < canvas.height - player.height) {
            player.y += vY
           // console.log("y" + player.y);
        }
        else {
            player.y -= vY;
            vY = -vY; //bounce
        }

        if (Math.random() > bspawn) {
            spawnBad(); //the function that generates a new goodie
		}
        
        //vérifier les collisions
        for (var i in goodies) {
            if (checkCollision(player,goodies[i])) {
                goodies.splice(i, 1);
                spawnGoody();
                pts++;
                bs+=0.3;
                console.log(bs);
                console.log(bspawn);
                bspawn -= 0.02;
            }
        }
        console.log(pts);
        
        //vérifier les collisions
        for (var i in baddies) {
         //   console.log(baddies[i].dir);
            
            baddies[i].y += baddies[i].dir * bs;

            if (checkCollision(player, baddies[i])) {
                checkWin = true;
                //console.log(baddies[i].width + " " + player.x);
            }

            if (baddies[i].y > canvas.height || baddies[i].y < 0) {
                baddies.splice(i, 1);
            }
        }

        render();
        window.requestAnimationFrame(main); 
    }
};

// Dessinez le tout
var render = function () {
    if (bgReady) {
        ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    if (playerReady) {
        ctx.drawImage(playerImage, player.x, player.y);
    }
    if (goodyReady) {
        for (var i in goodies) {
            ctx.drawImage(goodyImage, goodies[i].x, goodies[i].y);
        }
    }
    if (baddyReady) {
    for (var i in baddies) {
        //ctx.drawImage(baddyImage, baddies[i].x, baddies[i].y);

        //ctx.translate(baddies[i].x, baddies[i].y);

        ctx.fillStyle = ctx.createPattern(baddyImage, 'repeat');
        ctx.save();
        ctx.translate(baddies[i].x, baddies[i].y);
        ctx.fillRect(0, 0, baddies[i].width, baddies[i].height);
        ctx.restore();

        //ctx.translate(baddies[i].x, baddies[i].y);

    }
    }
    //Label
    ctx.font = "23pt Monda";
    ctx.fillStyle = "rgba(234, 234, 234, 1)";
    ctx.fillText("Crystaux collectés: " + pts, 32, 64);
};

//Fonction générique pour vérifier les collisions 
var checkCollision = function (obj1,obj2) {
    if (obj1.x < (obj2.x + obj2.width) && 
        (obj1.x + obj1.width) > obj2.x && 
        obj1.y < (obj2.y + obj2.height) && 
        (obj1.y + obj1.height) > obj2.y
        ) {
            return true;
    }
};

var checkLevel = function () {
    if (goodies.length > 0) {
        return false;
    } else {
        return true;
    }
};

var spawnGoody = function () {
	var spawn = goodies.push({ width: 32, height: 32 }) - 1;
	positionSprite(goodies[spawn]);	 
}

function positionSprite(sprt) {
	
	var rX = canvas.width*0.05 + (Math.random() * (canvas.width - sprt.width*2 - canvas.width*0.05 ));
	var rY = canvas.height*0.05 + (Math.random() * (canvas.height - sprt.height*2 - canvas.height*0.1));

	while (rX > canvas.width/2 && rX < canvas.width/2 ) {
		if (rY > canvas.height - 200) {
			rX = (Math.random() * (canvas.width - sprt.width ));
			rY = (Math.random() * (canvas.height - sprt.height ));
		}
		else {
			break;
		}
	}
	sprt.x = rX;
	sprt.y = rY;
}

var spawnBad = function () {
    let d = bs; let y;
    if (Math.random() > 0.5) {
        //d = 1;
        y = -0;
    }
    else {
        d = -d;
        y = canvas.height - 32;
    }
    baddies.push({
        width: (Math.floor(Math.random() * 6) * 32) + 32,
        height: 32,
        
        x: (Math.random() * (canvas.width - 32)),
        y: y, 
        dir: d
    })
}

init();

//Démarrer le jeu
window.requestAnimationFrame(main);