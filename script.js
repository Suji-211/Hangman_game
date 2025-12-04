document.addEventListener("DOMContentLoaded", () => {

const WORDS = [
  "apple",
  "banana",
  "orange",
  "grape",
  "kiwi",
  "pear",
  "peach",
  "plum",
  "melon",
  "lemon",
  "pineapple",
  "mango",
  "papaya",
  "coconut",
  "strawberry",
  "blueberry",
  "raspberry",
  "blackberry",
  "cherry",
  "apricot",
  "tomato",
  "carrot",
  "potato",
  "onion",
  "garlic",
  "pepper",
  "lettuce",
  "broccoli",
  "spinach",
  "zucchini",
  "cucumber",
  "celery",
  "cauliflower",
  "asparagus",
  "mushroom",
  "pumpkin",
  "radish",
  "beetroot",
  "turnip",
  "parsnip",
  "elephant",
  "giraffe",
  "tiger",
  "lion",
  "cheetah",
  "leopard",
  "zebra",
  "rhino",
  "hippo",
  "buffalo",
  "kangaroo",
  "koala",
  "panda",
  "sloth",
  "chimpanzee",
  "gorilla",
  "orangutan",
  "lemur",
  "meerkat",
  "otter",
  "shark",
  "whale",
  "dolphin",
  "seal",
  "octopus",
  "jellyfish",
  "lobster",
  "crab",
  "shrimp",
  "starfish",
  "eagle",
  "sparrow",
  "parrot",
  "penguin",
  "ostrich",
  "flamingo",
  "peacock",
  "hummingbird",
  "owl",
  "falcon",
  "house",
  "apartment",
  "mansion",
  "cottage",
  "bungalow",
  "castle",
  "villa",
  "shack",
  "chalet",
  "palace",
  "bed",
  "chair",
  "table",
  "desk",
  "sofa",
  "couch",
  "cabinet",
  "wardrobe",
  "bookshelf",
  "dresser",
  "car",
  "bicycle",
  "motorcycle",
  "scooter",
  "truck",
  "bus",
  "train",
  "airplane",
  "helicopter",
  "boat",
  "submarine",
  "rocket",
  "spaceship",
  "hovercraft",
  "tram",
  "trolley",
  "taxi",
  "ferry",
  "yacht",
  "canoe",
  "violin",
  "guitar",
  "piano",
  "trumpet",
  "flute",
  "drums",
  "clarinet",
  "saxophone",
  "cello",
  "harp",
  "concert",
  "symphony",
  "melody",
  "harmony",
  "rhythm",
  "tempo",
  "note",
  "scale",
  "chord",
  "tune",
  "dog",
  "cat",
  "rabbit",
  "hamster",
  "goldfish",
  "parakeet",
  "ferret",
  "guinea",
  "chinchilla",
  "gerbil",
  "winter",
  "spring",
  "summer",
  "autumn",
  "snow",
  "rain",
  "hail",
  "sleet",
  "fog",
  "storm",
  "mountain",
  "river",
  "lake",
  "ocean",
  "forest",
  "desert",
  "valley",
  "canyon",
  "island",
  "waterfall",
  "kitchen",
  "bathroom",
  "bedroom",
  "livingroom",
  "garage",
  "basement",
  "attic",
  "hallway",
  "balcony",
  "patio",
  "science",
  "history",
  "math",
  "geography",
  "chemistry",
  "biology",
  "physics",
  "astronomy",
  "literature",
  "philosophy",
  "football",
  "basketball",
  "tennis",
  "golf",
  "soccer",
  "baseball",
  "hockey",
  "cricket",
  "rugby",
  "volleyball"
];
const max_wrong_guess = 10;
let secretWord = " ";
let displayChars = [ ];
let guessedletters = new Set();
let wrongGuess = 0;
let usedWords = [ ];
let gameOver = false;
const wordDisplayE1 = document.getElementById("word-display");
const keyboardE1 = document.getElementById("keyboard");
const hangmanImageE1 = document.getElementById("hangman-image");
const statusMessageE1 = document.getElementById("status-message");
const playAgainBtn = document.getElementById("play-again");
const usedWordsListE1 = document.getElementById("used-words-list");

function createkeyboard(){
    const Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    keyboardE1.innerHTML= "";
    for (const letter of Letters){
        const btn = document.createElement("button");
        btn.textContent= letter;
        btn.className= "key";
        btn.dataset.letter = letter;
        btn.addEventListener("click",() => {
            handleGuess(letter);
        });
        keyboardE1.appendChild(btn);
    }
}

function pickRandomWord(){
    const availableWords = WORDS.filter(word => !usedWords.includes(word));
    const pool = availableWords.length ? availableWords : WORDS;
    const index = Math.floor(Math.random()*pool.length);
    return pool[index];

}

function initGame() {
  secretWord = pickRandomWord();
  displayChars = Array.from(secretWord).map(() => "_");
  guessedletters.clear();
  wrongGuess = 0;
  gameOver = false;

  updateWordDisplay();
  updateHangmanImage();
  resetKeyboardButtons();
  setstatusMessage("");
}

function resetKeyboardButtons(){
    const buttons = keyboardE1.querySelectorAll(".key");
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove("key--correct", "key--wrong");
    });
}

