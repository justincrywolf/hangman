// Global variables

var wordOptions = [ "kinkakuji", "kabukicho", "carcassonne", "louvre", "hanazono", "monaco", "shinjuku", "ginza", "asakusa" ];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0
var blanksAndSuccesses = [];
var wrongLetters = [];

var winCount = 0;
var lossCount = 0;
var guessesLeft = 8;


// Functions

function startGame () {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;

    // Reset
    guessesLeft = 8;
    wrongLetters = [];
    blanksAndSuccesses = [];

    //Populate blanks and successes
    for (var i=0; i<numBlanks; i++){
        blanksAndSuccesses.push("_");
    }

    // Change HTML
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("winCount").innerHTML = winCount;
    document.getElementById("lossCount").innerHTML = lossCount;


  
    // Testing
    console.log( selectedWord );
    console.log( lettersinWord);
    console.log( numBlanks);
    console.log( blanksAndSuccesses);
}

function checkLetters(letter) {
  
    var isLetterInWord = false;

    for ( var i=0; i<numBlanks; i++ ){
        if( selectedWord[i] == letter ) {
            isLetterInWord = true;
        }
    }
    // Check where in word letter exists and populate array

    if(isLetterInWord){
        for ( var i=0; i<numBlanks; i++ ){
            if( selectedWord[i] == letter ) {
                blanksAndSuccesses[i] = letter;
            }
        }
    }

    else{
        wrongLetters.push(letter);
        guessesLeft--
    }

}

function roundComplete(){
    console.log( "Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left" + guessesLeft );

document.getElementById("guessesLeft").innerHTML = guessesLeft;
document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
document.getElementById("wrongLetters").innerHTML = wrongLetters.join(" ");

// Check if user won
    if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("You Won!");

        document.getElementById("winCount").innerHTML = winCount;

        startGame();
    }

// Check if user lost
    else if (guessesLeft == 0) {
        lossCount++;
        alert("You Lost :(");

        document.getElementById("lossCount").innerHTML = lossCount;
        startGame();
    }

}
// Main process

// Initiates the game
startGame();


// Register keys
document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
    
}

