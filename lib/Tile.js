(function(definition){var Tile=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);Tile.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Tile;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.Tile=Tile;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.Tile=Tile;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var Direction = dependencies.hasOwnProperty("Direction") ? dependencies.Direction : require('./Direction');
var Tile, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
Tile = (function(superClass) {
  extend(Tile, superClass);

  function Tile(x1, y1) {
    this.x = x1;
    this.y = y1;
    this.init();
  }

  Tile.prototype.init = function() {
    var container;
    return container = null;
  };

  Tile.properties({
    children: {
      collection: true
    },
    container: {
      change: function() {
        return this.adjacentTiles.forEach(function(tile) {
          return tile.invalidateAdjacentTiles();
        });
      }
    },
    adjacentTiles: {
      calcul: function() {
        return Direction.adjacents.map((function(_this) {
          return function(d) {
            return _this.getRelativeTile(d.x, d.y);
          };
        })(this)).filter((function(_this) {
          return function(t) {
            return t != null;
          };
        })(this));
      },
      collection: true
    }
  });

  Tile.prototype.getRelativeTile = function(x, y) {
    return this.container.getTile(this.x + x, this.y + y);
  };

  Tile.prototype.findDirectionOf = function(tile) {
    if (tile.tile) {
      tile = tile.tile;
    }
    if ((tile.x != null) && (tile.y != null)) {
      return Direction.all.find((function(_this) {
        return function(d) {
          return d.x === tile.x - _this.x && d.y === tile.y - _this.y;
        };
      })(this));
    }
  };

  Tile.prototype.addChild = function(child) {
    var index;
    index = this.children.indexOf(child);
    if (index === -1) {
      this.children.push(child);
    }
    child.tile = this;
    return child;
  };

  Tile.prototype.removeChild = function(child) {
    var index;
    index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
    }
    if (child.tile === this) {
      return child.tile = null;
    }
  };

  Tile.prototype.dist = function(tile) {
    var ctnDist, ref, x, y;
    if (((tile != null ? tile.x : void 0) != null) && (tile.y != null) && (this.x != null) && (this.y != null) && (this.container === tile.container || (ctnDist = (ref = this.container) != null ? typeof ref.dist === "function" ? ref.dist(tile.container) : void 0 : void 0))) {
      x = tile.x - this.x;
      y = tile.y - this.y;
      if (ctnDist) {
        x += ctnDist.x;
        y += ctnDist.y;
      }
      return {
        x: x,
        y: y,
        length: Math.sqrt(x * x + y * y)
      };
    } else {
      return null;
    }
  };

  return Tile;

})(Element);

return(Tile);});