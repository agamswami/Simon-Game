
var buttonsColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern =[];
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    
    var randomNumber = Math.floor(Math.random()*4);
    ++level;
    $("h1").text("level "+level);
    
    var randomChosenColour = buttonsColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("."+randomChosenColour).fadeOut(100).fadeIn(100);
    console.log("random :"+randomChosenColour);

    var audio = new Audio("./sounds/"+randomChosenColour+".mp3");
    audio.play();
}

$("#green").click(function(){
    handler("green");
});
$("#red").click(function(){
    handler("red");
});
$("#yellow").click(function(){
    handler("yellow");
});
$("#blue").click(function(){
    handler("blue");
});

function handler(userChosenColour){
    console.log(userChosenColour);                               
    userClickedPattern.push(userChosenColour);
    var clickedAudio = new Audio("./sounds/"+userChosenColour+".mp3");
    clickedAudio.play();
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(currentLevel === (gamePattern.length-1)){
            setTimeout(nextSequence,1000);
        }
    }
    else{
        console.log("fail");
        var failSound = new Audio("./sounds/wrong.mp3");
        failSound.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $("h1").text("Game Over, Press Any Key to Restart");
}

function cheackStart(){
    if(level === 0){
        nextSequence();
    }
}

$(document).keydown(cheackStart);



