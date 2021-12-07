'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPER_FOOD = '🍩';
const CHERRY = '🍒';

var gCherryIntervalId;
var gEmptyCells = [];
var gBoard;
var gGame = {
    score: 0,
    foodCount: -1,
    isOn: false
}

function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    gCherryIntervalId = setInterval(createCherry, 15 * 1000);

}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 && j === 1) || (i === 1 && j === SIZE - 2) ||
                (i === SIZE - 2 && j === 1) ||
                (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = SUPER_FOOD;
            }
            if (board[i][j] === FOOD ) gGame.foodCount++;
        }
    }
    return board;
}

function createCherry() {
    if (!gEmptyCells.length) return
    var randCell = getRandomEmptyCell();
    gBoard[randCell.i][randCell.j] = CHERRY;
    renderCell(randCell, CHERRY)
}


function getRandomEmptyCell() {
    var randIdx = getRandomInt(0, gEmptyCells.length);
    var randCell = gEmptyCells.splice(randIdx, 1)[0];
    return randCell;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    if (!gGame.foodCount) {
        document.querySelector('.modal span').innerText = 'Victory!!'
    }
    document.querySelector('.modal').style.display = 'block'
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
}

function resetGame() {
    gGame.foodCount = -1;
    gGame.score = 0;
    document.querySelector('h2 span').innerText = 0;
    document.querySelector('.modal').style.display = 'none';
    clearInterval(gCherryIntervalId);
    init();
}
