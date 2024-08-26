const categories = {
  soulFood: [
    "chicken",
    "dressing",
    "cornbread",
    "cabbage",
    "catfish",
    "greens",
    "roast",
  ],
  cars: [
    "chevy",
    "toyota",
    "honda",
    "buick",
    "cadillac",
    "mercedes",
    "nissan",
    "ferrari",
  ],
  colors: ["red", "blue", "green", "yellow", "purple", "black", "pink"],
  professions: ["doctor", "teacher", "engineer", "artist", "chef"],
};

const options = ["soulFood", "colors", "professions", "cars"];
let selectedWord = '';
let guessedWord = [];
let missedGuesses = 0;

const wordSpacesDiv = document.getElementById("wordSpaces");
const strikesDiv = document.getElementById("strikes");
const hangmanDiv = document.getElementById("hangman");
const keyboardDiv = document.getElementById("keyboard");
const categoriesDiv = document.getElementById("categories");
const playAgainButton = document.getElementById("playAgain");

const hangmanParts = [
  'head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'
];

const init = () => {
  displayCategories();
  createKeyboard();
  resetHangman();
}

function displayCategories() {
  categoriesDiv.innerHTML = '';
  options.forEach(category => {
    const button = document.createElement("button");
    button.innerText = category;
    button.addEventListener("click", () => selectCategory(category));
    categoriesDiv.appendChild(button);
  });
}

function selectCategory(category) {
  selectedWord = getRandomWord(categories[category]);
  guessedWord = Array(selectedWord.length).fill("_");
  displayWord();
  resetHangman();
  missedGuesses = 0;
  strikesDiv.innerText = `You missed: ${missedGuesses}`;
  playAgainButton.style.display = "none";
}

function getRandomWord(words) {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].toUpperCase();
}

function createKeyboard() {
  keyboardDiv.innerHTML = '';  
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  alphabet.split("").forEach(letter => {
    const letterDiv = document.createElement("div");
    letterDiv.innerText = letter;
    letterDiv.classList.add("letter");
    letterDiv.addEventListener("click", () => guessLetter(letter));
    keyboardDiv.appendChild(letterDiv);
  });
}

function displayWord() {
  wordSpacesDiv.innerHTML = guessedWord.join(" ");
}

function guessLetter(letter) {
  let isCorrectGuess = false;
  for (let x = 0; x < selectedWord.length; x++) {
    if (selectedWord[x] === letter) {
      guessedWord[x] = letter;
      isCorrectGuess = true;
    }
  }
  displayWord();
  if (isCorrectGuess) {
    document.querySelectorAll(".letter").forEach(span => {
      if (span.innerText === letter) {
        span.classList.add("guessed");
      }
    });
  } else {
    missedGuesses++;
    strikesDiv.innerText = `You missed: ${missedGuesses}`;
    document.querySelectorAll(".letter").forEach(span => {
      if (span.innerText === letter) {
        span.classList.add("missed");
      }
    });
    showHangmanPart(missedGuesses);
  }
  checkWin();
}

function checkWin() {
  if (!guessedWord.includes("_")) {
    setTimeout(() => {
      alert("Congratulations! You've guessed the word.");
      resetGame();
      playAgainButton.style.display = "block";
    }, 500);
    } else if (missedGuesses >= hangmanParts.length) {
      setTimeout(() => {
      alert(`Game over! The word was ${selectedWord}`);
      resetGame();
      playAgainButton.style.display = "block";
    }, 500);
  }
}

function resetGame() {
  guessedWord = [];
  missedGuesses = 0;
  strikesDiv.innerText = `You missed: 0`;
  createKeyboard();
  resetHangman();
  playAgainButton.style.display = "none";
}

function resetHangman() {
  hangmanParts.forEach(part => {
    document.getElementById(part).style.display = 'none';
  });
}

function showHangmanPart(missCount) {
  if (missCount <= hangmanParts.length) {
    document.getElementById(hangmanParts[missCount - 1]).style.display = 'block';
  }
}
playAgainButton.addEventListener("click", () => {
  resetGame();
  init();
});


init();



  // Create functions: game,newGame,
  
  // function of game
  // choose category
  // logic: once category is chosen a randodom word is chosen from the answers of the categories along with hint
    // win game function. determine letters in word. count guesses
      // 6 amounted guesses
    //click letter on keyboard to input word
    // logic: player clicks letters from keyboad. correct letter goes in correct space in the answer. wrong letter becomes transparent/Enabled.
    // until the maxGuesses are reached or unitl correct answer
  
    // images should pop up
  
  // tell when game is over
  // logic: a image of a person should pop up on every wrong letter the player picks until maxGuesses. Game should end on maxGuesses or correct answer. tell you if you won or lost and ask you to play again or say this game is over
  
  // new game function should:
  //  start game over...run game function
  // play again button
  // logic: once play again button is clicked new game should run the game function from the beginning