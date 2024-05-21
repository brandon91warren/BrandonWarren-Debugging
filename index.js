const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
const outOfRangeMessage = document.getElementById('out-of-range'); // Add an element for out of range message

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  
  // Check if the guess is out of range
  if (guess < 1 || guess > 99) {
    hideAllMessages();
    outOfRangeMessage.hidden = false;
    return;
  }

  attempts += 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.hidden = false;
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guess${attempts > 1 ? 'es' : ''}`;

    correctMessage.hidden = false;

    submitButton.disabled = true;
    guessInput.disabled = true;
  } else {
    if (guess < targetNumber) {
      tooLowMessage.hidden = false;
    } else {
      tooHighMessage.hidden = false;
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.hidden = false;
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess${remainingAttempts === 1 ? '' : 'es'} remaining`;

    if (remainingAttempts === 0) {
      submitButton.disabled = true;
      guessInput.disabled = true;
      maxGuessesMessage.hidden = false;
    }
  }

  guessInput.value = '';

  resetButton.hidden = false;
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].hidden = true;
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.hidden = true;
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  setup();
  resetButton.hidden = true;
  hideAllMessages();
});

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);