(function(definition){TileContainer=definition(typeof(Parallelio)!=="undefined"?Parallelio:this.Parallelio);TileContainer.definition=definition;if(typeof(module)!=="undefined"&&module!==null){module.exports=TileContainer;}else{if(typeof(Parallelio)!=="undefined"&&Parallelio!==null){Parallelio.TileContainer=TileContainer;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.TileContainer=TileContainer;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var TileContainer, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
TileContainer = (function(superClass) {
  extend(TileContainer, superClass);

  function TileContainer() {
    this.init();
  }

  TileContainer.properties({
    boundaries: {
      calcul: function() {
        var boundaries;
        boundaries = {
          top: null,
          left: null,
          bottom: null,
          right: null
        };
        this.tiles.forEach((function(_this) {
          return function(tile) {
            return _this._addToBondaries(tile, boundaries);
          };
        })(this));
        return boundaries;
      },
      output: function(val) {
        return Object.assign(val);
      }
    }
  });

  TileContainer.prototype._addToBondaries = function(tile, boundaries) {
    if ((boundaries.top == null) || tile.y < boundaries.top) {
      boundaries.top = tile.y;
    }
    if ((boundaries.left == null) || tile.x < boundaries.left) {
      boundaries.left = tile.x;
    }
    if ((boundaries.bottom == null) || tile.y > boundaries.bottom) {
      boundaries.bottom = tile.y;
    }
    if ((boundaries.right == null) || tile.x > boundaries.right) {
      return boundaries.right = tile.x;
    }
  };

  TileContainer.prototype.init = function() {
    this.coords = {};
    return this.tiles = [];
  };

  TileContainer.prototype.addTile = function(tile) {
    var ref;
    if (!this.tiles.includes(tile)) {
      this.tiles.push(tile);
      if (this.coords[tile.x] == null) {
        this.coords[tile.x] = {};
      }
      this.coords[tile.x][tile.y] = tile;
      tile.container = this;
      if ((ref = this._boundaries) != null ? ref.calculated : void 0) {
        this._addToBondaries(tile, this._boundaries.value);
      }
    }
    return this;
  };

  TileContainer.prototype.removeTile = function(tile) {
    var index, ref;
    index = this.tiles.indexOf(tile);
    if (index > -1) {
      this.tiles.splice(index, 1);
      delete this.coords[tile.x][tile.y];
      tile.container = null;
      if ((ref = this._boundaries) != null ? ref.calculated : void 0) {
        if (this.boundaries.top === tile.y || this.boundaries.bottom === tile.y || this.boundaries.left === tile.x || this.boundaries.right === tile.x) {
          return this.invalidateBoundaries();
        }
      }
    }
  };

  TileContainer.prototype.removeTileAt = function(x, y) {
    var tile;
    if (tile = this.getTile(x, y)) {
      return this.removeTile(tile);
    }
  };

  TileContainer.prototype.getTile = function(x, y) {
    var ref;
    if (((ref = this.coords[x]) != null ? ref[y] : void 0) != null) {
      return this.coords[x][y];
    }
  };

  TileContainer.prototype.loadMatrix = function(matrix) {
    var options, row, tile, x, y;
    for (y in matrix) {
      row = matrix[y];
      for (x in row) {
        tile = row[x];
        options = {
          x: parseInt(x),
          y: parseInt(y)
        };
        if (typeof tile === "function") {
          this.addTile(tile(options));
        } else {
          tile.x = options.x;
          tile.y = options.y;
          this.addTile(tile);
        }
      }
    }
    return this;
  };

  TileContainer.prototype.inRange = function(tile, range) {
    var found, i, j, ref, ref1, ref2, ref3, tiles, x, y;
    tiles = [];
    range--;
    for (x = i = ref = tile.x - range, ref1 = tile.x + range; ref <= ref1 ? i <= ref1 : i >= ref1; x = ref <= ref1 ? ++i : --i) {
      for (y = j = ref2 = tile.y - range, ref3 = tile.y + range; ref2 <= ref3 ? j <= ref3 : j >= ref3; y = ref2 <= ref3 ? ++j : --j) {
        if (Math.sqrt((x - tile.x) * (x - tile.x) + (y - tile.y) * (y - tile.y)) <= range && ((found = this.getTile(x, y)) != null)) {
          tiles.push(found);
        }
      }
    }
    return tiles;
  };

  TileContainer.prototype.allTiles = function() {
    return this.tiles.slice();
  };

  TileContainer.prototype.clearAll = function() {
    var i, len, ref, tile;
    ref = this.tiles;
    for (i = 0, len = ref.length; i < len; i++) {
      tile = ref[i];
      tile.container = null;
    }
    this.coords = {};
    this.tiles = [];
    return this;
  };

  return TileContainer;

})(Element);

return(TileContainer);});