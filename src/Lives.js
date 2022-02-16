import Sprite from "./Sprite.js";

class Lives extends Sprite {
    constructor(x, y = 20, count = 3, color = "#0095DD", font = "16px Arial") {
        super(x, y, 0, 0, color)

        this.count = count
        this.font = font
    }

    upatedLife(count) {
        this.count = count
    }

    render(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(`Lives: ${this.count}`, this.x, this.y);
    }
}

export default Lives