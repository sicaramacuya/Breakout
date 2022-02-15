/* global document, alert */

import Sprite from './Sprite.js'

class Ball extends Sprite {
    constructor(x = 0, y = 0, radius = 10, color = "Red") {
      super(x, y, 0, 0, color)

      this.radius = radius;
      this.dx = 2
      this.dy = -2
    }
  
    move() {
      this.x += this.dx
      this.y += this.dy
    }

    calculateNextPosition(canvas, paddle, lives, rightPressed, leftPressed) {
        let livesUpdated = lives

        // ball bouncing off the left and right
        if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx *= -1;
        }
        // ball bouncing off the top and bottom
        if (this.y + this.dy < this.radius) {
            this.dy *= -1;
        } else if ( this.y + this.dy > canvas.height - this.radius) {

            if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
                this.dy *= -1
            } else {
                livesUpdated -= 1;
                if(!livesUpdated) {
                    // eslint-disable-next-line no-alert
                    alert("GAME OVER");
                    document.location.reload();
                } else {
                    this.x = canvas.width / 2;
                    this.y = canvas.height - 30;
                    this.dx = 3;
                    this.dy = -3;
                    // eslint-disable-next-line no-param-reassign
                    paddle.x = (canvas.width - paddle.width) / 2;
                }
            }
        }

        if(rightPressed) {
            // eslint-disable-next-line no-param-reassign
            paddle.x += 7;
            if (paddle.x + paddle.width > canvas.width){
                // eslint-disable-next-line no-param-reassign
                paddle.x = canvas.width - paddle.width;
            }
        }
        else if(leftPressed) {
            // eslint-disable-next-line no-param-reassign
            paddle.x -= 7;
            if (paddle.x < 0) {
                // eslint-disable-next-line no-param-reassign
                paddle.x = 0;
            }
        }

        return livesUpdated
    }
  
    render(ctx) { // Overrides the existing render method!
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
}

export default Ball