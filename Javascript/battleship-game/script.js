const gameField = document.getElementById('game');

let shipCnt = 0;
let clickCnt = 0;

const generateBoardPosition = () => {
  const shipSet = new Set();

  do {
    const randomNum = Math.floor(Math.random() * 16);
    shipSet.add(randomNum);
  } while (shipSet.size < 5);

  const positions = Array.from({ length: 16 }).map((_, idx) => (shipSet.has(idx) ? 1 : 0));
  return positions;
};

const randomPositions = generateBoardPosition();

document.addEventListener('DOMContentLoaded', () => {
  randomPositions.forEach((num) => {
    const cellChild = document.createElement('div');
    cellChild.classList.add('cell');
    cellChild.innerHTML = ` <img src=${num ? './ship.png' : './water.webp'} data-image=${
      num ? 'ship' : 'water'
    } />`;
    gameField.appendChild(cellChild);
  });
});

const clearBoard = () => {
  shipCnt = 0;
  clickCnt = 0;
  const allImages = document.querySelectorAll('#game > .cell > img');
  allImages.forEach((img) => (img.style.display = 'none'));
};

gameField.addEventListener('click', (e) => {
  e.stopPropagation();
  const targetElem = e.target;
  if (!targetElem.classList.contains('cell')) {
    return;
  }

  const imgElem = targetElem.firstElementChild;
  imgElem.style.display = 'inline-block';
  const imageType = imgElem.dataset.image;

  if (imageType === 'ship') {
    shipCnt++;
  }
  clickCnt++;

  if (shipCnt === 5) {
    setTimeout(() => {
      alert('Congrats, you won the battleship');
      clearBoard();
    }, 50);
    return;
  }

  if (clickCnt >= 8) {
    setTimeout(() => {
      alert('Tough luck, unfortunately you lost the battleship');
      clearBoard();
    }, 50);
    return;
  }
});

document.getElementById('resetBtn').addEventListener('click', clearBoard);
