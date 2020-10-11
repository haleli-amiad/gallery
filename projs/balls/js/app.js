'use strict';

var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE';

var GAMER_IMG = '<img src="img/gamer.png">';
var BALL_IMG = '<img src="img/ball.png">';
var GLUE_IMG = '<img src="img/candy.png">';

var gGamerPos;
var gBoard;
var gBallTimerId;
var gGlueTimerId;
var gBallsEaten;
var gBallsOnBoard;
var gIsOnGlue;

function init() {
	gGamerPos = { i: 2, j: 9 };
	gIsOnGlue = false;
	gBallsEaten = 0;
	gBallsOnBoard = 2;
	var elVictory = document.querySelector('.victory');
	elVictory.style.display = 'none';
	gBoard = buildBoard();
	renderBoard(gBoard);
	// gBallTimerId = setInterval(renderBall, 3000);
	gBallTimerId = setInterval(generateBall, 3000);
	gGlueTimerId = setInterval(renderGlue, 5000);
}

//TODO: global var for counting, adding to moveTo, add a span in the html and then collect inside the moveTo this span and add the gCount

function buildBoard() {
	var height = 10;
	var width = 12;
	var board = [];
	// TODO: Create the Matrix 10 * 12
	// TODO: Put FLOOR everywhere and WALL at edges

	for (var i = 0; i < height; i++) {
		board[i] = [];
		for (var j = 0; j < width; j++) {
			var cell = {
				type: FLOOR,
				gameElement: ''
			};
			var isSecretPath = ((i === 0 && j === 5) || (i === height - 1 && j === 5) ||
				(i === 5 && j === 0) || (i === 5 && j === width - 1));

			if ((i === 0 || j === 0 || i === height - 1 || j === width - 1) && !isSecretPath) {
				cell.type = WALL;
			}
			board[i][j] = cell;
		}
	}
	// TODO: Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	board[3][3].gameElement = BALL;
	board[4][5].gameElement = BALL;
	return board;
}

function renderGlue() {
	var targetCell = getRandomPlace();
	for (var i = 0; i < gBoard.length; i++) {
		if (gBoard[targetCell.i][targetCell.j].gameElement === '') {
			gBoard[targetCell.i][targetCell.j].gameElement = GLUE;
			renderCell(targetCell, GLUE_IMG);
			setTimeout(function () {
				if (gBoard[targetCell.i][targetCell.j].gameElement !== GLUE) return;
				gBoard[targetCell.i][targetCell.j].gameElement = '';
				renderCell(targetCell, '');
			}, 3000);
			return;
		} else {
			targetCell = getRandomPlace();
		}
	}
}
// Render the board to an HTML table
function renderBoard(board) {
	var strHTML = '';

	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j });

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			} else if (currCell.gameElement === GLUE) {
				strHTML += GLUE_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	if (gIsOnGlue) {
		return;
	}
	if (i === -1) {
		i += gBoard.length;
	} else if (j === -1) {
		j += gBoard[0].length;
	} else if (i === gBoard.length) {
		i = 0;
	} else if (j === gBoard[0].length) {
		j = 0;
	}
	var targetCell = gBoard[i][j];
	if (targetCell && targetCell.type === WALL) return;

	// Calculate distance to ake sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	var absDistance = jAbsDiff + iAbsDiff;

	// If the clicked Cell is one of the four allowed
	if (
		absDistance === 1 ||
		(iAbsDiff === gBoard.length - 1 && jAbsDiff === 0) ||
		(jAbsDiff === gBoard[0].length - 1 && iAbsDiff === 0)
	) {
		if (targetCell.gameElement === BALL) {
			gBallsEaten++;
			gBallsOnBoard--;
			var elCount = document.querySelector('.ball-count');
			elCount.innerHTML = gBallsEaten;
			if (gBallsOnBoard === 0) {
				clearInterval(gBallTimerId);
				clearInterval(gGlueTimerId);
				var elVictory = document.querySelector('.victory');
				elVictory.style.display = 'block';
			}
		}
		if (targetCell.gameElement === GLUE) {
			gIsOnGlue = true;
			setTimeout(function () {
				gIsOnGlue = false;
			}, 3000);
		}

		// Todo: Move the gamer
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = '';
		renderCell(gGamerPos, '');

		gGamerPos.i = i;
		gGamerPos.j = j;

		targetCell.gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);
	}
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location);
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
	// console.log(event);

	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;
	}
}

function renderBall() {
	var targetCell = getRandomPlace();
	for (var i = 0; i < gBoard.length; i++) {
		if (gBoard[targetCell.i][targetCell.j].gameElement === '') {
			gBoard[targetCell.i][targetCell.j].gameElement = BALL;
			gBallsOnBoard++;
			renderCell(targetCell, BALL_IMG);
			return;
		} else {
			targetCell = getRandomPlace();
		}
	}
}

function generateBall() {
	var pos = getRandPos();
	if (!pos) return;
	gBoard[pos.i][pos.j].gameElement = BALL;
	gBallsOnBoard++;
	renderCell(pos, BALL_IMG);
}
function getRandPos() {
	var emptyPoses = [];
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[i].length; j++) {
			var cell = gBoard[i][j];
			var pos = { i: i, j: j };
			if (!cell.gameElement && cell.type === FLOOR) {
				emptyPoses.push(pos);
			}
		}
	}
	var randPos = emptyPoses[getRndInteger(0, emptyPoses.length - 1)];
	return randPos;
}

function getRandomPlace() {
	var randRowIdx = getRndInteger(1, gBoard.length - 2);
	var randColIdx = getRndInteger(1, gBoard[0].length - 2);
	var targetCell = {
		i: randRowIdx,
		j: randColIdx
	};
	// console.log(targetCell);
	return targetCell;
}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
