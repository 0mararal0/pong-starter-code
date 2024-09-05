// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego
const paddleNode = document.createElement("div"); // se crea la paleta
paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego

const ball = {
  x: 30,
  y: 30,
  w: 20,
  h: 20,
  radio: 10,
  speed: 1.8,
  isBallMovingRight: true,
  isBallMovingDown: true,
};
const paddle = {
  x: 200,
  y: 550,
  w: 100,
  h: 20,
  speed: 30,
};

// *** Game Functions ***

function gameLoop() {
  //ball.x++; //si ponemos +=2 va mas rápida la pelota
  ballMovement();
  detecColisionBallWall();
  detectColisionPaddleBall();
}
function ballMovement() {
  if (ball.isBallMovingRight) {
    ball.x += ball.speed;
    ballNode.style.left = `${ball.x}px`;
  } else {
    ball.x -= ball.speed;
    ballNode.style.left = `${ball.x}px`;
  }
  if (ball.isBallMovingDown) {
    ball.y += ball.speed;
    ballNode.style.top = `${ball.y}px`;
  } else {
    ball.y -= ball.speed;
    ballNode.style.top = `${ball.y}px`;
  }
}
function detecColisionBallWall() {
  if (ball.x >= gameBoxNode.offsetWidth - ball.w) {
    ball.isBallMovingRight = false;
  }
  if (ball.y >= gameBoxNode.offsetHeight - ball.h) {
    /*  ball.isBallMovingDown = false; */
    gameOver();
  }
  if (ball.x <= 0) {
    ball.isBallMovingRight = true;
  }
  if (ball.y <= 0) {
    ball.isBallMovingDown = true;
  }
}

function paddleMovement(direction) {
  if (direction == "right") {
    paddle.x += paddle.speed;
    paddleNode.style.left = `${paddle.x}px`;
  }
  if (direction == "left") {
    paddle.x -= paddle.speed;
    paddleNode.style.left = `${paddle.x}px`;
  }
}

function detectColisionPaddleBall() {
  if (
    ball.y + ball.h >= paddle.y &&
    ball.x >= paddle.x &&
    ball.x <= paddle.x + paddle.w
  ) {
    ball.isBallMovingDown = false;
  }
}

function gameOver() {
  alert("Perdiste el Juego");
  clearInterval(gameIntervalId);
}
// *** Game Loop Interval ***
setInterval(() => {
  gameLoop();
}, 1000 / 60); //60fps

let gameIntervalId = setInterval(() => {}, 1000 / 60);

// *** Event Listeners ***

window.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "ArrowRight") {
    paddleMovement("right");
  }
  if (event.key === "ArrowLeft") {
    paddleMovement("left");
  }
});
