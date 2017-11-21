(function() {
  var Tile, assert;

  assert = require('chai').assert;

  Tile = require('../lib/Direction');

  describe('Direction', function() {
    return it('can get inverse direction', function() {
      return assert.equal(Direction.up.getInverse(), Direction.down);
    });
  });

}).call(this);
