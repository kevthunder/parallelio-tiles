assert = require('chai').assert
TileReference = require('../lib/TileReference')
Tile = require('../lib/Tile')

describe 'TileReference', ->
  it 'get the x and y pos', ->
    tile = new Tile(1,1)
    ref = new TileReference(new TileReference(tile))


    assert.equal(ref.x, tile.x)
    assert.equal(ref.y, tile.y)

  it 'get the final tile', ->
    tile = new Tile(1,1)
    ref = new TileReference(new TileReference(tile))

    assert.equal(ref.getFinalTile(), tile)