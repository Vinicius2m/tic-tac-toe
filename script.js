const mainGame = document.querySelector('.mainGame');
const startButton = document.getElementById('startButton');
const gameContainer = document.querySelector('.gameContainer');

let player = true;

let playerXSelections = [];
let playerOSelections = [];

const winningCombinations = [
  ['1,1', '2,1', '3,1'],
  ['1,2', '2,2', '3,2'],
  ['1,3', '2,3', '3,3'],
  ['1,1', '1,2', '1,3'],
  ['2,1', '2,2', '2,3'],
  ['3,1', '3,2', '3,3'],
  ['1,1', '2,2', '3,3'],
  ['3,1', '2,2', '1,3'],
];

startButton.addEventListener('click', startGame);

function startGame() {
  gameContainer.innerHTML = '';
  player = true;
  playerXSelections = [];
  playerOSelections = [];
  createCells();
}

function createCells() {
  const table = document.createElement('table');
  for (let i = 1; i <= 3; i++) {
    const tr = document.createElement('tr');

    for (let j = 1; j <= 3; j++) {
      const td = document.createElement('td');
      tr.appendChild(td);
      td.dataset.column = j;
      td.dataset.line = i;
      td.addEventListener('click', game);
    }

    table.appendChild(tr);
  }

  gameContainer.appendChild(table);
}

function game(evt) {
  const evtLine = evt.target.dataset.line;
  const evtColumn = evt.target.dataset.column;

  if (evt.target.innerHTML == '' && player) {
    evt.target.innerHTML = 'X';
    playerXSelections.push(`${evtColumn},${evtLine}`);
    player = !player;
  }

  if (evt.target.innerHTML == '' && !player) {
    evt.target.innerHTML = 'O';
    playerOSelections.push(`${evtColumn},${evtLine}`);
    player = !player;
  }

  let win = verifyWin();

  if (!win && playerXSelections.length + playerOSelections.length == 9) {
    alert('Empate :(');
    document.querySelectorAll('td').forEach((cell) => {
      cell.removeEventListener('click', game);
    });
  }
}

function verifyWin() {
  let win = false;

  winningCombinations.forEach((combination) => {
    let matchesX = 0;
    let matchesO = 0;

    for (let i = 0; i < playerXSelections.length; i++) {
      let cell = playerXSelections[i];
      if (combination.includes(cell)) {
        matchesX++;
      }
    }

    for (let i = 0; i < playerOSelections.length; i++) {
      let cell = playerOSelections[i];
      if (combination.includes(cell)) {
        matchesO++;
      }
    }

    if (matchesX === 3) {
      alert('X venceu!');
      document.querySelectorAll('td').forEach((cell) => {
        cell.removeEventListener('click', game);
      });
      win = true;
    }

    if (matchesO === 3) {
      alert('O venceu!');
      document.querySelectorAll('td').forEach((cell) => {
        cell.removeEventListener('click', game);
      });
      win = true;
    }
  });

  return win;
}
