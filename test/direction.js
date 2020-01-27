
const assert = require('chai').assert
const Direction = require('../lib/Direction')

describe('Direction', function () {
  it('has coordinates', function () {
    assert.equal(Direction.up.x, 0)
    assert.equal(Direction.up.y, -1)
    assert.equal(Direction.right.angle, Math.PI / 2)
  })
  it('can get inverse direction', function () {
    assert.equal(Direction.up.getInverse(), Direction.down)
  })
  it('can rotate direction', function () {
    assert.equal(Direction.up.rotate(Math.PI / 2), Direction.right)
    assert.equal(Direction.up.rotate(Math.PI), Direction.down)
    assert.equal(Direction.up.rotate(Math.PI / 2 * 3), Direction.left)
    assert.equal(Direction.right.rotate(Math.PI / 2), Direction.down)
  })
})
