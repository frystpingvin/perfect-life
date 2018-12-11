
var context;
var timer;
var enter = [];
var start;
var gameState;
var gameInitialize;
var gameOverMenu;
var speedMonster = 0.6;

var hero = {
    top: 550,
    left: 600
};

var missiles =  [];
var enemies = [
    { left: 550, top: 50 },
    { left: 450, top: 55 },
    { left: 520, top: 63 },
    { left: 503, top: 68 },
    { left: 700, top: 72 },
    { left: 610, top: 72 },
    { left: 688, top: 84 },
    { left: 315, top: 84 },
    { left: 650, top: 91 },
    { left: 520, top: 122 },
    { left: 750, top: 105 },
    { left: 700, top: 110 },
    { left: 810, top: 125 },
    { left: 788, top: 112 },
    { left: 800, top: 105 },
    { left: 300, top: 180 },
    { left: 400, top: 178 },
    { left: 500, top: 175 },
    { left: 600, top: 170 },
    { left: 666, top: 165 },
    { left: 835, top: 175 },
    { left: 610, top: 180 },
    { left: 225, top: 201 },
    { left: 400, top: 263 },
    { left: 430, top: 280 },
    { left: 515, top: 244 },
    { left: 650, top: 255 },
    { left: 730, top: 257 },
    { left: 830, top: 266 },
    { left: 620, top: 270 },
    { left: 932, top: 248 },

];
var gameOverMenu;
//var restartButton;
var showGame;

var el = document.getElementById('enemy');


function play() {
  el.style.animationPlayState = 'running';
}

//document.getElementById("myP").style.cursor = "pointer";


function gameInitialize() {

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
     
    gameOverMenu = document.getElementById("gameOver");
    centerMenuPosition(gameOverMenu);

    // restartButton = document.getElementById("restartbutton");
    // restartButton.addEventListener("click", gameRestart);

    setState("PLAY");
   
}

// //function gameRestart() {
//     //gameInitialize();
//     setState("PLAY");
    
//     hideMenu(gameOverMenu);
// console.log("restart!");
// }




document.onkeydown = function (e) {
    console.log(e.KeyCode);


    if (e.keyCode === 37) {
        if (hero.left > 10) {
            hero.left = hero.left - 20;
        }
        movehero();
    }
    if (e.keyCode === 39) {
        if (hero.left < 1150) {
            hero.left = hero.left + 20; //10 = speed
            movehero();
        }

    }
    if (e.keyCode === 32) {
        missiles.push({
            left: hero.left + 15,
            top: hero.top - 10
            
        })
        drawMissiles();
    }
    if (e.keyCode === 13) {
        if (enter.push) {

        }
        gameLoop();
    }
    
}
window.onkeydown = function(e) { 
    return !(e.keyCode == 32, 37, 39);
    
};



function closeStart() {
    document.getElementById('start').style.display = "none";
    

}

function movehero() {
    document.getElementById('hero').style.left = hero.left + "px";
}

function drawMissiles() {

    document.getElementById('missiles').innerHTML = "";
    for (var missile = 0; missile < missiles.length; missile = missile + 1) {
        document.getElementById('missiles').innerHTML += `<div class='missile' style='left:${missiles[missile].left}px; top:${missiles[missile].top}px;'></div>`;
    }
}

function moveMissiles() {
    for (var missile = 0; missile < missiles.length; missile = missile + 1) {
        missiles[missile].top = missiles[missile].top - 5;
    }
}

function drawEnemies() {
    document.getElementById('enemies').innerHTML = "";
    for (var enemy = 0; enemy < enemies.length; enemy = enemy + 1) {
        document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemies[enemy].left}px; top:${enemies[enemy].top}px;'></div>`;
    }
}

function moveEnemies() {
    for (var enemy = 0; enemy < enemies.length; enemy = enemy + 1) {
        // if (enemies[enemy].top < 600) {
        //     enemies[enemy].top = enemies[enemy].top + 1;
        // }
        enemies[enemy].top = enemies[enemy].top + speedMonster;
        if (enemies[enemy].top > 550) {
            console.log("GAME OVER!!!!");
            setState("GAME OVER");
            clearTimeout(timer);
            enemies[enemy].top = 0;
        }
        
    }
}

function collisionDetection() {

    for (var enemy = 0; enemy < enemies.length; enemy = enemy + 1) {
        for (var missile = 0; missile < missiles.length; missile = missile + 1) {
            if (
                (missiles[missile].top <= enemies[enemy].top + 50) &&
                (missiles[missile].top >= enemies[enemy].top) &&
                (missiles[missile].left >= enemies[enemy].left) &&
                (missiles[missile].left <= enemies[enemy].left + 50)
            ) {
                enemies.splice(enemy, 1);
                missiles.splice(missile, 1);
                
            }
        }
    }
}

function setState(state) {
    gameState = state;
    showMenu();
}

function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function hideMenu(menu) {
    menu.style.visibility = "hidden";
}

function showMenu() {
    if (gameState == "GAME OVER")
        displayMenu(gameOverMenu);
}

function centerMenuPosition(menu) {
     menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
     menu.style.left = (screenWidth / 2) - (menu.offsetWidth / 2) + "px";
}

function hideEnemies(){
    if (gameState == "GAME OVER")
    document.getElementById('enemies').style.display = "none"
}

function hideHero(){
    if (gameState == "GAME OVER")
    document.getElementById('hero').style.display = "none"
}


document.getElementById('restartbutton').addEventListener('click', function(e) {
    e.preventDefault();

    window.location.reload();
  });
   





function gameLoop() {
    gameInitialize();
    timer = setTimeout(gameLoop, 20)
    closeStart();
    moveMissiles();
    drawMissiles();
    moveEnemies();
    drawEnemies();
    collisionDetection();
    hideEnemies();
    hideHero();
}




//document.getElementById('startbutton').addEventListener("click", function( e ) {
  // {
//gameLoop();}
// }, false);

//document.addEventListener();









