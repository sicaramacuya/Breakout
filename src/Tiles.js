
import Sprite from './Sprite.js'
import Brick from './Brick.js'

class Tiles extends Sprite {
    constructor(x = 0, y = 0, width = 75, height = 20, 
        color = ["LightGreen", "Coral", "Crimson", "DeepSkyBlue", "Gold"], 
        rows = 3, columns = 5, padding = 10, offSetTop = 30, offSetLeft = 30, ) {
        super(x, y, width, height, color);

        this.rows = rows;
        this.columns = columns
        this.padding = padding;
        this.offSetTop = offSetTop;
        this.offSetLeft = offSetLeft;

        this.bricks = this.generateBricks()
    }

    generateBricks() {
        const bricks = []
        for (let column = 0; column < this.columns; column += 1) {
            bricks[column] = [];
            for (let row = 0; row < this.rows; row += 1) {
                bricks[column][row] = new Brick;
            }
        }

        return bricks
    }

    render(ctx) {
        for (let column = 0; column < this.columns; column += 1) {
            for (let row = 0; row < this.rows; row += 1) {
                if (this.bricks[column][row].status === true) {
                    const brickX = (column * (this.width + this.padding)) + this.offSetLeft;
                    const brickY = (row * (this.height + this.padding)) + this.offSetTop;
                    this.bricks[column][row].x = brickX;
                    this.bricks[column][row].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, this.width, this.height);
                    ctx.fillStyle = this.color[column];
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
}

export default Tiles