const passwordInput = document.getElementById('password');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');

const numberCheckbox = document.getElementById('numbers');
const letterCheckbox = document.getElementById('letters');
const mixedCheckbox = document.getElementById('mixed');
const punctCheckbox = document.getElementById('punctuation');

const copyBtn = document.getElementById('copyBtn');
const alertMsg = document.getElementById('alert');

const CHARACTERS = {
  numbers: '0123456789',
  letters: 'abcdefghijklmnopqrstuvwxyz',
  mixed: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  punctuation: '!@#$%^&*',
};

const generatePassword = () => {
  let str = '';
  if (numberCheckbox.checked) str += CHARACTERS.numbers;
  if (letterCheckbox.checked) str += CHARACTERS.letters;
  if (mixedCheckbox.checked) str += CHARACTERS.mixed;
  if (punctCheckbox.checked) str += CHARACTERS.punctuation;

  if (!str) {
    showAlert(false, 'Please select at least one checkbox to generate a password.');
    return;
  }

  let password = '';
  const length = parseInt(lengthSlider.value);
  for (let i = 0; i < length; i++) {
    const randomIdx = Math.floor(Math.random() * length);
    password += str[randomIdx];
  }

  passwordInput.value = password;
};

const copyPassword = () => {
  const password = passwordInput.value;
  navigator.clipboard.writeText(password);
  showAlert(true, 'Password copied to clipboard!');
};

const showAlert = (isSuccess, message) => {
  alertMsg.innerText = message;
  if (isSuccess) {
    alertMsg.classList.add('success');
    alertMsg.classList.remove('error');
  } else {
    alertMsg.classList.add('error');
    alertMsg.classList.remove('success');
  }
  alertMsg.style.display = 'inline-block';
  setTimeout(() => {
    alertMsg.style.display = 'none';
  }, 2000);
};

lengthSlider.addEventListener('input', (e) => {
  lengthValue.innerText = e.target.value;
  generatePassword();
});

copyBtn.addEventListener('click', copyPassword);

generatePassword();
