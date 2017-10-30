assert = require('chai').assert
Tile = require('../lib/Tile')
Tiled = require('../lib/Tiled')


describe 'Tiled', ->
  it 'get added to it\'s tile as an child', ->
    tile = new Tile()
    tiled = new Tiled()
    tiled.tile = tile

    assert.equal tiled.tile, tile
    assert.equal tile.children.length, 1
    assert.include tile.children, tiled


