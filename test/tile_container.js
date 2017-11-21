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
    it('can chain addTile, loadMatrix and clearAll', function() {
      var container, res;
      container = new TileContainer();
      res = container.addTile(new Tile()).loadMatrix().clearAll();
      res;
      return assert.equal(container, res);
    });
    return it('can get tile in a range', function() {
      var center, container, inRange;
      container = new TileContainer();
      container.tap(function() {
        var t;
        t = function(opt) {
          return (new Tile(opt.x, opt.y)).tap(function() {
            return this.walkable = false;
          });
        };
        return this.loadMatrix([[t, t, t, t, t, t, t], [t, t, t, t, t, t, t], [t, t, t, t, t, t, t], [t, t, t, t, t, t, t], [t, t, t, t, t, t, t], [t, t, t, t, t, t, t], [t, t, t, t, t, t, t]]);
      });
      center = container.getTile(3, 3);
      inRange = container.inRange(center, 2);
      assert.include(inRange, container.getTile(2, 3));
      assert.notInclude(inRange, container.getTile(1, 3));
      assert.notInclude(inRange, container.getTile(0, 3));
      return assert.equal(inRange.length, 5);
    });
  });

}).call(this);
