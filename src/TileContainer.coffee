#--- Standalone ---
Element = @Spark?.Element || require('spark-starter')
#--- Standalone end ---


class TileContainer extends Element
  constructor: ->
    @init()
    
  init: ->
    @coords = {}
    @tiles = []

  addTile: (tile) ->
    @tiles.push(tile)
    @coords[tile.x] = {} unless @coords[tile.x]?
    @coords[tile.x][tile.y] = tile
    tile.container = this
    
  getTile: (x, y) ->
    if @coords[x]?[y]?
      @coords[x][y]
      
  loadMatrix: (matrix) ->
    for y, row of matrix
      for x, tile of row
        options = {
          x: parseInt(x),
          y: parseInt(y),
        }
        if typeof tile == "function"
          @addTile(tile(options))
        else
          tile.x = options.x
          tile.y = options.y
          @addTile(tile)
        
  allTiles: ->
    @tiles.slice()
    
  clearAll: ->
    for tile in @tiles
      tile.container = null
    @coords = {}
    @tiles = []
    
      

if Parallelio?
  Parallelio.TileContainer = TileContainer
#--- Standalone ---
if module?
  module.exports = TileContainer
else
  unless @Parallelio?
    @Parallelio = {}
  @Parallelio.TileContainer = TileContainer
#--- Standalone end ---