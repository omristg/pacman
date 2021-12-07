'use strict'

function printMat(mat, selector) {
  var strHTML = '<table border="0" class="board"><tbody>';

  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = `cell cell${i}-${j}`;
      if (mat[i][j] === '#') strHTML += `<td class="${className} wall">${cell}</td>`;
      else if (mat[i][j] === PACMAN) strHTML += `<td class="${className} pacman">${cell}</td>`;
      else strHTML += `<td class="${className}">${cell}</td>`;
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}


function getRandomIntInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}