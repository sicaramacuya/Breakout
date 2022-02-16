import Sprite from './Sprite.js'

class Brick extends Sprite {
    constructor (x = 0, y = 0, width = 75, heigh = 20, color = "#0095DD") {
        super(x, y, width, heigh, color);
        
        this.status = true;
    }
}

export default Brick