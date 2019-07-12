Element = require('spark-starter').Element
TileReference = require('./TileReference')


class TileContainer extends Element
  constructor: ->
    super()
    @init()
    
  @properties
    owner:
      default: true
    boundaries:
      calcul:->
        boundaries = {top:null,left:null,bottom:null,right:null}
        @tiles.forEach (tile)=>
          @_addToBondaries(tile, boundaries)
        boundaries
      output:(val)->
        Object.assign({},val)

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
      if @owner
        tile.container = this
      if @_boundaries?.calculated
        @_addToBondaries(tile,@_boundaries.value)
    this

  removeTile: (tile) ->
    index = @tiles.indexOf(tile)
    if index > -1
      @tiles.splice(index, 1)
      delete @coords[tile.x][tile.y]
      if @owner
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
    if @owner
      for tile in @tiles
        tile.container = null
    @coords = {}
    @tiles = []
    this
  
  closest: (originTile, filter)->
    getScore = (candidate)->
      if candidate.score?
        candidate.score
      else
        candidate.score = candidate.getFinalTile().dist(originTile).length
    candidates = @tiles
      .filter(filter)
      .map((t) => new TileReference(t))
    candidates.sort (a, b) =>
      getScore(a) - getScore(b) 
    candidates[0].tile


  copy: ->
    out = new TileContainer()
    out.coords = @coords
    out.tiles = @tiles
    out.owner = false
    out

  merge: (ctn, mergeFn, asOwner = false) ->
    out = new TileContainer()
    out.owner = asOwner
    tmp = ctn.copy()
    @tiles.forEach (tileA)->
      tileB = tmp.getTile(tileA.x,tileA.y)
      if tileB
        tmp.removeTile(tileB)
      mergedTile = mergeFn(tileA, tileB)
      if mergedTile
        out.addTile(mergedTile)
    tmp.tiles.forEach (tileB)->
      mergedTile = mergeFn(null, tileB)
      if mergedTile
        out.addTile(mergedTile)
    out

