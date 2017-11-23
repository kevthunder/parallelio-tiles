(function() {
  var Tile, TileContainer, assert, generateMap;

  assert = require('chai').assert;

  TileContainer = require('../lib/TileContainer');

  Tile = require('../lib/Tile');

  generateMap = function() {
    var container;
    container = new TileContainer();
    return container.tap(function() {
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
  };

  describe('Tile', function() {
    it('can get a Tile by relative position', function() {
      var container, tile;
      container = generateMap();
      tile = container.getTile(1, 1);
      return assert.equal(tile.getRelativeTile(1, 1), container.getTile(2, 2));
    });
    it('can add a children', function() {
      var child, tile;
      tile = new Tile();
      child = {};
      tile.addChild(child);
      assert.equal(child.tile, tile);
      return assert.include(tile.children, child);
    });
    it('can calcul the distance to a tile', function() {
      var tile1, tile2;
      tile1 = new Tile(1, 1);
      tile2 = new Tile(4, 5);
      assert.deepEqual(tile1.dist(tile2), {
        x: 3,
        y: 4,
        length: 5
      });
      return assert.deepEqual(tile2.dist(tile1), {
        x: -3,
        y: -4,
        length: 5
      });
    });
    it('return null for distance if there is no coordinates', function() {
      var tile1, tile2;
      tile1 = new Tile(1, 1);
      tile2 = new Tile();
      assert.isNull(tile1.dist(tile2));
      return assert.isNull(tile2.dist(tile1));
    });
    it('can calcul the distance to a tile in a different container', function() {
      var container1, container2, tile1, tile2;
      container1 = generateMap();
      container1.dist = function() {
        return {
          x: 30,
          y: 40,
          length: 50
        };
      };
      tile1 = container1.getTile(1, 1);
      container2 = generateMap();
      container2.dist = function() {
        return {
          x: -30,
          y: -40,
          length: 50
        };
      };
      tile2 = container2.getTile(1, 1);
      assert.deepEqual(tile1.dist(tile2), {
        x: 30,
        y: 40,
        length: 50
      });
      return assert.deepEqual(tile2.dist(tile1), {
        x: -30,
        y: -40,
        length: 50
      });
    });
    return it('cant add a children twice', function() {
      var child, tile;
      tile = new Tile();
      child = {};
      tile.addChild(child);
      tile.addChild(child);
      assert.equal(child.tile, tile);
      assert.equal(tile.children.length, 1);
      return assert.include(tile.children, child);
    });
  });

}).call(this);
