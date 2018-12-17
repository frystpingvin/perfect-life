
var context;
var timer;
var enter = [];
var start;
var gameState;
var gameInitialize;
var gameOverMenu;
var speedMonster = 0.5;
var usedKeys = [
    37,
    39,
    32,
    13
];
var currentKeys = [];

var hero = {
    top: 550,
    left: 600
};

var missiles =  [];
var enemies = [
    { left: 550, top: -12 },
    { left: 450, top: -20 },
    { left: 520, top: -8 },
    { left: 503, top: -33 },
    { left: 700, top: -17 },
    { left: 610, top: -9 },
    { left: 688, top: -3 },
    { left: 315, top: -22 },
    { left: 650, top: -12 },
    { left: 520, top: 22 },
    { left: 750, top: 05 },
    { left: 700, top: 10 },
    { left: 810, top: 25 },
    { left: 788, top: 12 },
    { left: 800, top: 05 },
    { left: 300, top: 80 },
    { left: 400, top: 78 },
    { left: 500, top: 75 },
    { left: 600, top: 70 },
    { left: 666, top: 65 },
    { left: 835, top: 75 },
    { left: 610, top: 180 },
    { left: 225, top: 101 },
    { left: 400, top: 163 },
    { left: 430, top: 180 },
    { left: 515, top: 144 },
    { left: 650, top: 155 },
    { left: 730, top: 157 },
    { left: 830, top: 166 },
    { left: 620, top: 170 },
    { left: 932, top: 148 },
    { left: 500, top: 175 },
    { left: 600, top: 170 },
    { left: 666, top: 165 },
    { left: 835, top: 175 },
    { left: 610, top: 150 },
    { left: 225, top: 261 },
    { left: 400, top: 173 },
    { left: 430, top: 180 },
    { left: 515, top: 134 },
    { left: 650, top: 125 },
    { left: 730, top: 277 },
    { left: 830, top: 156 },
    { left: 620, top: 180 },
    { left: 932, top: 268 },
];
var gameOverMenu;
var showGame;

var el = document.getElementById('enemy');

function play() {
  el.style.animationPlayState = 'running';
}

function gameInitialize() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    gameOverMenu = document.getElementById("gameOver");
    centerMenuPosition(gameOverMenu);
    setState("PLAY");
}

document.addEventListener('keydown', function (e) {
    var keyCode = e.keyCode;
    
    if (usedKeys.includes(keyCode) && !currentKeys.includes(keyCode)) {
        currentKeys.push(keyCode)
    };

    if (currentKeys.includes(37)) {
        if (hero.left > 10) {
            hero.left = hero.left - 20;
            movehero();
        }
    }
    if (currentKeys.includes(39)) {
        if (hero.left < 1150) {
            hero.left = hero.left + 20; //10 = speed
            movehero();
        }
    }
    if (currentKeys.includes(32)) {
        missiles.push({
            left: hero.left + 15,
            top: hero.top - 10
        })
        drawMissiles();
    }
    if (currentKeys.includes(13) || (currentKeys.includes(37) && currentKeys.includes(39))) {
        console.log(gameState);
        if (gameState === "GAME OVER" || gameState == "WINNER") {
            window.location.reload();
        }
        else {
            gameLoop();
        }
    }
});

document.addEventListener('keyup', function (e) {
    var keyCode = e.keyCode;
    if (usedKeys.includes(keyCode) && currentKeys.includes(keyCode)) {
        currentKeys.splice( currentKeys.indexOf(keyCode), 1 );
    };
});

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
        enemies[enemy].top = enemies[enemy].top + speedMonster;
        if (enemies[enemy].top > 550) {
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

                if (enemies.length < 1) {
                    setState("WINNER");
                    clearTimeout(timer);
                    showMenu();
                }
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
    else if (gameState == "WINNER")
        displayMenu(winnerMenu)
}

function centerMenuPosition(menu) {
     menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
     menu.style.left = (screenWidth / 2) - (menu.offsetWidth / 2) + "px";
}

function hideEnemies(){
    if (gameState == "GAME OVER" || gameState == "WINNER")
        document.getElementById('enemies').style.display = "none"
}

function hideHero(){
    if (gameState == "GAME OVER" || gameState == "WINNER")
        document.getElementById('hero').style.display = "none"
}

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