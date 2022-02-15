/* global document, alert, requestAnimationFrame */

import Paddle from './Classes/Paddle.js';
import Ball from './Classes/Ball.js';
import Tiles from './Classes/Tiles.js';
import Background from './Classes/Background.js';
import Score from './Classes/Score.js';
import Lives from './Classes/Lives.js';


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const tiles = new Tiles()
const paddle = new Paddle();
const ball = new Ball(canvas.width / 2, canvas.height - 30);
const background = new Background(canvas.width, canvas.height, "aqua")
const score = new Score()
const lives = new Lives(canvas.width - 65)

let rightPressed = false;
let leftPressed = false;
let updatedLives;

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);



function collisionDetection() {
    for (let column = 0; column < tiles.columns; column += 1) {
        for (let row = 0; row < tiles.rows; row += 1) {
            const brick = tiles.bricks[column][row];
            // calculations
            if (brick.status === true) {
                if(ball.x > brick.x && ball.x < brick.x + brick.width && ball.y > brick.y && ball.y < brick.y + brick.height) {
                    ball.dy *= -1;
                    brick.status = false;
                    score.update(1);

                    if (score === tiles.rows * tiles.columns) { 
                        // eslint-disable-next-line no-alert
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    score.render(ctx)
}

function drawLives() {
    // ctx.font = "16px Arial";
    // ctx.fillStyle = "#0095DD";
    // ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
    lives.render(ctx)
}

function drawBall() {
    ball.render(ctx)
}

function drawPaddle() {
    paddle.y = canvas.height - paddle.height
    paddle.render(ctx)
}

function drawBricks() {
    tiles.render(ctx)
}

function drawBackground() {
    background.render(ctx)
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    // calculate position and return the amount of live left acording to the position calculated.
    updatedLives = ball.calculateNextPosition(canvas, paddle, lives.count, rightPressed, leftPressed)
    lives.upatedLife(updatedLives)

    ball.move()

    requestAnimationFrame(draw)
}

draw()