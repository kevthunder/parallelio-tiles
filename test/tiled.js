(function() {
  var Tile, Tiled, assert;

  assert = require('chai').assert;

  Tile = require('../lib/Tile');

  Tiled = require('../lib/Tiled');

  describe('Tiled', function() {
    return it('get added to it\'s tile as an child', function() {
      var tile, tiled;
      tile = new Tile();
      tiled = new Tiled();
      tiled.tile = tile;
      assert.equal(tiled.tile, tile);
      assert.equal(tile.children.length, 1);
      return assert.include(tile.children, tiled);
    });
  });

}).call(this);
