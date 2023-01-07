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
const barlx = 20;
let barly = 200;
const barrx = 780;
let barry = 200;

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

function tick() {
  if (canvas.getContext) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(barlx, barly, 5, barSize);
    ctx.fillRect(barrx, barry, 5, barSize);
  }
}

tick();

const keysPressed = new Map();
// can use a map to hold all currently pressed keys instead
window.addEventListener("keydown", (event) => {
  // gets snake's current direction
  switch (event.key) {
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
  tick();
  console.log(barly + " " + barry);
});
