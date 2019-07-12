(function(definition){var TileReference=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);TileReference.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=TileReference;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.TileReference=TileReference;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.TileReference=TileReference;}}})(function(){
var TileReference;
TileReference = class TileReference {
  constructor(tile) {
    this.tile = tile;
    Object.defineProperties(this, {
      x: {
        get: () => {
          return this.getFinalTile().x;
        }
      },
      y: {
        get: () => {
          return this.getFinalTile().y;
        }
      }
    });
  }
  getFinalTile() {
    return this.tile.getFinalTile();
  }
};
return(TileReference);});