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
    assert.include tile.children.toArray(), child

  it 'can calcul the distance to a tile', ->
    tile1 = new Tile(1,1)
    tile2 = new Tile(4,5)
    assert.deepEqual tile1.dist(tile2), {x:3,y:4,length:5}
    assert.deepEqual tile2.dist(tile1), {x:-3,y:-4,length:5}

  it 'return null for distance if there is no coordinates', ->
    tile1 = new Tile(1,1)
    tile2 = new Tile()
    assert.isNull tile1.dist(tile2)
    assert.isNull tile2.dist(tile1)

  it 'can calcul the distance to a tile in a different container', ->
    container1 = generateMap()
    container1.dist = -> {x:30,y:40,length:50}
    tile1 = container1.getTile(1,1)
    container2 = generateMap()
    container2.dist = -> {x:-30,y:-40,length:50}
    tile2 = container2.getTile(1,1)
    assert.deepEqual tile1.dist(tile2), {x:30,y:40,length:50}
    assert.deepEqual tile2.dist(tile1), {x:-30,y:-40,length:50}

  it 'cant add a children twice', ->
    tile = new Tile()
    child = {}
    tile.addChild(child)
    tile.addChild(child)

    assert.equal child.tile, tile
    assert.equal tile.children.length, 1
    assert.include tile.children.toArray(), child

  it "can find it's adjacent tiles", ->
    container = generateMap()
    assert.include container.getTile(1,1).adjacentTiles.toArray(), container.getTile(0,1)
    assert.include container.getTile(1,1).adjacentTiles.toArray(), container.getTile(2,1)
    assert.include container.getTile(1,1).adjacentTiles.toArray(), container.getTile(1,0)
    assert.include container.getTile(1,1).adjacentTiles.toArray(), container.getTile(1,2)



