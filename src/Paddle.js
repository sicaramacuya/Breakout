import Brick from './Brick.js'

class Paddle extends Brick {
    constructor (x = 0, y = 0, width = 75, heigh = 10, color = "#0095DD") {
        super(x, y, width, heigh, color)
    }
}

export default Paddle