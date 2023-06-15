// Set up canvas and context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 800;

// Global Variables

let basket = {
  x: 450,
  y: 700,
  speed: 7,
};
let apple = {
  x: 400,
  y: -50,
  speed: 7,
};
let basketimg = document.getElementById("basket");
let appleimg = document.getElementById("apple");
let point = 0;
let missed = 0;
let best = point;
let state;

let ArrowRightPressed = false;
let ArrowLeftPressed = false;

// Animation Loop
requestAnimationFrame(drawStart);

function drawStart() {
  ctx.fillStyle = "pink";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  ctx.font = "40px Times";
  ctx.fillStyle = "white";
  ctx.fillText("Click To Start", 380, 300);
  ctx.font = "25px Times";
  ctx.fillStyle = "white";
  ctx.fillText(
    "Use the arrow keys to move the basket, and catch the apples",
    200,
    400
  );
  state = "start";
  ctx.fillText("Select a difficuly below...", 370, 600);

  apple.speed = 7;
}

function drawLoss() {
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  ctx.font = "40px Times";
  ctx.fillStyle = "white";
  ctx.fillText("Click To Start", 380, 300);
  ctx.font = "25px Times";
  ctx.fillStyle = "white";
  ctx.fillText("You Lost.", 450, 400);
  ctx.fillStyle = "white";
  ctx.fillText("Select a difficuly below...", 370, 600);
  state = "lost";
  apple.speed = 7;
  document.getElementById("hard").style.border = `3px solid black`;
  document.getElementById("normal").style.border = `3px solid black`;
}

cnv.addEventListener("click", onmouseclick);
function onmouseclick() {
  if (state === "start" || state === "lost") {
    basket.x = 450;

    requestAnimationFrame(draw);
  }
}
document.getElementById("hard").addEventListener("click", difficulty);
// Store order code in function
function difficulty() {
  if (state != "game") {
    apple.speed = 12;
    document.getElementById("hard").style.border = `3px solid red`;
    document.getElementById("normal").style.border = `3px solid black`;
  }
  //Catch!
  if (
    apple.x < basket.x + 60 &&
    apple.x > basket.x - 15 &&
    780 < apple.y &&
    apple.y < 788
  ) {
    point++;
  } else if (780 < apple.y && apple.y < 788) {
    missed++;
  }
}

if (apple.speed == 7) {
  document.getElementById("normal").style.border = `3px solid red`;
  document.getElementById("hard").style.border = `3px solid black`;
}

document.getElementById("normal").addEventListener("click", easier);
// Store order code in function
function easier() {
  if (state != "game") {
    apple.speed = 7;
    document.getElementById("normal").style.border = `3px solid red`;
    document.getElementById("hard").style.border = `3px solid black`;
  }
  //Catch!
  if (
    apple.x < basket.x + 65 &&
    apple.x > basket.x - 15 &&
    780 < apple.y &&
    apple.y < 788
  ) {
    point++;
  } else if (780 < apple.y && apple.y < 788) {
    missed++;
  }
}

function draw() {
  //Logic
  state = "game";

  if (ArrowRightPressed) {
    basket.x += basket.speed;
  } else if (ArrowLeftPressed) {
    basket.x += -basket.speed;
  }

  // Draw
  ctx.fillStyle = "cornflowerblue";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Player

  ctx.drawImage(appleimg, apple.x, apple.y, 65, 65);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 750, cnv.width, 50);
  ctx.drawImage(basketimg, basket.x, 680, 100, 100);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.font = "30px Impact";
  ctx.fillStyle = "white";
  ctx.fillText("Apples:", 25, 35);
  ctx.fillText(point, 120, 35);
  ctx.fillText("Missed:", 170, 35);
  ctx.fillText(missed, 270, 35);
  ctx.fillText("Best:", 315, 35);
  ctx.fillText(best, 390, 35);

  //Apple Fall

  if (point > best) {
    best = point;
  }

  if (apple.y >= 800) {
    apple.y -= 850;
    apple.x = Math.random() * 990;
  }
  if (apple.y < 800) {
    apple.y += apple.speed;
  }

  //Catch!
  if (
    apple.x < basket.x + 65 &&
    apple.x > basket.x - 15 &&
    780 < apple.y &&
    apple.y < 788
  ) {
    point++;
  } else if (780 < apple.y && apple.y < 788) {
    missed++;
  }

  // Animate
  if (missed >= 3) {
    point = 0;
    missed = 0;
    drawLoss();
  } else {
    requestAnimationFrame(draw);
  }
}

//Hold Down
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
  if (event.code == "ArrowRight") {
    ArrowRightPressed = true;
  } else if (event.code == "ArrowLeft") {
    ArrowLeftPressed = true;
  }

  if (basket.x < -60) {
    basket.x = 1070;
  } else if (basket.x > 1071) {
    basket.x = -55;
  }
}
function keyupHandler(event) {
  if (event.code == "ArrowRight") {
    ArrowRightPressed = false;
  } else if (event.code == "ArrowLeft") {
    ArrowLeftPressed = false;
  }
}
