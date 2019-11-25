
const assert = require('chai').assert
const Tile = require('../lib/Tile')
const Tiled = require('../lib/Tiled')

describe('Tiled', function () {
  it('get added to it\'s tile as an child', function () {
    var tile, tiled
    tile = new Tile()
    tiled = new Tiled()
    tiled.tile = tile
    assert.equal(tiled.tile, tile)
    assert.equal(tile.children.length, 1)
    assert.include(tile.children.toArray(), tiled)
  })
  it('can choose a random tile to be put on', function () {
    var tiled, tiles
    tiles = [new Tile(), new Tile(), new Tile()]
    tiled = new Tiled()
    tiled.putOnRandomTile(tiles)
    assert.include(tiles, tiled.tile)
  })
  return it('cannot choose a random tile to be put on if none are valid', function () {
    var tiled, tiles
    tiles = [new Tile(), new Tile(), new Tile()]
    tiled = new Tiled()
    tiled.canGoOnTile = function (tile) {
      return false
    }
    tiled.putOnRandomTile(tiles)
    assert.notInclude(tiles, tiled.tile)
    assert.notExists(tiled.tile)
  })
})