function updateHangmanImage(){
    hangmanImageE1.classList.add("hangman-animate");
    hangmanImageE1.src = `img/h-${wrongGuess}.jpg`;
;

    setTimeout(()=> {
        hangmanImageE1.classList.remove("hangman-animate");
    }, 300);
}

function updateUsedWordsList(){
    usedWordsListE1.innerHTML= "";
    usedWords.forEach(word => {
        const li = document.createElement("li");
        li.textContent = word.toUpperCase();
        usedWordsListE1.appendChild(li);
    });
}

function setstatusMessage(message,type=""){
    statusMessageE1.textContent= message;
    if(type == "win")statusMessageE1.style.color = 'green';
    else if (type == "lose")statusMessageE1.style.color = 'red';
    else statusMessageE1.style.color = "#222";
}

function updateWordDisplay(){
    wordDisplayE1.innerHTML="";
    displayChars.forEach(char => {
        const span = document.createElement("span");
        span.className = "word-display__char";
        span.textContent = char==="_" ? "" : char;
        wordDisplayE1.appendChild(span);
    });
}

function handleGuess(rawLetter) {
  if (gameOver) return;

  const letter = rawLetter.toLowerCase();

  if (guessedletters.has(letter)) return;
  guessedletters.add(letter);

  const button = keyboardE1.querySelector(
   `.key[data-letter="${letter.toUpperCase()}"]`

  );

  if (button) button.disabled = true;

  if (secretWord.includes(letter)) {
    if (button) button.classList.add("key--correct");

    Array.from(secretWord).forEach((char, index) => {
      if (char === letter) {
        displayChars[index] = letter.toUpperCase();
      }
    });

    updateWordDisplay();

    if (!displayChars.includes("_")) {
      gameOver = true;
      usedWords.push(secretWord);
      updateUsedWordsList();
      setstatusMessage("You won! 🎉", "win");
    } else {
      setstatusMessage("Correct!");
    }
  }

  
  else {
    if (button) button.classList.add("key--wrong");

    wrongGuess++;
    updateHangmanImage();

    if (wrongGuess >= max_wrong_guess) {
      gameOver = true;
      usedWords.push(secretWord);
      updateUsedWordsList();

      setstatusMessage(
       ' You lost! The word was "${secretWord.toUpperCase()}"',
        "lose"
      );

      displayChars = Array.from(secretWord.toUpperCase());
      updateWordDisplay();
    } else {
      setstatusMessage(
        `Wrong! ${max_wrong_guess - wrongGuess} guesses left.`

      );
    }
  }
}

window.addEventListener("keydown", event => {
  if (/^[a-z]$/i.test(event.key)) {
    handleGuess(event.key);
  }
});

playAgainBtn.addEventListener("click", initGame);
createkeyboard();
initGame();

});