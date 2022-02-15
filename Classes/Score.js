import Sprite from "./Sprite.js"

class Score extends Sprite {
    constructor(score = 0, x = 8, y = 20, color = "#0095DD", font = "16px Arial") {
        super(x, y);

        this.score = score;
        this.color = color;
        this.font = font;
    }

    update(points) {
        this.score += points
    }

    render(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(`Score: ${this.score}`, this.x, this.y);
    }
}

export default Score