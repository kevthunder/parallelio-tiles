assert = require('chai').assert
TileContainer = require('../lib/TileContainer')
Tile = require('../lib/Tile')

generateMap = ->
  container = new TileContainer()
  container.tap ->
    w = (opt) ->
      (new Tile(opt.x,opt.y)).tap ->
        @walkable = false
    f = (opt) ->
      (new Tile(opt.x,opt.y)).tap ->
        @walkable = true
    @loadMatrix([
      [w, w, w, w, w, w, w, w, w, w, w, w],
      [w, f, f, w, f, f, f, f, f, f, f, w],
      [w, f, f, w, f, f, f, f, f, f, f, w],
      [w, f, f, w, w, f, w, w, w, f, f, w],
      [w, f, f, w, f, f, f, f, w, f, f, w],
      [w, f, f, w, f, f, f, f, w, f, f, w],
      [w, f, f, w, f, f, f, f, w, f, f, w],
      [w, w, w, w, w, w, w, w, w, w, w, w],
    ]);

describe 'Tile', ->
  it 'can get a Tile by relative position', ->
    container = generateMap()
    tile = container.getTile(1,1)
    assert.equal tile.getRelativeTile(1,1), container.getTile(2,2)
  it 'can add a children', ->
    tile = new Tile()
    child = {}
    tile.addChild(child)

    assert.equal child.tile, tile
    assert.include tile.children, child
  it 'cant add a children twice', ->
    tile = new Tile()
    child = {}
    tile.addChild(child)
    tile.addChild(child)

    assert.equal child.tile, tile
    assert.equal tile.children.length, 1
    assert.include tile.children, child

