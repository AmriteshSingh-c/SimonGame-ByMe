var colour = ["green", "red", "yellow", "blue"];
var player = [];
var game = [];
var level = 0;
var start = false;

$(document).on("keypress", function() {
    if (!start) {
        $("#level-title2").text("Level " + level);
        generateSequence();
        start = true;
    }
});

function generateSequence() {
    player = [];
    level++;
    $("#level-title2").text("Level " + level);
    var random = Math.floor(Math.random() * 4);
    game.push(colour[random]);

    $("#" + colour[random]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colour[random]);

}


$(".btn").on("click", function() {
    var clicked = $(this).attr("id");
    player.push(clicked);
    playSound(clicked);
    animatePressed(clicked);
    check(player.length - 1);
});

function check(index) {
    if (game[index] === player[index]) {
        if (game.length === player.length) {
            setTimeout(function() {
                generateSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("gameOver");
        setTimeout(function() {
            $("body").removeClass("gameOver");
        }, 200);

        $("#level-title2").text("Game Over,Press Any Keyboard Key to Restart");
        Restart();
    }
}

function animatePressed(toclick) {
    $("#" + toclick).addClass("pressed");
    setTimeout(function() {
        $("#" + toclick).removeClass("pressed");
    }, 100);
}

function Restart() {
    level = 0;
    game = [];
    start = false;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}
$(".instructions").on("click", function() {
    alert("This is a simple Game Based on Memory \n As the level in the game increases the number of colours to memorise increases \n1.Remember all the colours of the previous levels in the same order and then click in the same order to move on to the next level \n 2.if the order is incorrect or the colour is incorrect the game will restart with level 1 \n                                                       Enjoy");
});