Element = require('spark-starter').Element

module.exports = class Tiled extends Element
  @properties
    tile:
      change: (val, old) ->
        if old?
          old.removeChild(this)
        if @tile
          @tile.addChild(this)
    offsetX:
      default: 0
    offsetY:
      default: 0

  putOnRandomTile: (tiles)->
    found = @getRandomValidTile(tiles)
    if found
      @tile = found

  getRandomValidTile: (tiles)->
    remaining = tiles.slice()
    while remaining.length > 0
      pos = Math.floor(Math.random()*remaining.length)
      candidate = remaining.splice(pos,1)[0]
      if @canGoOnTile(candidate)
        return candidate
    null

  canGoOnTile: (tile)->
    true
    
  getFinalTile: ->
    @tile.getFinalTile()
