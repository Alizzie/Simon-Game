             // Pattern, Level and Colour Options

var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "green", "yellow", "blue"];
var level = 0;

               // Playing Sounds Feature

function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

          // Changing Colour after Clicking

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


            // Starting the Game, Level = 0

document.addEventListener("keydown", nextSequence, {once: true});
document.addEventListener("click", nextSequence, {once:true});

                  // Random Sequence

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

                // User Click Round

$(".btn").click(function(event){

  var userChosenColour = event.toElement.id;

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length -1);
});

       // Checking User's Answer Against Game Sequence

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
  }

  } else {

    var wrongSound = new Audio ("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout (function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

                    // Restarting Game

function startOver() {
  document.addEventListener("keydown", nextSequence, {once: true});
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
