'use strict'
const PACMAN = '⍩⃝';



var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
        rotation: 0,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    else if (nextCell === SUPER_FOOD && gPacman.isSuper) return
    else if (nextCell === FOOD) foodEaten();
    else if (nextCell === SUPER_FOOD) superFoodEaten();
    else if (nextCell === CHERRY) cherryEaten();
    else if (nextCell === GHOST &&
        gPacman.isSuper) ghostDie(nextLocation)
    else if (nextCell === GHOST) {
        renderCell(gPacman.location, EMPTY)
        gameOver();
        return
    }


    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);
    gEmptyCells.push(gPacman.location);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, getPacmanHTML());

}

function getPacmanHTML() {
    var pacmanColor = (gPacman.isSuper) ? 'purple' : 'orange';
    return `<span style="display: inline-block;
     transform: rotate(${gPacman.rotation}deg); color: ${pacmanColor};">
     ${PACMAN}</span>`
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            gPacman.rotation = 90;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            gPacman.rotation = -90;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            gPacman.rotation = 0;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            gPacman.rotation = 180;
            break;
        default:
            return null;
    }
    return nextLocation;
}


function foodEaten() {
    updateScore(1);
    gGame.foodCount--;
    if (gGame.foodCount === 0) {
        gameOver();
    }
}

function superFoodEaten() {
    gPacman.isSuper = true;
    document.querySelector('.is-super').style.display = 'block';
    setTimeout(superFoodReset, 5000);
}

function superFoodReset() {
    gPacman.isSuper = false;
    document.querySelector('.is-super').style.display = 'none';
    restoreGhosts(gDeadGhosts);
}

function cherryEaten() {
    updateScore(10);
}