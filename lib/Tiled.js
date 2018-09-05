(function(definition){var Tiled=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);Tiled.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Tiled;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.Tiled=Tiled;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.Tiled=Tiled;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var Tiled;
Tiled = (function() {
  class Tiled extends Element {};

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
    },
    offsetX: {
      default: 0
    },
    offsetY: {
      default: 0
    }
  });

  return Tiled;

}).call(this);

return(Tiled);});