
const CoordHelper = require('./CoordHelper')

class Direction {
  constructor (name, x, y, inverseName) {
    this.name = name
    this.x = x
    this.y = y
    this.inverseName = inverseName
  }

  getInverse () {
    return this.constructor[this.inverseName]
  }

  rotate (angle) {
    const coord = CoordHelper.rotate(this, angle)
    return Direction.all.find((d) => {
      return d.x === coord.x && d.y === coord.y
    })
  }
}

Direction.up = new Direction('up', 0, -1, 'down')

Direction.down = new Direction('down', 0, 1, 'up')

Direction.left = new Direction('left', -1, 0, 'right')

Direction.right = new Direction('right', 1, 0, 'left')

Direction.adjacents = [Direction.up, Direction.down, Direction.left, Direction.right]

Direction.topLeft = new Direction('topLeft', -1, -1, 'bottomRight')

Direction.topRight = new Direction('topRight', 1, -1, 'bottomLeft')

Direction.bottomRight = new Direction('bottomRight', 1, 1, 'topLeft')

Direction.bottomLeft = new Direction('bottomLeft', -1, 1, 'topRight')

Direction.corners = [Direction.topLeft, Direction.topRight, Direction.bottomRight, Direction.bottomLeft]

Direction.all = [Direction.up, Direction.down, Direction.left, Direction.right, Direction.topLeft, Direction.topRight, Direction.bottomRight, Direction.bottomLeft]

module.exports = Direction
