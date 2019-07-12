
class TileReference
  constructor: (@tile) ->
    Object.defineProperties this,
      x: 
        get: =>
          @getFinalTile().x
      y: 
        get: =>
          @getFinalTile().y
  getFinalTile: ->
    @tile.getFinalTile()