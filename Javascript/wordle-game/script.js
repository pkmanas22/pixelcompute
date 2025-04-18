
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const input = document.getElementById("word-input");
    const msg = document.getElementById("msg");

    let guessCount = 0;
    const MAX_GUESS = 6;
    let gameOver = false;

    const generateRandomWord = () => {
        const randomIdx = Math.floor(Math.random() * words.length);
        return words[randomIdx].toUpperCase();
    };

    const randomWord = generateRandomWord();

    const checkWord = (guessedWord) => {
        const cells = document.getElementsByClassName("cell");

        const startCellIdx = guessCount * 5;

        Array.from({ length: 5 }, (_, idx) => idx).forEach((value) => {
            cells[startCellIdx + value].innerText = guessedWord[value];

            if (randomWord[value] === guessedWord[value]) {
                cells[startCellIdx + value].classList.add("matched");
            } else if (randomWord.includes(guessedWord[value])) {
                cells[startCellIdx + value].classList.add("included");
            } else cells[startCellIdx + value].classList.add("absent");
        });

        if (guessedWord === randomWord) {
            gameOver = true;
            msg.innerText = "Congratulations you guessed the word";
        }
        guessCount++;

        if (guessCount >= MAX_GUESS) {
            msg.innerText = `Game over, the word was ${randomWord}`;
            return;
        }
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const guessedWord = input.value.toUpperCase().trim();
        input.value = "";
        if (gameOver) return;
        if (!guessedWord) {
            alert("Please guess a word");
            return;
        }

        if (!/^[A-Z]{5}$/.test(guessedWord)) {
            alert("The word should be exactly 5 letters (A–Z only)");
            return;
        }

        checkWord(guessedWord);
    });
});
