//ul where guessed letters appear
const guessedList = document.querySelector(".guessed-letters");
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
const guessedLetters = document.querySelector("message");
//hidden button prompting player to play again
const hiddenButton = document.querySelector("play-again");

//starter word
const word = "magnolia";

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
    const inputLetter = inputGuess.value;
    console.log(inputLetter);
    inputGuess.value = "";
});