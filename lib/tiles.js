(function() {
  if (typeof module !== "undefined" && module !== null) {
    module.exports = {
      Tile: require('./Tile'),
      Tiled: require('./Tiled'),
      TileContainer: require('./TileContainer')
    };
  }

}).call(this);
