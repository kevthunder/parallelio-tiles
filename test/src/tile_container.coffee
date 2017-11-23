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

  it 'can remove tile', ->
    container = new TileContainer()
    tile = new Tile()
    assert.equal container.tiles.length, 0
    container.addTile(tile)
    assert.equal container.tiles.length, 1
    container.removeTile(tile)
    assert.equal container.tiles.length, 0

  it 'can remove tile from coordinates', ->
    container = new TileContainer()
    tile = new Tile(1,1)
    assert.equal container.tiles.length, 0
    container.addTile(tile)
    assert.equal container.tiles.length, 1
    container.removeTileAt(1,1)
    assert.equal container.tiles.length, 0


  it 'calcul boundaries', ->
    container = new TileContainer()
    assert.deepEqual container.boundaries, {top:null,left:null,bottom:null,right:null}
    container.addTile(new Tile(1,1))
    assert.deepEqual container.boundaries, {top:1,left:1,bottom:1,right:1}
    container.addTile(new Tile(3,1))
    assert.deepEqual container.boundaries, {top:1,left:1,bottom:1,right:3}
    container.addTile(new Tile(-3,-3))
    assert.deepEqual container.boundaries, {top:-3,left:-3,bottom:1,right:3}
    container.addTile(new Tile(2,2))
    assert.deepEqual container.boundaries, {top:-3,left:-3,bottom:2,right:3}
    container.removeTileAt(3,1)
    assert.deepEqual container.boundaries, {top:-3,left:-3,bottom:2,right:2}


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

  it 'can get tile in a range', ->
    container = new TileContainer()
    container.tap ->
      t = (opt) ->
        (new Tile(opt.x,opt.y)).tap ->
          @walkable = false
      @loadMatrix([
        [t, t, t, t, t, t, t],
        [t, t, t, t, t, t, t],
        [t, t, t, t, t, t, t],
        [t, t, t, t, t, t, t],
        [t, t, t, t, t, t, t],
        [t, t, t, t, t, t, t],
        [t, t, t, t, t, t, t]
      ]);
    center = container.getTile(3,3)
    inRange = container.inRange(center,2)
    assert.include inRange, container.getTile(2,3)
    assert.notInclude inRange, container.getTile(1,3)
    assert.notInclude inRange, container.getTile(0,3)
    assert.equal inRange.length, 5