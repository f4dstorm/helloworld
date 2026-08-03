//first spaw
let started = false;
const square = $(".square");

function choose() {
  const colors = ["red", "yellow", "green", "blue"];
  let chosen = colors[randomizer(4, 0)];

  square.css("background-color", chosen);
}
choose();

//starting
$("body").keyup(function (event) {
  if (event.key === "a") {
    start();
  }
});

function start() {
  if (started) return;
  started = true;
  timer();
  console.log("STARTT");
}

//clicking
square.click(clickHandler);

function clickHandler() {
  if (!started) return;

  let oldW = square.width();
  let oldH = square.height();

  square.width(oldW - 20);
  square.height(oldH - 20);

  if (square.height() <= 0) {
    respawn();
  }
}

//timer
let chosenTime = 30;
$(".15sec").click(function () {
  chosenTime = 15;
  $(".timecomment").html("set!");
});

$(".30sec").click(function () {
  chosenTime = 30;
  $(".timecomment").html("alright!");
});

$(".1min").click(function () {
  chosenTime = 60;
  $(".timecomment").html("ready to go!");
});

let myInterval;
function timer() {
  const myTimer = $(".timer");
  // let minutes = 1;
  // let seconds = minutes * 60;
  let seconds = chosenTime;
  let minutes = seconds / 60;

  myInterval = setInterval(countdown, 1000);

  function countdown() {
    let minuteCount = Math.floor(seconds / 60);
    let secondcount = seconds % 60;

    secondcount = secondcount <= 9 ? "0" + secondcount : secondcount;
    // secondcount = secondcount = 60 ? "00" : secondcount;

    if (seconds <= 0) {
      myTimer.html("00:00");
      clearInterval(myInterval);
      end();
    } else {
      myTimer.html(`${minuteCount}:${secondcount}`);
      seconds--;
    }
  }
}

//respawnning & scorre
let score = 0;
let hiscore = 0;
function respawn() {
  const sizes = [40, 60, 80, 100];
  let chosenSize = sizes[randomizer(4, 0)];

  square.height(chosenSize);
  square.width(chosenSize);

  choose();

  let point = `${randomizer(390, 1)}px ${randomizer(390, 1)}px`;
  square.css("margin", point);

  score += 10;
  $(".score").html(`${score}`);
}

function randomizer(num, bleh) {
  return Math.floor(Math.random() * num) + bleh;
}

//end and next
function end() {
  started = false;
  showScore();
}

function next() {
  $(".timer").html("Press A to play again!");
  score = 0;
  $(".score").html(`${score}`);
  square.width(100);
  square.height(100);
  square.css("margin", "200px 250px");
}

//score
let times = 0;

function showScore() {
  // $("<div>", {
  //   class: "scoreboard",
  //   html:
  //     "<h2>Your score was <br /><span class='theScore'>100!</span></h2>" +
  //     "<p class='comment'></p>" +
  //     "<button class='close'>close</button>",
  // }).appendTo("body");

  $(".scoreboard").removeClass("hidden");
  $(".theScore").html(`${score}!`);

  let comparitive =
    score > hiscore ? "higher" : score < hiscore ? "lower" : "the same";

  times >= 1
    ? $(".comment").html(`that was ${comparitive} than your highscore!`)
    : $(".comment").html(`good game!`);
  times++;

  hiscore = score > hiscore ? score : hiscore;

  $(".close").click(function () {
    $(".scoreboard").addClass("hidden");
    next();
  });
  $(".hiscore").html(`${hiscore}`);
}

//query
const question = $(".askbtn");

question.click(function () {
  $(".tutorial").removeClass("hidden");
  $(".x").removeClass("hidden");

  let why = $(".x").height();
  $(".x").width(why);
});

$(".x").click(function () {
  $(".tutorial").addClass("hidden");
});

//setTime
const stopwatch = $(".timerbtn");

stopwatch.click(function () {
  $(".timechooser").removeClass("hidden");
  $(".x2").removeClass("hidden");
  $(".timecomment").html("");

  let why = $(".x2").height();
  $(".x2").width(why);
});

$(".x2").click(function () {
  $(".timechooser").addClass("hidden");
});
