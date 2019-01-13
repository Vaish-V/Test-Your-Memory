var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
$("h1").text("Level 0");
var track = false;
$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

$(document).on("keypress",function(){
  if (track === false) {
    nextSequence();
    track = true;
  }

});
function nextSequence() {
  level++;
  userClickedPattern = [];
  var randomNumber = Math.floor((Math.random()*4));
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("h1").text("Level "+level);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playsound(randomChosenColour);

}

function playsound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
      $("#"+currentColor).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    console.log("failure");
    audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  track = false;
}
