assert = require('chai').assert
Tile = require('../lib/Direction')


describe 'Direction', ->
  it 'has coordinates', ->
    assert.equal Direction.up.x, 0
    assert.equal Direction.up.y, -1
  it 'can get inverse direction', ->
    assert.equal Direction.up.getInverse(), Direction.down