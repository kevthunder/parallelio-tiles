const Element = require('spark-starter').Element
const Direction = require('./Direction')

class Tile extends Element {
  constructor (xOrOptions, y = 0) {
    let opt = xOrOptions
    if (typeof xOrOptions !== 'object') {
      opt = { x: xOrOptions, y: y }
    }
    super(opt)
    this.x = opt.x
    this.y = opt.y
  }

  getRelativeTile (x, y) {
    if (x === 0 && y === 0) {
      return this
    }
    if (this.container != null) {
      return this.container.getTile(this.x + x, this.y + y)
    }
  }

  findDirectionOf (tile) {
    if (tile.tile) {
      tile = tile.tile
    }
    if ((tile.x != null) && (tile.y != null)) {
      return Direction.all.find((d) => {
        return d.x === tile.x - this.x && d.y === tile.y - this.y
      })
    }
  }

  addChild (child, checkRef = true) {
    var index
    index = this.children.indexOf(child)
    if (index === -1) {
      this.children.push(child)
    }
    if (checkRef) {
      child.tile = this
    }
    return child
  }

  removeChild (child, checkRef = true) {
    var index
    index = this.children.indexOf(child)
    if (index > -1) {
      this.children.splice(index, 1)
    }
    if (checkRef && child.tile === this) {
      child.tile = null
    }
  }

  dist (tile) {
    var ctnDist, ref, x, y
    if ((tile != null ? tile.getFinalTile : null) != null) {
      tile = tile.getFinalTile()
    }
    if (((tile != null ? tile.x : null) != null) && (tile.y != null) && (this.x != null) && (this.y != null) && (this.container === tile.container || (ctnDist = (ref = this.container) != null ? typeof ref.dist === 'function' ? ref.dist(tile.container) : null : null))) {
      x = tile.x - this.x
      y = tile.y - this.y
      if (ctnDist) {
        x += ctnDist.x
        y += ctnDist.y
      }
      return {
        x: x,
        y: y,
        length: Math.sqrt(x * x + y * y)
      }
    } else {
      return null
    }
  }

  /**
   * @param {number} angle
   * @param {{x: number, y: number}} origin
   * @returns {this}
   */
  copyAndRotate (angle, origin = { x: 0, y: 0 }) {
    const TileClass = this.constructor
    const data = this.propertiesManager.getManualDataProperties()
    const recenterX = this.x - origin.x
    const recenterY = this.y - origin.y
    data.x = Math.round(Math.cos(angle) * recenterX - Math.sin(angle) * recenterY) + origin.x + 0
    data.y = Math.round(Math.sin(angle) * recenterX + Math.cos(angle) * recenterY) + origin.y + 0
    return new TileClass(data)
  }

  getFinalTile () {
    return this
  }

  getCoord () {
    return { x: this.x, y: this.y }
  }
};

Tile.properties({
  children: {
    collection: true
  },
  container: {
    change: function () {
      if (this.container != null) {
        return this.adjacentTiles.forEach(function (tile) {
          return tile.adjacentTilesProperty.invalidate()
        })
      }
    }
  },
  adjacentTiles: {
    calcul: function (invalidation) {
      if (invalidation.prop(this.containerProperty)) {
        return Direction.adjacents.map((d) => {
          return this.getRelativeTile(d.x, d.y)
        }).filter((t) => {
          return t != null
        })
      }
    },
    collection: true
  }
})

module.exports = Tile
