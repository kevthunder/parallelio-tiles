assert = require('chai').assert
TileContainer = require('../lib/TileContainer')
Tile = require('../lib/Tile')


describe 'TileContainer', ->
  it 'add a tile', ->
    container = new TileContainer()
    container.addTile(new Tile())
    assert.equal container.tiles.length, 1

  it 'cant add a tile twice', ->
    container = new TileContainer()
    tile = new Tile()
    container.addTile(tile)
    container.addTile(tile)
    assert.equal container.tiles.length, 1

  it 'should create load a Matrix of tiles', ->
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
    assert.isObject container.getTile(1,1)
    assert.equal container, container.getTile(1,1).container
    assert.isFalse container.getTile(0,5).walkable
    assert.isTrue container.getTile(7,2).walkable


    

  it 'can chain addTile, loadMatrix and clearAll', ->
    container = new TileContainer()
    res = container.addTile(new Tile())
      .loadMatrix()
      .clearAll()

    res
    assert.equal container, res
