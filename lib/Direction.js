(function(definition){var Direction=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);Direction.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Direction;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.Direction=Direction;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.Direction=Direction;}}})(function(){
var Direction;
Direction = (function() {
  function Direction(name, x, y, inverseName) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.inverseName = inverseName;
  }
  Direction.prototype.getInverse = function() {
    return this.constructor[this.inverseName];
  };
  return Direction;
})();
Direction.up = new Direction('up', 0, -1, 'down');
Direction.down = new Direction('down', 0, 1, 'up');
Direction.left = new Direction('left', -1, 0, 'right');
Direction.right = new Direction('right', 1, 0, 'left');
Direction.adjacents = [Direction.up, Direction.down, Direction.left, Direction.right];
Direction.topLeft = new Direction('topLeft', -1, -1, 'bottomRight');
Direction.topRight = new Direction('topRight', 1, -1, 'bottomLeft');
Direction.bottomRight = new Direction('bottomRight', 1, 1, 'topLeft');
Direction.bottomLeft = new Direction('bottomLeft', -1, 1, 'topRight');
Direction.corners = [Direction.topLeft, Direction.topRight, Direction.bottomRight, Direction.bottomLeft];
Direction.all = [Direction.up, Direction.down, Direction.left, Direction.right, Direction.topLeft, Direction.topRight, Direction.bottomRight, Direction.bottomLeft];
return(Direction);});