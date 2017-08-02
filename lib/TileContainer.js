(function() {
  var Element, TileContainer, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Element = ((ref = this.Spark) != null ? ref.Element : void 0) || require('spark-starter').Element;

  TileContainer = (function(superClass) {
    extend(TileContainer, superClass);

    function TileContainer() {
      this.init();
    }

    TileContainer.prototype.init = function() {
      this.coords = {};
      return this.tiles = [];
    };

    TileContainer.prototype.addTile = function(tile) {
      this.tiles.push(tile);
      if (this.coords[tile.x] == null) {
        this.coords[tile.x] = {};
      }
      this.coords[tile.x][tile.y] = tile;
      return tile.container = this;
    };

    TileContainer.prototype.getTile = function(x, y) {
      var ref1;
      if (((ref1 = this.coords[x]) != null ? ref1[y] : void 0) != null) {
        return this.coords[x][y];
      }
    };

    TileContainer.prototype.loadMatrix = function(matrix) {
      var options, results, row, tile, x, y;
      results = [];
      for (y in matrix) {
        row = matrix[y];
        results.push((function() {
          var results1;
          results1 = [];
          for (x in row) {
            tile = row[x];
            options = {
              x: parseInt(x),
              y: parseInt(y)
            };
            if (typeof tile === "function") {
              results1.push(this.addTile(tile(options)));
            } else {
              tile.x = options.x;
              tile.y = options.y;
              results1.push(this.addTile(tile));
            }
          }
          return results1;
        }).call(this));
      }
      return results;
    };

    TileContainer.prototype.allTiles = function() {
      return this.tiles.slice();
    };

    TileContainer.prototype.clearAll = function() {
      var i, len, ref1, tile;
      ref1 = this.tiles;
      for (i = 0, len = ref1.length; i < len; i++) {
        tile = ref1[i];
        tile.container = null;
      }
      this.coords = {};
      return this.tiles = [];
    };

    return TileContainer;

  })(Element);

  if (typeof Parallelio !== "undefined" && Parallelio !== null) {
    Parallelio.TileContainer = TileContainer;
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = TileContainer;
  } else {
    if (this.Parallelio == null) {
      this.Parallelio = {};
    }
    this.Parallelio.TileContainer = TileContainer;
  }

}).call(this);
