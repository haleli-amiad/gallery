'use strict';
const WALL = '<img src="img/wall.png">';
const FOOD = '<img src="img/bone.png">';
const SUPER_FOOD = '<img src="img/superbone.png">';
var EMPTY = ' ';
const CARROT = '🥕'

var gBoard;
var gGame = {
	score: 0,
	isOn: false
};

var gFoodOnBoard;
var gIsEatSuperFood;
var gCarrotInterval;

function init() {
	gIsEatSuperFood = false;
	gFoodOnBoard = -1;
	gGame.score = 0;
	gBoard = buildBoard();
	createPacman(gBoard);
	createGhosts(gBoard);
	gCarrotInterval = setInterval(generateCarrot, 9000);
	printMat(gBoard, '.board-container');
	gGame.isOn = true;
	var elTable = document.querySelector('.board-container');
	elTable.style.display = 'block';
	var elGameOver = document.querySelector('.game-over');
	elGameOver.style.display = 'none';
	var elVictoryMsg = document.querySelector('.victory');
	elVictoryMsg.style.display = 'none';
}

function buildBoard() {
	var SIZE = 10;
	var board = [];
	for (var i = 0; i < SIZE; i++) {
		board.push([]);
		for (var j = 0; j < SIZE; j++) {
			if ((i === 1 && j === 1) ||
				(i === 1 && j === SIZE - 2) ||
				(i === SIZE - 2 && j === 1) ||
				(i === SIZE - 2 && j === SIZE - 2)) {
				board[i][j] = SUPER_FOOD
			} else {
				board[i][j] = FOOD;
			}
			if (
				(i === 0 || i === SIZE - 1 || j === 0 || j === SIZE - 1 || (j === 3 && i > 4 && i < SIZE - 2))
			) {
				board[i][j] = WALL;
			}
			if (board[i][j] === FOOD || board[i][j] === SUPER_FOOD) gFoodOnBoard++;
		}
	}
	return board;
}

function updateScore(diff) {
	gGame.score += diff;
	document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver() {
	gGame.isOn = false;
	var elTable = document.querySelector('.board-container');
	elTable.style.display = 'none';
	var elGameOver = document.querySelector('.game-over');
	elGameOver.style.display = 'block';
	clearInterval(gIntervalGhosts);
	clearInterval(gCarrotInterval)
}

function getIsVictory() {
	if (gFoodOnBoard === 0 || gGame.score >= 80) {
		gGame.isOn = false;
		var elTable = document.querySelector('.board-container');
		elTable.style.display = 'none';
		var elVictoryMsg = document.querySelector('.victory');
		elVictoryMsg.style.display = 'block';
	}
}

function getRandPos() {
	var emptyPoses = [];
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[i].length; j++) {
			var cell = gBoard[i][j];
			var pos = { i: i, j: j };
			if (cell === EMPTY) {
				emptyPoses.push(pos);
			}
		}
	}
	var randPos = emptyPoses[Math.round(getRandomIntInclusive(0, emptyPoses.length - 1))];
	return randPos;
}

function generateCarrot() {
	var emptyCell = getRandPos();
	renderCell(emptyCell, CARROT);
	gBoard[emptyCell.i][emptyCell.j] = CARROT;
}