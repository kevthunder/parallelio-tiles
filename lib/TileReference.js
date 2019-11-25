class TileReference {
  constructor (tile) {
    this.tile = tile
    Object.defineProperties(this, {
      x: {
        get: () => {
          return this.getFinalTile().x
        }
      },
      y: {
        get: () => {
          return this.getFinalTile().y
        }
      }
    })
  }

  getFinalTile () {
    return this.tile.getFinalTile()
  }
}
module.exports = TileReference
