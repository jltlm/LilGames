const SCREEN_WIDTH = window.screen.width;
const SCREEN_HEIGHT = window.screen.height;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;
// walls: x = 0, x = 800, y = 0, y = 400
// ball bounces if it hits either horizontal wall (y axis)

// ball speed currently isn't changeable- maybe in the future
const ballSpeed = 10;
const barSpeed = 10;

const barSize = 80;

// ball, left bar, right 
// bars x coord is locked
let ballx = 400;
let bally = 200;
let ballRad = 5; // ball radius
const barlx = 20;
let barly = 200;
const barrx = 780;
let barry = 200;

// 1 is left, 2 is right
let score1 = 0;
let score2 = 0;

// backdrop - constant
function drawBackground() {
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 800, 400);
  ctx.beginPath();
  ctx.moveTo(400, 0);
  ctx.lineTo(400, 400);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
  ctx.closePath();
}

const keysPressed = new Set();
window.addEventListener("keydown", (event) => {
  keysPressed.add(event.key);
});
window.addEventListener("keyup", (event) => {
  keysPressed.delete(event.key);
});

function checkKey(e) {
  console.log(e);
  switch (e) {
    case "ArrowUp":
      if (barry > 0) {
        barry -= barSpeed;
      }
      break;
    case "ArrowDown":
      if (barry < 400 - barSize) {
        barry += barSpeed;
      }
      break;
    case "w":
      if (barly > 0) {
        barly -= barSpeed;
      }
      break;
    case "s":
      if (barly < 400 - barSize) {
        barly += barSpeed;
      }
      break;
  }
  console.log(barly + " " + barry);
}

let xdir = 1;
let ydir = 1;
function tick() {
  if (canvas.getContext) {
    keysPressed.forEach(checkKey);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(barlx, barly, 5, barSize);
    ctx.fillRect(barrx, barry, 5, barSize);

    // ball
    ctx.beginPath();
    ctx.arc(ballx, bally, ballRad, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    ballx += xdir;
    bally += ydir;
    console.log(canvas.height);

    if (bally + ballRad >= canvas.height || bally - ballRad <= 0) {
      ydir = -ydir;
    }
    if (ballx + ballRad >= canvas.width) { 
      // left wins
      goal(1);
    } else if (ballx - ballRad <= 0) {
      // right wins
      goal(2);
    }
    if (hitsBar()) {
      xdir = -xdir;
    }

  }
  window.requestAnimationFrame(tick);
}

function goal(side) {
  if (side == 1) {
    score1++;
  } else if (side == 2) {
    score2++;
  }
  ballx = 400;
  bally = 200;
  document.getElementById("score").textContent = score1 + " " + score2;
}

function hitsBar() {
  if (ballx - ballRad == barlx) {
    if (bally > barly && bally < barly + barSize) {
      return true;
    }
  } else if (ballx + ballRad == barrx) {
    if (bally > barry && bally < barry + barSize) {
      return true;
    }
  }
  return false;
}

window.requestAnimationFrame(tick);


// setInterval(tick, 40);
