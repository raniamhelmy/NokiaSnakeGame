//Initialize our Terms when the Document Loaded
/**********************initialize our main parameters*******************/
var documentHTML = document;

//Main Canvas
const squares = document.querySelectorAll(".gameGrid__container div");
const scoreDisplay = document.querySelector("span");


//Snake Properties
const width = 10;
let currentIndex = 0; //so first div in our gameGrid
let appleIndex = 0; //so first div in our gameGrid
let currentSnake = [2, 1, 0]; //array of our Snake Description {2--> Snake Head, 1--> Snake body , 0--> Snake Tail} so to increase the Snake body 1's will be added
let direction = 1; //moves 1 step in any direction
let score = 0; //initial Score Value
let speed = 0.9; //snake speed
//set interval duration time to move the snake 
let intervalTime = 0; 
let interval = 0;

function letsStart() {
  Swal.fire("Let's Start Playing...").then((result) => {
    if (result.isConfirmed) {
      //fire the start function Here
      gameStart();
    }
  });
}

function gameOver() {
  Swal.fire({
    title: 'Game Over...',
    confirmButtonText: 'Play Again!'
  }).then((result) => {
    if (result.isConfirmed) {
      //fire the start function Here
      gameStart();
    }
  });
}


//fire the Start function when the page loads
window.onload = letsStart();


//assign functions to keycodes to Control the Snake Moves
function controlSnake(e) {
  // console.log(currentIndex)
  //squares[currentIndex].classList.remove("snakeBody");

  if (e.keyCode === 39) {
    direction = 1; //if we press the right arrow on our keyboard, the snake will go right one {ArrowRight}
  } else if (e.keyCode === 38) {
    direction = -width; // if we press the up arrow, the snake will go back ten divs, appearing to go up {ArrowUp}
  } else if (e.keyCode === 37) {
    direction = -1; // if we press left, the snake will go left one div {ArrowLeft}
  } else if (e.keyCode === 40) {
    direction = +width; //if we press down, the snake head will instantly appear in the div ten divs from where you are now {ArrowDown}
  }
}

//fire the ControlSnake function when a specific keys are Pressed Down
documentHTML.addEventListener("keydown", controlSnake);

//function to generate A Random Apple Position when the apple is eaten by snake
function randomAppleGenerate() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snakeBody")); //making sure apples don't appear on the snake
  squares[appleIndex].classList.add("appleBlock");
}

//function to start, and restart the game
function gameStart() {
  currentSnake.forEach((index) => squares[index].classList.remove("snakeBody")); //remove the previos sanke values
  squares[appleIndex].classList.remove("appleBlock"); //remove the apple coordinates that was created before
  clearInterval(interval); //clear the intervals
  score = 0; //clear score
  randomAppleGenerate(); //generate a new randome apple
  direction = 1; //set direction to 1 as initial value
  scoreDisplay.innerText = score; //set score to 0 as initial value
  intervalTime = 1000; //set time interval time to 1s
  currentSnake = [2, 1, 0]; //initialize snake values and position
  currentIndex = 0;
  currentSnake.forEach((index) => squares[index].classList.add("snakeBody"));
  interval = setInterval(moveOutcomes, intervalTime);
}

 //function that deals with ALL the ove outcomes of the Snake
 function moveOutcomes() {

  //1-deals with snake hitting border and snake hitting self {Game-over}
  if (
    (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
    (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
    (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
    squares[currentSnake[0] + direction].classList.contains('snakeBody') //if snake goes into itself
  ) {
    gameOver();
    return clearInterval(interval); //this will clear the interval if any of the above happen
  }

  const tail = currentSnake.pop(); //removes last item of the array
  squares[tail].classList.remove('snakeBody');  //removes class of snake from the TAIL {clear last part of the snake from grid when it moves}
  currentSnake.unshift(currentSnake[0] + direction); //gives/push direction to the head of the array
  scoreDisplay.classList.remove('animate__animated','animate__bounceIn'); //remove the animation class for increasing the score

  //2-deals with snake getting/eating the apple
  if(squares[currentSnake[0]].classList.contains('appleBlock')) {
    squares[currentSnake[0]].classList.remove('appleBlock'); //remove the apple from the grid
    squares[tail].classList.add('snakeBody'); //increase the snake body
    currentSnake.push(tail); 
    randomAppleGenerate(); //generate new random Apple
    score++ ; //increase the score
    //scoreDisplay.textContent = score ; 
    //setTimeout(() => scoreDisplay.textContent = score, 250); //show the new score on Screen with small animation
    scoreDisplay.classList.add('animate__animated','animate__bounceIn'); //add the animation class for increasing the score
    scoreDisplay.textContent = score ; 
    clearInterval(interval); //clear the time interval
    intervalTime = intervalTime * speed; //increase the speed of snake velocity
    interval = setInterval(moveOutcomes, intervalTime); //pass new data to reset the interval values
  }
  squares[currentSnake[0]].classList.add('snakeBody');
  
}
