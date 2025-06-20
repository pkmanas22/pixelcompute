const gameField = document.getElementById('game');
const cells = document.getElementsByClassName('cell');
const winnerText = document.getElementById('winner');

let isGameOver = false;
let currentPlayer = 'X';

const board = Array(9).fill(null);

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const clearBoard = () => {
  isGameOver = false;
  currentPlayer = 'X';
  winnerText.innerText = '';
  board.fill(null);

  for (cell of cells) {
    cell.innerText = '';
    cell.style.backgroundColor = 'white';
  }
};

const updateBackground = (idx) => {
  cells[idx].style.backgroundColor = 'lightgreen';
};

const checkWinner = () => {
  return winningPatterns.some((pattern) => {
    const [a, b, c] = pattern;
    const isMatched = board[a] && board[a] === board[b] && board[b] === board[c];

    if (isMatched) {
      updateBackground(a);
      updateBackground(b);
      updateBackground(c);
    }
    return isMatched;
  });
};

gameField.addEventListener('click', (e) => {
  e.stopPropagation();
  const targetElem = e.target;
  if (!targetElem.classList.contains('cell')) {
    return;
  }

  if (isGameOver) return;

  if (targetElem.innerText) return;

  const cellIdx = targetElem.dataset.index;
  targetElem.innerText = currentPlayer;
  board[cellIdx] = currentPlayer;

  // console.log(board)

  if (checkWinner()) {
    setTimeout(() => {
      winnerText.innerText = `${currentPlayer} Wins!`;
      isGameOver = true;
    }, 100);
    return;
  }

  if (board.every((cell) => cell)) {
    setTimeout(() => {
      winnerText.innerText = 'Game drawn';
      isGameOver = true;
    }, 100);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
});

document.addEventListener('DOMContentLoaded', () => {
  Array.from({ length: 9 }).forEach((_, idx) => {
    const cellChild = document.createElement('div');
    cellChild.classList.add('cell');
    cellChild.setAttribute('data-index', idx);
    gameField.appendChild(cellChild);
  });
});

document.getElementById('resetBtn').addEventListener('click', clearBoard);
