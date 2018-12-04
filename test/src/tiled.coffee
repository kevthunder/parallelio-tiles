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
    assert.include tile.children.toArray(), tiled

  it 'can choose a random tile to be put on', ->
    tiles = [new Tile(),new Tile(),new Tile()]

    tiled = new Tiled()
    tiled.putOnRandomTile(tiles)

    assert.include tiles, tiled.tile

  it 'cannot choose a random tile to be put on if none are valid', ->
    tiles = [new Tile(),new Tile(),new Tile()]

    tiled = new Tiled()
    tiled.canGoOnTile = (tile)->
        false

    tiled.putOnRandomTile(tiles)

    assert.notInclude tiles, tiled.tile
    assert.notExists tiled.tile

