Element = require('spark-starter').Element
Direction = require('./Direction')

class Tile extends Element
  constructor: (@x, @y) ->
    super()
    @init()

  init: ->
    container = null
    
  @properties
    children:
      collection: true
    container: 
      change: ->
        @adjacentTiles.forEach (tile)->
          tile.invalidateAdjacentTiles()
    adjacentTiles:
      calcul: (invalidation)->
        if @container?
          Direction.adjacents.map (d)=>
              @getRelativeTile(d.x, d.y)
            .filter (t)=>
              t?
      collection: true

    
  getRelativeTile: (x, y) ->
    if @container?
      @container.getTile(@x + x, @y + y)

  findDirectionOf: (tile) ->
    if tile.tile
      tile = tile.tile
    if tile.x? and tile.y?
      Direction.all.find (d)=>
        d.x == tile.x - @x and d.y == tile.y - @y
      
  addChild: (child, checkRef = true) ->
    index = @children.indexOf(child)
    if index == -1
      @children.push(child)
    if checkRef
      child.tile = this
    child
    
  removeChild: (child, checkRef = true) ->
    index = @children.indexOf(child)
    if index > -1
      @children.splice(index, 1)
    if checkRef && child.tile == this
      child.tile = null

  dist: (tile)->
    if tile?.x? and tile.y? and @x? and @y? and (@container == tile.container || ctnDist = @container?.dist?(tile.container))
      x = tile.x - @x
      y = tile.y - @y
      if ctnDist
        x += ctnDist.x
        y += ctnDist.y
      {
        x:x
        y:y
        length:Math.sqrt(x*x+y*y)
      }
    else
      null
      
