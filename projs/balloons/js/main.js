// 'use strict';
var gBalloons;
var gNextId = 101;
var gBalloonsInterval;

function init() {
    gBalloons = createBalloons();
    renderBalloons(gBalloons);
    gBalloonsInterval = setInterval(play, 500);
}


function createBalloons(amount = 13) {
    var balloons = [];
    for (var i = 0; i < amount; i++) {
        var balloon = createBalloon();
        balloons.push(balloon);
    }
    return balloons;
}

function createBalloon() {
    return {
        id: gNextId++,
        speed: 10,
        bottom: 15
    }
}

function play() {
    moveBalloon();
}

function renderBalloons(balloon) {
    var htmlStr = '';

    for (var i = 0; i < gBalloons.length; i++) {
        var balloon = gBalloons[i];
        htmlStr += '<div onclick="clickBalloon(this)" id="balloon-' + balloon.id + '" class="balloon balloon' + (i + 1) + '"></div>';
    }

    var elSky = document.querySelector('.sky');
    elSky.innerHTML = htmlStr;
}

function clickBalloon(elBalloon) {
    elBalloon.classList.add('fadeout');

}

// onclick = "clickBalloon(' + balloon.id + ')
// function speedBalloon(id) {
//     var balloon = getBalloonById(id);
//     balloon.speed += 10;

// }

function moveBalloon() {
    for (var i = 0; i < gBalloons.length; i++) {
        var balloon = gBalloons[i];
        balloon.bottom += balloon.speed;
        var elBalloon = document.querySelector('#balloon-' + balloon.id);
        elBalloon.style.bottom = balloon.bottom + 'px';
    }
}

function getBalloonById(id) {
    for (var i = 0; i < gBalloons.length; i++) {
        var balloon = gBalloons[i];
        if (balloon.id === id) return balloon;
    }
    return null;
}