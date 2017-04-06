(function() {
  if (typeof module !== "undefined" && module !== null) {
    module.exports = {
      Tile: require('./Tile'),
      TileContainer: require('./TileContainer')
    };
  }

}).call(this);
