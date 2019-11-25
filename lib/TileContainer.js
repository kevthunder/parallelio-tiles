const Element = require('spark-starter').Element
const TileReference = require('./TileReference')

class TileContainer extends Element {
  constructor () {
    super()
    this.init()
  }

  _addToBondaries (tile, boundaries) {
    if ((boundaries.top == null) || tile.y < boundaries.top) {
      boundaries.top = tile.y
    }
    if ((boundaries.left == null) || tile.x < boundaries.left) {
      boundaries.left = tile.x
    }
    if ((boundaries.bottom == null) || tile.y > boundaries.bottom) {
      boundaries.bottom = tile.y
    }
    if ((boundaries.right == null) || tile.x > boundaries.right) {
      boundaries.right = tile.x
    }
  }

  init () {
    this.coords = {}
    this.tiles = []
  }

  addTile (tile) {
    if (!this.tiles.includes(tile)) {
      this.tiles.push(tile)
      if (this.coords[tile.x] == null) {
        this.coords[tile.x] = {}
      }
      this.coords[tile.x][tile.y] = tile
      if (this.owner) {
        tile.container = this
      }
      if (this.boundariesProperty.getter.calculated) {
        this._addToBondaries(tile, this.boundariesProperty.value)
      }
    }
    return this
  }

  removeTile (tile) {
    var index
    index = this.tiles.indexOf(tile)
    if (index > -1) {
      this.tiles.splice(index, 1)
      delete this.coords[tile.x][tile.y]
      if (this.owner) {
        tile.container = null
      }
      if (this.boundariesProperty.getter.calculated) {
        if (this.boundaries.top === tile.y || this.boundaries.bottom === tile.y || this.boundaries.left === tile.x || this.boundaries.right === tile.x) {
          return this.boundariesProperty.invalidate()
        }
      }
    }
  }

  removeTileAt (x, y) {
    const tile = this.getTile(x, y)
    if (tile) {
      return this.removeTile(tile)
    }
  }

  getTile (x, y) {
    var ref
    if (((ref = this.coords[x]) != null ? ref[y] : null) != null) {
      return this.coords[x][y]
    }
  }

  loadMatrix (matrix) {
    var options, row, tile, x, y
    for (y in matrix) {
      row = matrix[y]
      for (x in row) {
        tile = row[x]
        options = {
          x: parseInt(x),
          y: parseInt(y)
        }
        if (typeof tile === 'function') {
          this.addTile(tile(options))
        } else {
          tile.x = options.x
          tile.y = options.y
          this.addTile(tile)
        }
      }
    }
    return this
  }

  inRange (tile, range) {
    var found, i, j, ref, ref1, ref2, ref3, tiles, x, y
    tiles = []
    range--
    for (x = i = ref = tile.x - range, ref1 = tile.x + range; (ref <= ref1 ? i <= ref1 : i >= ref1); x = ref <= ref1 ? ++i : --i) {
      for (y = j = ref2 = tile.y - range, ref3 = tile.y + range; (ref2 <= ref3 ? j <= ref3 : j >= ref3); y = ref2 <= ref3 ? ++j : --j) {
        if (Math.sqrt((x - tile.x) * (x - tile.x) + (y - tile.y) * (y - tile.y)) <= range && ((found = this.getTile(x, y)) != null)) {
          tiles.push(found)
        }
      }
    }
    return tiles
  }

  allTiles () {
    return this.tiles.slice()
  }

  clearAll () {
    var i, len, ref, tile
    if (this.owner) {
      ref = this.tiles
      for (i = 0, len = ref.length; i < len; i++) {
        tile = ref[i]
        tile.container = null
      }
    }
    this.coords = {}
    this.tiles = []
    return this
  }

  closest (originTile, filter) {
    var candidates, getScore
    getScore = function (candidate) {
      if (candidate.score == null) {
        candidate.score = candidate.getFinalTile().dist(originTile).length
      }
      return candidate.score
    }
    candidates = this.tiles.filter(filter).map((t) => {
      return new TileReference(t)
    })
    candidates.sort((a, b) => {
      return getScore(a) - getScore(b)
    })
    if (candidates.length > 0) {
      return candidates[0].tile
    } else {
      return null
    }
  }

  copy () {
    var out
    out = new TileContainer()
    out.coords = this.coords
    out.tiles = this.tiles
    out.owner = false
    return out
  }

  merge (ctn, mergeFn, asOwner = false) {
    var out, tmp
    out = new TileContainer()
    out.owner = asOwner
    tmp = ctn.copy()
    this.tiles.forEach(function (tileA) {
      var mergedTile, tileB
      tileB = tmp.getTile(tileA.x, tileA.y)
      if (tileB) {
        tmp.removeTile(tileB)
      }
      mergedTile = mergeFn(tileA, tileB)
      if (mergedTile) {
        return out.addTile(mergedTile)
      }
    })
    tmp.tiles.forEach(function (tileB) {
      var mergedTile
      mergedTile = mergeFn(null, tileB)
      if (mergedTile) {
        return out.addTile(mergedTile)
      }
    })
    return out
  }
};

TileContainer.properties({
  owner: {
    default: true
  },
  boundaries: {
    calcul: function () {
      var boundaries
      boundaries = {
        top: null,
        left: null,
        bottom: null,
        right: null
      }
      this.tiles.forEach((tile) => {
        return this._addToBondaries(tile, boundaries)
      })
      return boundaries
    },
    output: function (val) {
      return Object.assign({}, val)
    }
  }
})

module.exports = TileContainer
