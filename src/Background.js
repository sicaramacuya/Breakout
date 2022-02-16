import Sprite from './Sprite.js'

class Background extends Sprite {
    constructor(width, height, color, x = 0, y = 0) {
        super(x, y, width, height, color)
    }
}

export default Background