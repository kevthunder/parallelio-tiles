Element = require('spark-starter').Element


class TileContainer extends Element
  constructor: ->
    @init()
    
  init: ->
    @coords = {}
    @tiles = []

  addTile: (tile) ->
    unless @tiles.includes(tile)
      @tiles.push(tile)
      @coords[tile.x] = {} unless @coords[tile.x]?
      @coords[tile.x][tile.y] = tile
      tile.container = this
    this
    
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
    this
    
  inRange: (tile, range)->
    tiles = []
    range--
    for x in [tile.x-range..tile.x+range]
      for y in [tile.y-range..tile.y+range]
        if Math.sqrt((x-tile.x)*(x-tile.x)+(y-tile.y)*(y-tile.y)) <= range and (found = @getTile(x, y))?
          tiles.push found
    tiles
        
  allTiles: ->
    @tiles.slice()
    
  clearAll: ->
    for tile in @tiles
      tile.container = null
    @coords = {}
    @tiles = []
    this