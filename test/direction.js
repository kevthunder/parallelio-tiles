
const assert = require('chai').assert
const Direction = require('../lib/Direction')

describe('Direction', function () {
  it('has coordinates', function () {
    assert.equal(Direction.up.x, 0)
    assert.equal(Direction.up.y, -1)
  })
  return it('can get inverse direction', function () {
    assert.equal(Direction.up.getInverse(), Direction.down)
  })
})
