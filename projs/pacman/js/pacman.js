'use strict';
var PACMAN = '<img src="img/mikaa.png">';
var LEFT_PACMAN = '<img src="img/mika-left.png">'
var RIGHT_PACMAN = '<img src="img/mika-right.png">'

var gPacman;
function createPacman(board) {
	gPacman = {
		location: {
			i: 3,
			j: 5
		},
		isSuper: false
	};
	board[gPacman.location.i][gPacman.location.j] = PACMAN;
}
function movePacman(ev) {
	getIsVictory();
	if (!gGame.isOn) return;
	// console.log('ev', ev);
	var nextLocation = getNextLocation(ev);

	if (!nextLocation) return;
	// console.log('nextLocation', nextLocation);

	var nextCell = gBoard[nextLocation.i][nextLocation.j];
	// console.log('NEXT CELL', nextCell);

	if (nextCell === WALL) return;
	if (nextCell === FOOD) {
		updateScore(1);
		gFoodOnBoard--;
		console.log(gFoodOnBoard)
	}
	if (nextCell === CARROT) {
		updateScore(10);
	}
	if (nextCell === SUPER_FOOD) {
		gPacman.isSuper = true;
		setTimeout(function () {
			gPacman.isSuper = false
			returnGhosts();
		}, 5000);
		gFoodOnBoard--;
	}
	if (nextCell === GHOST) {
		if (gPacman.isSuper) {
			removeGhost(nextLocation)
			renderCell(nextLocation, EMPTY)
		}
		else {
			gameOver();
			renderCell(gPacman.location, EMPTY)
			return;
		}
	}
	// update the model
	gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

	// update the dom
	renderCell(gPacman.location, EMPTY);

	gPacman.location = nextLocation;

	// update the model
	gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
	// update the dom
	renderCell(gPacman.location, PACMAN);
}

function getNextLocation(eventKeyboard) {
	var nextLocation = {
		i: gPacman.location.i,
		j: gPacman.location.j
	};
	switch (eventKeyboard.code) {
		case 'ArrowUp':
			nextLocation.i--;
			PACMAN = '<img src="img/mika.png">';
			break;
		case 'ArrowDown':
			nextLocation.i++;
			PACMAN = '<img src="img/mika.png">';
			break;
		case 'ArrowLeft':
			nextLocation.j--;
			PACMAN = LEFT_PACMAN
			break;
		case 'ArrowRight':
			nextLocation.j++;
			PACMAN = RIGHT_PACMAN
			break;
		default:
			return null;
	}
	return nextLocation;
}


function ifEatsSuperFood() {
	gIsEatSuperFood = true;
	var nextLocation = getNextLocation(ev);
	if (!nextLocation) return;
	var nextCell = gBoard[nextLocation.i][nextLocation.j];
}