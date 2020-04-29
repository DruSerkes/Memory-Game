const gameContainer = document.getElementById("game");
const startGame = document.getElementById('start-game');
const gameForm = document.querySelector('form');
const gameOverDiv = document.getElementById('game-over');
const playAgain = document.getElementById('play-again');
const highScore = document.getElementById('high-score');
let numTries = document.getElementById('tries');
let choices = [];
let tries = 0;
let toGo = 0;

//Helper function to generate random colors 
const getRandomColor = () => {
  let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16); // switch to RGB method
  return randomColor;
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//play game helper function
const playGame = () => {
  //check localStorage for high score
  if (localStorage.bestScore){
    highScore.innerHTML = `High Score: ${JSON.parse(localStorage.bestScore)}`;
  } else {
    highScore.innerHTML = `High Score: N/A`;
  }

  //Turn on the game display, remove gameForm display, build card divs with random colors 
  gameForm.style.display = 'block';
  gameForm.addEventListener('submit', event => {
    event.preventDefault();
    const randomColors = [];
    let numberOfCards = parseInt(document.querySelector('input').value);
    if (numberOfCards <= 0){
        return;
    }
    document.querySelector('input').value = ''; 
    for (let i = 0; i < numberOfCards / 2; i++){
      let newColor = getRandomColor(); 
      randomColors.push(newColor);
      randomColors.push(newColor);
      toGo++;
  }
    gameForm.style.display = 'none';
    let shuffledRandomColors = shuffle(randomColors);
    createDivsForColors(shuffledRandomColors);
})
}

//gameOver helper function
const gameOver = () => {
  // update high score if necessary
  if (!localStorage.bestScore){
    localStorage.setItem('bestScore', JSON.stringify(tries));
  } else {
    if (tries < JSON.parse(localStorage.bestScore)){
      localStorage.bestScore = tries; 
    }
  }

  // bring up the Game Over overlay 
  gameOverDiv.style.display = 'block';
  playAgain.addEventListener('click', event => { 
    gameContainer.innerHTML = '';
    tries = 0;
    numTries.innerHTML = `Guesses: ${tries}`;
    gameOverDiv.style.display = 'none';
    playGame();
    })
  }

//match helper function 
const match = () => {
  //decrement toGo 
  toGo--; 
  //clear the choices array 
  choices = [];
  //add back event listeners
  for (let div of document.querySelectorAll('#game > div')){
    div.addEventListener("click", handleCardClick);
  }
  //check if game over 
  if (toGo === 0){
    console.log(`Game over! Congrats - it took you ${tries} tries!`);
    gameOver(); 
  }
}

//noMatch helper function 
const noMatch = () => {
  // turn the cards back around 
  setTimeout(() => {
    for (let choice of choices){
    choice.card.style.backgroundColor = "grey";
    choice.card.style.opacity = "0.9";
    choices = [];
  }
    for (let div of document.querySelectorAll('#game > div')){
      div.addEventListener("click", handleCardClick);
  }
}, 1000)
}

// TODO: Refactor so logic is separate from DOM
function handleCardClick(event) {

  // Nothing happens if you click the same card twice 
  if (choices.length === 1){
    if (event.target === choices[0]['card']){
      return;
    }
  }

  // if fewer than 2 choices are made allow logic 
  if (choices.length < 2){
    let card = event.target
    let color = card.classList[0]
    card.style.backgroundColor = color;
    event.target.style.opacity = "1";

    choices.push({'card': card, 'color': color});
  }
  
  //if there are 2 choices made, handle match or noMatch
  if (choices.length === 2){
    tries++
    numTries.innerHTML = `Guesses: ${tries}`;

    for (let div of document.querySelectorAll('#game > div')){
      div.removeEventListener('click', handleCardClick);
    }

    if (choices[0].color === choices[1].color && choices[0].card !== choices[1].card){
      match();
      console.log("Match!")
    } else {
      noMatch();
      console.log("No Match!")
    }
  }
}

// when the DOM loads
startGame.addEventListener('click', () => {
  startGame.style.display = 'none';
  playGame();
  })

