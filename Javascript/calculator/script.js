const result = document.getElementById('result');

let currentInput = '';
let evaluated = false;

function appendToDisplay(value) {
  if (evaluated) {
    currentInput = '';
    evaluated = false;
  }
  currentInput += value;
  updateDisplay();
}

function updateDisplay() {
  result.textContent = currentInput || '0';
}

const clearScreen = () => {
  currentInput = '';
  updateDisplay();
};

const backspaceCharacter = () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
};

const calculateResult = () => {
  try {
    const resultValue = eval(currentInput.replace('^', '**'));
    result.textContent = resultValue;
    currentInput = resultValue.toString();
    evaluated = true;
  } catch (e) {
    result.textContent = 'Error';
    currentInput = '';
  }
};

document.querySelectorAll('.digit').forEach((btn) => {
  btn.addEventListener('click', () => appendToDisplay(btn.textContent));
});

document.querySelectorAll('.operator').forEach((btn) => {
  btn.addEventListener('click', () => {
    const lastChar = currentInput.slice(-1);
    if ('+-*/%^'.includes(lastChar)) {
      currentInput = currentInput.slice(0, -1);
    }
    currentInput += btn.textContent;
    updateDisplay();
  });
});

document.querySelector('.clear').addEventListener('click', clearScreen);

document.querySelector('.delete').addEventListener('click', backspaceCharacter);

document.querySelector('.exponent').addEventListener('click', () => {
  if (currentInput !== '' && !currentInput.endsWith('^')) {
    currentInput += '^';
    updateDisplay();
  }
});

document.querySelector('.equal').addEventListener('click', calculateResult);

document.addEventListener('keydown', (e) => {
  // console.log(e);
  if (e.key === 'Enter') calculateResult();
  else if (e.key === 'Backspace') backspaceCharacter();
});
