const Element = require('spark-starter').Element

class Tiled extends Element {
  putOnRandomTile (tiles) {
    var found
    found = this.getRandomValidTile(tiles)
    if (found) {
      this.tile = found
    }
  }

  getRandomValidTile (tiles, validator = this.canGoOnTile.bind(this)) {
    var candidate, pos, remaining
    remaining = tiles.slice()
    while (remaining.length > 0) {
      pos = Math.floor(Math.random() * remaining.length)
      candidate = remaining.splice(pos, 1)[0]
      if (validator(candidate)) {
        return candidate
      }
    }
    return null
  }

  canGoOnTile (tile) {
    return true
  }

  getFinalTile () {
    return this.tile.getFinalTile()
  }
};

Tiled.properties({
  tile: {
    change: function (val, old) {
      if (old != null) {
        old.removeChild(this)
      }
      if (this.tile) {
        return this.tile.addChild(this)
      }
    }
  },
  offsetX: {
    default: 0
  },
  offsetY: {
    default: 0
  }
})

module.exports = Tiled
