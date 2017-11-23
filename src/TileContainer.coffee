Element = require('spark-starter').Element


class TileContainer extends Element
  constructor: ->
    @init()
    
  @properties
    boundaries:
      calcul:->
        boundaries = {top:null,left:null,bottom:null,right:null}
        @tiles.forEach (tile)=>
          @_addToBondaries(tile, boundaries)
        boundaries
      output:(val)->
        Object.assign(val)

  _addToBondaries: (tile, boundaries)->
    if !boundaries.top? || tile.y < boundaries.top
      boundaries.top = tile.y
    if !boundaries.left? || tile.x < boundaries.left
      boundaries.left = tile.x
    if !boundaries.bottom? || tile.y > boundaries.bottom
      boundaries.bottom = tile.y
    if !boundaries.right? || tile.x > boundaries.right
      boundaries.right = tile.x


  init: ->
    @coords = {}
    @tiles = []

  addTile: (tile) ->
    unless @tiles.includes(tile)
      @tiles.push(tile)
      @coords[tile.x] = {} unless @coords[tile.x]?
      @coords[tile.x][tile.y] = tile
      tile.container = this
      if @_boundaries?.calculated
        @_addToBondaries(tile,@_boundaries.value)
    this

  removeTile: (tile) ->
    index = @tiles.indexOf(tile)
    if index > -1
      @tiles.splice(index, 1)
      delete @coords[tile.x][tile.y]
      tile.container = null
      if @_boundaries?.calculated
        if @boundaries.top == tile.y || @boundaries.bottom == tile.y || @boundaries.left == tile.x || @boundaries.right == tile.x
          @invalidateBoundaries()

  removeTileAt: (x, y) ->
    if tile = @getTile(x, y)
      @removeTile(tile)
    
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