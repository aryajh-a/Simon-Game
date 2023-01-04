var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// jQuery for keypress handling
$(document).keypress(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // work for checking
    checkAnswer(userClickedPattern.length - 1);
});

// Checking Answer
function checkAnswer(currentlevel) {

    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game over, press any key to restart!");

        // restart
        startOver();
    }
}

function nextSequence() {
    //reset tonull
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    // getting number btn 0-3
    var randomNumber = Math.floor(Math.random() * 4);
    // choosing colour on basis of the number
    var randomChosenColour = buttonColours[randomNumber];
    // pushing the color at thte end of gamePattern array
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started = false;
}
