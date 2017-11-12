(function(definition){Tiled=definition(typeof(Parallelio)!=="undefined"?Parallelio:this.Parallelio);Tiled.definition=definition;if(typeof(module)!=="undefined"&&module!==null){module.exports=Tiled;}else{if(typeof(Parallelio)!=="undefined"&&Parallelio!==null){Parallelio.Tiled=Tiled;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.Tiled=Tiled;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : ((ref = this.Spark) != null ? ref.Element : void 0) || require('spark-starter').Element;
var Tiled, ref, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;
Tiled = (function(superClass) {
  extend(Tiled, superClass);

  function Tiled() {
    return Tiled.__super__.constructor.apply(this, arguments);
  }

  Tiled.properties({
    tile: {
      change: function(old) {
        if (old != null) {
          old.removeChild(this);
        }
        if (this.tile) {
          return this.tile.addChild(this);
        }
      }
    }
  });

  return Tiled;

})(Element);

if (typeof Parallelio !== "undefined" && Parallelio !== null) {
  Parallelio.Tiled = Tiled;
}

if (typeof module !== "undefined" && module !== null) {
  module.exports = Tiled;
} else {
  if (this.Parallelio == null) {
    this.Parallelio = {};
  }
  this.Parallelio.Tiled = Tiled;
}

return(Tiled);});