Element = require('spark-starter').Element
Direction = require('./Direction')

class Tile extends Element
  constructor: (@x, @y) ->
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
      calcul: ->
        Direction.adjacents.map (d)=>
            @getRelativeTile(d.x, d.y)
          .filter (t)=>
            t?
      collection: true

    
  getRelativeTile: (x, y) ->
    @container.getTile(@x + x, @y + y)
    
  addChild: (child) ->
    index = @children.indexOf(child)
    if index == -1
      @children.push(child)
    child.tile = this
    child
    
  removeChild: (child) ->
    index = @children.indexOf(child)
    if index > -1
      @children.splice(index, 1)
    if child.tile == this
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
      
