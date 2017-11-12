Element = require('spark-starter').Element

class Tiled extends Element
  @properties
    tile:
      change: (old) ->
        if old?
          old.removeChild(this)
        if @tile
          @tile.addChild(this)
