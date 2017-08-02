#--- Standalone ---
Element = @Spark?.Element || require('spark-starter').Element
#--- Standalone end ---


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


if Parallelio?
  Parallelio.Tile = Tile
#--- Standalone ---
if module?
  module.exports = Tile
else
  unless @Parallelio?
    @Parallelio = {}
  @Parallelio.Tile = Tile
#--- Standalone end ---