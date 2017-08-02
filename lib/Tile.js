(function() {
  var Element, Tile, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Element = ((ref = this.Spark) != null ? ref.Element : void 0) || require('spark-starter').Element;

  Tile = (function(superClass) {
    extend(Tile, superClass);

    function Tile(x1, y1) {
      this.x = x1;
      this.y = y1;
      this.init();
    }

    Tile.prototype.init = function() {
      return this.children = [];
    };

    Tile.prototype.getRelativeTile = function(x, y) {
      return this.container.getTile(this.x + x, this.y + y);
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

    return Tile;

  })(Element);

  if (typeof Parallelio !== "undefined" && Parallelio !== null) {
    Parallelio.Tile = Tile;
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Tile;
  } else {
    if (this.Parallelio == null) {
      this.Parallelio = {};
    }
    this.Parallelio.Tile = Tile;
  }

}).call(this);
