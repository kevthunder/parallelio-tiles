(function () {
  var Direction, Tile, TileContainer, Tiled, assert, generateMap

  assert = require('chai').assert

  TileContainer = require('../lib/TileContainer')

  Tile = require('../lib/Tile')

  Tiled = require('../lib/Tiled')

  Direction = require('../lib/Direction')

  generateMap = function () {
    var container
    container = new TileContainer()
    return container.tap(function () {
      var f, w
      w = function (opt) {
        return (new Tile(opt.x, opt.y)).tap(function () {
          return this.walkable = false
        })
      }
      f = function (opt) {
        return (new Tile(opt.x, opt.y)).tap(function () {
          return this.walkable = true
        })
      }
      return this.loadMatrix([[w, w, w, w, w, w, w, w, w, w, w, w], [w, f, f, w, f, f, f, f, f, f, f, w], [w, f, f, w, f, f, f, f, f, f, f, w], [w, f, f, w, w, f, w, w, w, f, f, w], [w, f, f, w, f, f, f, f, w, f, f, w], [w, f, f, w, f, f, f, f, w, f, f, w], [w, f, f, w, f, f, f, f, w, f, f, w], [w, w, w, w, w, w, w, w, w, w, w, w]])
    })
  }

  describe('Tile', function () {
    it('can add a children', function () {
      var child, tile
      tile = new Tile()
      child = {}
      tile.addChild(child)
      assert.equal(child.tile, tile)
      return assert.include(tile.children.toArray(), child)
    })
    it('can get a Tile by relative position', function () {
      var container, tile
      container = generateMap()
      tile = container.getTile(1, 1)
      return assert.equal(tile.getRelativeTile(1, 1), container.getTile(2, 2))
    })
    it('require a container to get a Tile by relative position', function () {
      var tile
      tile = new Tile()
      return assert.notExists(tile.getRelativeTile(1, 1))
    })
    it('return itself when getting Tile by relative position with (0, 0)', function () {
      var tile
      tile = new Tile()
      return assert.equal(tile.getRelativeTile(0, 0), tile)
    })
    it('can calcul the distance to a tile', function () {
      var tile1, tile2
      tile1 = new Tile(1, 1)
      tile2 = new Tile(4, 5)
      assert.deepEqual(tile1.dist(tile2), {
        x: 3,
        y: 4,
        length: 5
      })
      return assert.deepEqual(tile2.dist(tile1), {
        x: -3,
        y: -4,
        length: 5
      })
    })
    it('return null for distance if there is no coordinates', function () {
      var tile1, tile2
      tile1 = new Tile(1, 1)
      tile2 = new Tile()
      assert.isNull(tile1.dist(tile2))
      return assert.isNull(tile2.dist(tile1))
    })
    it('can calcul the distance to a tile in a different container', function () {
      var container1, container2, tile1, tile2
      container1 = generateMap()
      container1.dist = function () {
        return {
          x: 30,
          y: 40,
          length: 50
        }
      }
      tile1 = container1.getTile(1, 1)
      container2 = generateMap()
      container2.dist = function () {
        return {
          x: -30,
          y: -40,
          length: 50
        }
      }
      tile2 = container2.getTile(1, 1)
      assert.deepEqual(tile1.dist(tile2), {
        x: 30,
        y: 40,
        length: 50
      })
      return assert.deepEqual(tile2.dist(tile1), {
        x: -30,
        y: -40,
        length: 50
      })
    })
    it('cant add a children twice', function () {
      var child, tile
      tile = new Tile()
      child = {}
      tile.addChild(child)
      tile.addChild(child)
      assert.equal(child.tile, tile)
      assert.equal(tile.children.length, 1)
      return assert.include(tile.children.toArray(), child)
    })
    it("can find it's adjacent tiles", function () {
      var container
      container = generateMap()
      assert.include(container.getTile(1, 1).adjacentTiles.toArray(), container.getTile(0, 1))
      assert.include(container.getTile(1, 1).adjacentTiles.toArray(), container.getTile(2, 1))
      assert.include(container.getTile(1, 1).adjacentTiles.toArray(), container.getTile(1, 0))
      return assert.include(container.getTile(1, 1).adjacentTiles.toArray(), container.getTile(1, 2))
    })
    it('can find direction of a Tile', function () {
      var tile1, tile2
      tile1 = new Tile(1, 1)
      tile2 = new Tile(1, 2)
      return assert.equal(tile1.findDirectionOf(tile2), Direction.down)
    })
    return it('can find direction of a tiled Object', function () {
      var tile1, tile2, tiled
      tile1 = new Tile(1, 1)
      tile2 = new Tile(1, 0)
      tiled = new Tiled().tap(function () {
        return this.tile = tile2
      })
      return assert.equal(tile1.findDirectionOf(tiled), Direction.up)
    })
  })
}).call(this)
