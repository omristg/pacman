'use strict'
const GHOST = '&#9781;';

var gGhosts = []
var gDeadGhosts = [];
var gIntervalGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
    gGhosts = [];
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function restoreGhosts(gDeadGhosts) {
    for (var i = 0; i < gDeadGhosts.length; i++) {
        gGhosts.push(gDeadGhosts[i]);
        renderCell(gDeadGhosts[i].location, GHOST);
    }
    gDeadGhosts = [];
    // gGhosts = gGhosts.concat(gDeadGhosts);
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === SUPER_FOOD) return;
    if (nextCell === CHERRY) return;
    if (nextCell === GHOST) return;
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            ghostDie(ghost.location)
            return
        }
        else {
            renderCell(nextLocation, EMPTY);
            gameOver();
        }
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getGhostHTML(ghost) {
    var ghostColor = (gPacman.isSuper) ? 'orange' : ghost.color
    return `<span style="color: ${ghostColor}"> ${GHOST}</span>`
}

function getMoveDiff() {
    var randNum = getRandomIntInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function ghostDie(ghostLocation) {

    for (var i = 0; i < gGhosts.length; i++) {
        var currGhostI = gGhosts[i].location.i;
        var currGhostJ = gGhosts[i].location.j;

        if (ghostLocation.i === currGhostI &&
            ghostLocation.j === currGhostJ) {
            var deadGhost = gGhosts.splice(i, 1)[0];
            gDeadGhosts.unshift(deadGhost);
            gBoard[currGhostI][currGhostJ] = '';
            break;
        }

    }
    renderCell(deadGhost.location, EMPTY);

}