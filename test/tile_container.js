(function() {
  var Tile, TileContainer, assert;

  assert = require('chai').assert;

  TileContainer = require('../lib/TileContainer');

  Tile = require('../lib/Tile');

  describe('TileContainer', function() {
    return it('should create load a Matrix of tiles', function() {
      this.container = new TileContainer();
      this.container.tap(function() {
        var f, w;
        w = function(opt) {
          return (new Tile(opt.x, opt.y)).tap(function() {
            return this.walkable = false;
          });
        };
        f = function(opt) {
          return (new Tile(opt.x, opt.y)).tap(function() {
            return this.walkable = true;
          });
        };
        return this.loadMatrix([[w, w, w, w, w, w, w, w, w, w, w, w], [w, f, f, w, f, f, f, f, f, f, f, w], [w, f, f, w, f, f, f, f, f, f, f, w], [w, f, f, w, w, f, w, w, w, f, f, w], [w, f, f, w, f, f, f, f, w, f, f, w], [w, f, f, w, f, f, f, f, w, f, f, w], [w, f, f, w, f, f, f, f, w, f, f, w], [w, w, w, w, w, w, w, w, w, w, w, w]]);
      });
      assert.isObject(this.container.getTile(1, 1));
      assert.equal(this.container, this.container.getTile(1, 1).container);
      assert.isFalse(this.container.getTile(0, 5).walkable);
      return assert.isTrue(this.container.getTile(7, 2).walkable);
    });
  });

}).call(this);
