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
