#--- Standalone ---
Element = @Spark?.Element || require('spark-starter').Element
#--- Standalone end ---


class Tiled extends Element
  @properties
    tile:
      change: (old) ->
        if old?
          old.removeChild(this)
        if @tile
          @tile.addChild(this)




if Parallelio?
  Parallelio.Tiled = Tiled
#--- Standalone ---
if module?
  module.exports = Tiled
else
  unless @Parallelio?
    @Parallelio = {}
  @Parallelio.Tiled = Tiled
#--- Standalone end ---