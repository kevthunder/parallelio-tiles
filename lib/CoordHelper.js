module.exports = {
  /**
   * @param {{x: number, y: number}} coord
   * @param {number} angle
   * @param {{x: number, y: number}} origin
   * @returns {{x: number, y: number}}
   */
  rotate: function (coord, angle, origin = { x: 0, y: 0 }) {
    const recenterX = coord.x - origin.x
    const recenterY = coord.y - origin.y
    return {
      x: Math.round(Math.cos(angle) * recenterX - Math.sin(angle) * recenterY) + origin.x + 0,
      y: Math.round(Math.sin(angle) * recenterX + Math.cos(angle) * recenterY) + origin.y + 0
    }
  }
}
