(function () {
  var Direction, assert

  assert = require('chai').assert

  Direction = require('../lib/Direction')

  describe('Direction', function () {
    it('has coordinates', function () {
      assert.equal(Direction.up.x, 0)
      return assert.equal(Direction.up.y, -1)
    })
    return it('can get inverse direction', function () {
      return assert.equal(Direction.up.getInverse(), Direction.down)
    })
  })
}).call(this)
