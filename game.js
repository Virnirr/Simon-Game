// variable for the game including array of items
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;

// level variable
var level = 0;

$(document).on("keydown", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// jQuery event listener that listens to all clicks on button made by user
$(".btn").on("click", function () {
  // stores the id of the button objectthat was pressed into a variable
  var userChosenColor = $(this).attr("id");

  // pushes the pattern into an array or collection of items with index
  userClickedPattern.push(userChosenColor);

  // animate effect when button is pressed
  animatePress(userChosenColor);

  // play audio
  playSound(userChosenColor);

  // checking if user pressed the correct button
  checkAnswer(userClickedPattern.length - 1);
});

// new functions that gets random color
function nextSequence() {
  // set userClickedPattern to empty whenever nextSequence is pressed
  userClickedPattern = [];
  // random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  // setting variable equal to random color from buttonColor array
  var randomChosenColor = buttonColors[randomNumber];

  // pushing the random color into the empty gamePattern array
  gamePattern.push(randomChosenColor);

  // flashing animation
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // play audio
  playSound(randomChosenColor);

  level++;

  $("#level-title").text("Level " + level);
}

// functions to make sound so that it stays DRY
function playSound(name) {
  // play audio object with file name
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// animating the button that was pressed by changing the class of the element
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // checking if the most recent press was equal to the last gamePattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      // wait 1000 milliseconds before calling nextSequence again when
      // user has finished level
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");

    // adding game-over class when user loses and removing it after 200 milliseconds
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // changing h1 tag to say Game Over, Press Any Key to Restart
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // calling startOver() function
    startOver();
  }
}

// startover function
function startOver() {
  // reset all the variables when game over
  level = 0;
  gamePattern = [];
  started = false;
}