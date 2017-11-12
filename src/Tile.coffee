Element = require('spark-starter').Element

class Tile extends Element
  constructor: (@x, @y) ->
    @init()
    
  init: ->
    @children = []
    
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
