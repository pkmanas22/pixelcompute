let shipCnt = 0;
let clickCnt = 0;

const clearBoard = () => {
    shipCnt = 0;
    clickCnt = 0;
    const allImages = document.querySelectorAll('#game > .cell > img')
    allImages.forEach(img => img.style.display = "none")
}

const gameField = document.getElementById('game')
gameField.addEventListener('click', (e) => {
    e.stopPropagation()
    const targetElem = e.target;
    if (!targetElem.classList.contains('cell')) {
        return;
    }

    const imgElem = targetElem.firstElementChild
    imgElem.style.display = "inline-block"
    const imageType = imgElem.dataset.image;

    if (imageType === "ship") {
        shipCnt++;
    }
    clickCnt++;

    if (shipCnt === 5) {
        setTimeout(() => {
            alert("You Won!");
            clearBoard();
        }, 50);
        return;
    }

    if (clickCnt >= 8) {
        setTimeout(() => {
            alert("You Lost!");
            clearBoard();
        }, 50);
        return;
    }
})

document.getElementById('resetBtn').addEventListener('click', clearBoard)