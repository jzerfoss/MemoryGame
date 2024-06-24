const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
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

let shuffledColors = shuffle(COLORS);

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


let cardOne = null;
let cardTwo = null;
let notClicked = false;
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (notClicked) return;
  const currentCard = event.target;
  
  if (currentCard.classList.contains("flipped")) return; 

  currentCard.style.backgroundColor = currentCard.classList[0];
  currentCard.classList.add('flipped');
  console.log("you just clicked", currentCard);

  if(!cardOne) {
    cardOne = currentCard;
  }
  else if (!cardTwo) {
    cardTwo = currentCard;
    notClicked = true;

  }
// I know there's an error in this code block but not sure how to fix
  if (cardOne.classList[0] === cardTwo.classList[0]) {
      cardOne = null;
      cardTwo = null;
      notClicked = false;
    }

  else {
    setTimeout(function(){
      cardOne.style.backgroundColor = "";
      cardTwo.style.backgroundColor = "";
      cardOne.classList.remove("flipped");
      cardTwo.classList.remove("flipped");
      cardOne = null;
      cardTwo = null;
      notClicked = false;
    }, 1000);
  }

  const allFlipped = document.querySelectorAll(".flipped");
  if (allFlipped.length === COLORS.length) {
    setTimeout(function() {
      alert("You won!")
    }, 1000)
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);
