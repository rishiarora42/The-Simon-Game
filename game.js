var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red","blue","green","yellow"];

var started = false;

var level = 0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });



$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    var index = userClickedPattern.length - 1;
    checkAnswer(index);    
});


function nextSequence(){

    userClickedPattern = [];    

    level++;

    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
            nextSequence();
            },1000);
        }
    }

    else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        
        $("body").addClass("game-over");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
