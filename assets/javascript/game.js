// emojis values between 1 and 12
// random value to get to is between 19 and 120

// NEED

// --create function to generate random number
// --use random function to random images to select from array.  Make it emoji images
// --use random function to generate the value to guess
// --use random function to assign a random value to each emoji.  make sure it is not a duplicate
// --add emojis to page
// create function to keep track of added numbers
// create function to compare total aded value vs value to guess
// determine if win loose or continue
// increase win or loose

// SELECTORS
const emojisPage = document.querySelector('.emojis');
const numberToGuessPage = document.querySelector('.number-to-guess');
const currentCountPage = document.querySelector('.current-count');
const winsPage = document.querySelector('.wins');
const lossesPage = document.querySelector('.losses');
const titlePage = document.querySelector('.title');

const emojis = [
  '🤡',
  '💀',
  '👻',
  '😈',
  '👽',
  '👾',
  '🤖',
  '🚀',
  '🐵',
  '🐶',
  '🐯',
  '🦊',
  '🐲',
  '🐸',
  '🐼',
  '🦄',
  '🦎',
  '🐳',
  '🐠',
  '🐞',
];
let selectedEmojis = [];
let emojiObj = {};
let currentCount = 0;
let valueToGuess = randomValue(19, 120);
let wins = 0;
let losses = 0;

function first() {
  generateEmojis();
  generateObj(selectedEmojis);
  populatePage();
  currentCount = 0;
  valueToGuess = randomValue(19, 120);
  currentCountPage.textContent = 0;
  numberToGuessPage.textContent = valueToGuess;
  winsPage.textContent = 0;
  lossesPage.textContent = 0;
  titlePage.textContent = `${emojis[randomValue(0, emojis.length)]} Counter`;
}

first();

function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateEmojis() {
  selectedEmojis = [];
  while (selectedEmojis.length < 4) {
    // generate a random value no longer than the array of emojis
    let rand = randomValue(0, emojis.length);
    // if the selected number has not been picked, add the corresponding
    // emoji to the selectedEmojis array
    !selectedEmojis.includes(emojis[rand]) && selectedEmojis.push(emojis[rand]);
  }
}

function generateObj(arr) {
  // takes an array and returns an object with the keys being the array items and
  // the values a random value between 1 and 12 //TODO: it can produce repeats
  emojiObj = arr.reduce((obj, item) => {
    obj[item] = randomValue(1, 12);
    return obj;
  }, {});
  return emojiObj;
}

function populatePage() {
  let parentElement = document.querySelector('.container');
  parentElement.innerHTML = '';
  for (let emoji in emojiObj) {
    let childElement = document.createElement('button');
    childElement.className += `emoji`;
    childElement.setAttribute('data-value', emojiObj[emoji]);
    appendChildElement = parentElement.appendChild(childElement);
    appendChildElement.innerHTML = emoji;
  }
}

function win() {
  console.log('you win');
  wins++;
  again();
}

function loose() {
  console.log('you loose');
  losses++;
  again();
}

function checkState() {
  valueToGuess === currentCount && win();
  valueToGuess < currentCount && loose();
}

function again() {
  generateEmojis();
  generateObj(selectedEmojis);
  populatePage();
  currentCount = 0;
  valueToGuess = randomValue(19, 120);
  numberToGuessPage.textContent = valueToGuess;
  currentCountPage.textContent = 0;
}

function play() {
  currentCountPage.textContent = currentCount;
  checkState();
  winsPage.textContent = wins;
  lossesPage.textContent = losses;
}

// EVENT LISTENERS
emojisPage.addEventListener('click', function(e) {
  // add class to flip the number
  currentCountPage.className += ' flip';
  const emojiValue = parseInt(e.target.dataset.value);
  currentCount = currentCount + emojiValue || 0;
  currentCountPage.textContent = currentCount;

  //  wait and remove the flip class after 500 milliseconds
  setTimeout(() => {
    currentCountPage.className = 'current-count';
  }, 100);

  play();
});
