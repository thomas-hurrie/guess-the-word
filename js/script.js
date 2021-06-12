//ul where guessed letters appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//button with text "Guess!!"
const guessButton = document.querySelector(".guess");
//text input where player guesses letter
const inputGuess = document.querySelector(".letter");
//empty paragraph where word in progress will appear
const wordProgress = document.querySelector(".word-in-progress");
//paragraph where remaining guesses will appear
const remainingGuesses = document.querySelector(".remaining");
//span inside paragraph where remaining guesses will appear
const remainingSpan = document.querySelector(".remaining span");
//empty paragraph where messages will appear when player guesses letter
const guessMessage = document.querySelector(".message");
//hidden button prompting player to play again
const hiddenButton = document.querySelector(".play-again");

//starter word
const word = "magnolia";
guessedLetters = [];

const placeHolders = function (word) {
    const placeHoldersLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeHoldersLetters.push("●");
    }
    wordProgress.innerText = placeHoldersLetters.join("");
}

placeHolders(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    //empty message paragraph
    guessMessage.innerText = "";
    //grab what was entered in input
    const inputLetter = inputGuess.value;
    //check input 
    const validGuess = validateInput(inputLetter);

    if (validGuess) {
        //make a guess
        makeGuess(inputLetter);
    }
    inputGuess.value = "";
});

//validate player's input
const validateInput = function(input) {
    const acceptedLetter = /[a-zA-z]/;
    if (input.length === 0) {
    guessMessage.innerText = "Invisible letters don't work!";
    } else if (input.length > 1) {
    guessMessage.innerText = "Easy there, one letter at time!";
    } else if (!input.match(acceptedLetter)) {
    guessMessage.innerText = "Guess must be a single letter A-Z!";
    } else {
    return input;
    } 
};

const makeGuess = function (inputLetter) {
    inputLetter = inputLetter.toUpperCase();
    if (guessedLetters.includes(inputLetter)) {
        guessMessage.innerText = "You've already guessed that letter, try again!";
    } else {
        guessedLetters.push(inputLetter);
        console.log(guessedLetters);
        displayGuesses();
        displayWordProgress(guessedLetters);
    }
};

//update page with letters the player guesses
const displayGuesses = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//update word in progress
const displayWordProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordProgress.innerText = revealWord.join("");
    checkWin();
};

//check for win
const checkWin = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML = `<p class="highlight">You guessed the word!<br>Congrats!!!</p>`;
    }
};