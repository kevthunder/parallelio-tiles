(function() {
  var Tile, TileReference, assert;

  assert = require('chai').assert;

  TileReference = require('../lib/TileReference');

  Tile = require('../lib/Tile');

  describe('TileReference', function() {
    it('get the x and y pos', function() {
      var ref, tile;
      tile = new Tile(1, 1);
      ref = new TileReference(new TileReference(tile));
      assert.equal(ref.x, tile.x);
      return assert.equal(ref.y, tile.y);
    });
    return it('get the final tile', function() {
      var ref, tile;
      tile = new Tile(1, 1);
      ref = new TileReference(new TileReference(tile));
      return assert.equal(ref.getFinalTile(), tile);
    });
  });

}).call(this);
