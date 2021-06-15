//ul where guessed letters appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//button with text "Guess!!"
const guessButton = document.querySelector(".guess");
//text input where player guesses letter
const inputGuess = document.querySelector(".letter");
//empty paragraph where word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//paragraph where remaining guesses will appear
const remainingGuessesElement = document.querySelector(".remaining");
//span inside paragraph where remaining guesses will appear
const remainingSpan = document.querySelector(".remaining span");
//empty paragraph where messages will appear when player guesses letter
const message = document.querySelector(".message");
//hidden button prompting player to play again
const hiddenButton = document.querySelector(".play-again");

//starter word
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeHolders(word);
};

getWord();

const placeHolders = function (word) {
    const placeHoldersLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeHoldersLetters.push("●");
    }
    wordInProgress.innerText = placeHoldersLetters.join("");
};

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    //empty message paragraph
    message.innerText = "";
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
    message.innerText = "Invisible letters don't work!";
    } else if (input.length > 1) {
    message.innerText = "Easy there, one letter at time!";
    } else if (!input.match(acceptedLetter)) {
    message.innerText = "Guess must be a single letter A-Z!";
    } else {
    return input;
    } 
};

const makeGuess = function (inputLetter) {
    inputLetter = inputLetter.toUpperCase();
    if (guessedLetters.includes(inputLetter)) {
        message.innerText = "You've already guessed that letter, try again!";
    } else {
        guessedLetters.push(inputLetter);
        console.log(guessedLetters);
        guessCount(inputLetter);
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
    wordInProgress.innerText = revealWord.join("");
    checkWin();
};

const guessCount = function (inputLetter) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(inputLetter)) {
        message.innerText = `Sorry, ${inputLetter} is not in the word.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `You guessed correctly! The word contains ${inputLetter}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word!<br>Congrats!!!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    hiddenButton.classList.remove("hide");
};

hiddenButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingSpan.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    hiddenButton.classList.add("hide");
    getWord();
});
