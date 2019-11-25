
const assert = require('chai').assert
const TileReference = require('../lib/TileReference')
const Tile = require('../lib/Tile')

describe('TileReference', function () {
  it('get the x and y pos', function () {
    var ref, tile
    tile = new Tile(1, 1)
    ref = new TileReference(new TileReference(tile))
    assert.equal(ref.x, tile.x)
    assert.equal(ref.y, tile.y)
  })
  return it('get the final tile', function () {
    var ref, tile
    tile = new Tile(1, 1)
    ref = new TileReference(new TileReference(tile))
    assert.equal(ref.getFinalTile(), tile)
  })
})
