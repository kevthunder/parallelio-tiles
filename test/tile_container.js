
const assert = require('chai').assert
const TileContainer = require('../lib/TileContainer')
const Tile = require('../lib/Tile')

describe('TileContainer', function () {
  it('add a tile', function () {
    var container
    container = new TileContainer()
    container.addTile(new Tile())
    assert.equal(container.tiles.length, 1)
  })
  it('cant add a tile twice', function () {
    var container, tile
    container = new TileContainer()
    tile = new Tile()
    container.addTile(tile)
    container.addTile(tile)
    assert.equal(container.tiles.length, 1)
  })
  it('can remove tile', function () {
    var container, tile
    container = new TileContainer()
    tile = new Tile()
    assert.equal(container.tiles.length, 0)
    container.addTile(tile)
    assert.equal(container.tiles.length, 1)
    container.removeTile(tile)
    assert.equal(container.tiles.length, 0)
  })
  it('can remove tile from coordinates', function () {
    var container, tile
    container = new TileContainer()
    tile = new Tile(1, 1)
    assert.equal(container.tiles.length, 0)
    container.addTile(tile)
    assert.equal(container.tiles.length, 1)
    container.removeTileAt(1, 1)
    assert.equal(container.tiles.length, 0)
  })
  it('calcul boundaries', function () {
    var container
    container = new TileContainer()
    assert.deepEqual(container.boundaries, {
      top: null,
      left: null,
      bottom: null,
      right: null
    })
    container.addTile(new Tile(1, 1))
    assert.deepEqual(container.boundaries, {
      top: 1,
      left: 1,
      bottom: 1,
      right: 1
    })
    container.addTile(new Tile(3, 1))
    assert.deepEqual(container.boundaries, {
      top: 1,
      left: 1,
      bottom: 1,
      right: 3
    })
    container.addTile(new Tile(-3, -3))
    assert.deepEqual(container.boundaries, {
      top: -3,
      left: -3,
      bottom: 1,
      right: 3
    })
    container.addTile(new Tile(2, 2))
    assert.deepEqual(container.boundaries, {
      top: -3,
      left: -3,
      bottom: 2,
      right: 3
    })
    container.removeTileAt(3, 1)
    assert.deepEqual(container.boundaries, {
      top: -3,
      left: -3,
      bottom: 2,
      right: 2
    })
  })
  it('can load a Matrix of tiles', function () {
    var container
    container = new TileContainer()
    container.tap(function () {
      var f, w
      w = function (opt) {
        return (new Tile(opt.x, opt.y)).tap(function () {
          this.walkable = false
        })
      }
      f = function (opt) {
        return (new Tile(opt.x, opt.y)).tap(function () {
          this.walkable = true
        })
      }
      return this.loadMatrix([
        [w, w, w, w, w, w, w, w, w, w, w, w],
        [w, f, f, w, f, f, f, f, f, f, f, w],
        [w, f, f, w, f, f, f, f, f, f, f, w],
        [w, f, f, w, w, f, w, w, w, f, f, w],
        [w, f, f, w, f, f, f, f, w, f, f, w],
        [w, f, f, w, f, f, f, f, w, f, f, w],
        [w, f, f, w, f, f, f, f, w, f, f, w],
        [w, w, w, w, w, w, w, w, w, w, w, w]
      ])
    })
    assert.isObject(container.getTile(1, 1))
    assert.equal(container, container.getTile(1, 1).container)
    assert.isFalse(container.getTile(0, 5).walkable)
    assert.isTrue(container.getTile(7, 2).walkable)
  })
  it('can load a Matrix at offset', function () {
    var container
    container = new TileContainer()
    container.tap(function () {
      var f, w
      w = function (opt) {
        return (new Tile(opt.x, opt.y)).tap(function () {
          this.walkable = false
        })
      }
      f = function (opt) {
        return (new Tile(opt.x, opt.y)).tap(function () {
          this.walkable = true
        })
      }
      return this.loadMatrix([
        [w, w, w, w, w, w],
        [w, f, f, w, f, w],
        [w, f, f, f, f, w],
        [w, f, f, w, f, w],
        [w, w, w, w, w, w]
      ], { x: 2, y: 2 })
    })
    assert.isUndefined(container.getTile(1, 1))
    assert.isObject(container.getTile(3, 3))
    assert.isFalse(container.getTile(2, 5).walkable)
    assert.isTrue(container.getTile(3, 3).walkable)
  })
  it('can reduce a matrix of functions', function () {
    const container = new TileContainer()
    const a = function (opt) {
      return (new Tile(opt.x, opt.y)).tap(function () {
        this.val = 1
      })
    }
    const b = function (opt) {
      return (new Tile(opt.x, opt.y)).tap(function () {
        this.val = 2
      })
    }
    container.loadMatrix([
      [a, b, a],
      [a, a, b],
      [a, b, b]
    ])

    const p = function (val, tile, pos) {
      return val + tile.val
    }
    const m = function (val, tile, pos) {
      return val - tile.val
    }
    const res = container.reduceMatrix([
      [p, p, m],
      [m, p, m],
      [m, p, m]
    ], 6)
    assert.equal(res, 5)
  })

  it('can chain addTile, loadMatrix and clearAll', function () {
    var container, res
    container = new TileContainer()
    res = container.addTile(new Tile()).loadMatrix().clearAll()
    assert.equal(container, res)
  })
  it('can get tile in a range', function () {
    var center, container, inRange
    container = new TileContainer()
    container.tap(function () {
      var t
      t = function (opt) {
        return (new Tile(opt.x, opt.y)).tap(function () {
          this.walkable = false
        })
      }
      return this.loadMatrix([[t, t, t, t, t, t, t], [t, t, t, t, t, t, t], [t, t, t, t, t, t, t], [t, t, t, t, t, t, t], [t, t, t, t, t, t, t], [t, t, t, t, t, t, t], [t, t, t, t, t, t, t]])
    })
    center = container.getTile(3, 3)
    inRange = container.inRange(center, 2)
    assert.include(inRange, container.getTile(2, 3))
    assert.notInclude(inRange, container.getTile(1, 3))
    assert.notInclude(inRange, container.getTile(0, 3))
    assert.equal(inRange.length, 5)
  })
  it('can find closest tile', function () {
    var container
    container = new TileContainer()
    container.tap(function () {
      var c, t
      t = function (opt) {
        return new Tile(opt.x, opt.y)
      }
      c = function (opt) {
        return (new Tile(opt.x, opt.y)).tap(function () {
          this.candidate = true
        })
      }
      return this.loadMatrix([[t, t, t, t, t, t, t], [t, c, t, c, t, t, t], [t, t, t, t, t, t, t], [t, t, c, t, t, t, t], [t, t, t, t, t, t, t], [t, t, t, t, t, t, t], [t, t, t, t, t, t, t]])
    })
    assert.equal(container.closest(container.getTile(6, 3), (tile) => {
      return tile.candidate
    }), container.getTile(3, 1))
    assert.equal(container.closest(container.getTile(4, 3), (tile) => {
      return tile.candidate
    }), container.getTile(2, 3))
    assert.equal(container.closest(container.getTile(0, 0), (tile) => {
      return tile.candidate
    }), container.getTile(1, 1))
  })
  it('can fail to find closest tile', function () {
    var container
    container = new TileContainer()
    container.tap(function () {
      var c, t
      t = function (opt) {
        return new Tile(opt.x, opt.y)
      }
      c = function (opt) {
        return (new Tile(opt.x, opt.y)).tap(function () {
          this.candidate = true
        })
      }
      return this.loadMatrix([[t, t], [t, c]])
    })
    assert.isNull(container.closest(container.getTile(0, 0), (tile) => {
      return false
    }), container.getTile(1, 1))
  })
  it('can merge with another container', function () {
    var container1, container2, merged
    container1 = new TileContainer()
    container1.addTile(new Tile(1, 1))
    container2 = new TileContainer()
    container2.addTile(new Tile(2, 2))
    merged = container1.merge(container2, (a, b) => {
      return a || b
    })
    assert.exists(merged.getTile(1, 1))
    assert.exists(merged.getTile(2, 2))
  })
  return it('can merge with another container (intersection)', function () {
    var container1, container2, merged
    container1 = new TileContainer()
    container1.addTile(new Tile(1, 1))
    container1.addTile(new Tile(2, 2))
    container2 = new TileContainer()
    container2.addTile(new Tile(2, 2))
    container2.addTile(new Tile(3, 3))
    merged = container1.merge(container2, (a, b) => {
      return a && b
    })
    assert.notExists(merged.getTile(1, 1))
    assert.exists(merged.getTile(2, 2))
    assert.notExists(merged.getTile(3, 3))
  })
})
