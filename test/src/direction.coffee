assert = require('chai').assert
Tile = require('../lib/Direction')


describe 'Direction', ->
  it 'can get inverse direction', ->
    assert.equal Direction.up.getInverse(), Direction.down