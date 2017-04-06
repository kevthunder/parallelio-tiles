assert = require('chai').assert
TileContainer = require('../lib/TileContainer')
Tile = require('../lib/Tile')

describe 'TileContainer', ->
  it 'should create load a Matrix of tiles', ->
    @container = new TileContainer()
    @container.tap ->
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
    assert.isObject @container.getTile(1,1)
    assert.equal @container, @container.getTile(1,1).container
    assert.isFalse @container.getTile(0,5).walkable
    assert.isTrue @container.getTile(7,2).walkable
    