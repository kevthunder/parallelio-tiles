(function() {
  var Tile, TileContainer, assert;

  assert = require('chai').assert;

  TileContainer = require('../lib/TileContainer');

  Tile = require('../lib/Tile');

  describe('TileContainer', function() {
    it('add a tile', function() {
      var container;
      container = new TileContainer();
      container.addTile(new Tile());
      return assert.equal(container.tiles.length, 1);
    });
    it('cant add a tile twice', function() {
      var container, tile;
      container = new TileContainer();
      tile = new Tile();
      container.addTile(tile);
      container.addTile(tile);
      return assert.equal(container.tiles.length, 1);
    });
    it('should create load a Matrix of tiles', function() {
      var container;
      container = new TileContainer();
      container.tap(function() {
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
      assert.isObject(container.getTile(1, 1));
      assert.equal(container, container.getTile(1, 1).container);
      assert.isFalse(container.getTile(0, 5).walkable);
      return assert.isTrue(container.getTile(7, 2).walkable);
    });
    return it('can chain addTile, loadMatrix and clearAll', function() {
      var container, res;
      container = new TileContainer();
      res = container.addTile(new Tile()).loadMatrix().clearAll();
      res;
      return assert.equal(container, res);
    });
  });

}).call(this);
