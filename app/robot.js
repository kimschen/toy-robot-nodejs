'use strict';

module.exports = Robot;

function Robot() {
  this._status = {
      isPlaced: false,
      currentX: 0,
      currentY: 0,
      currentDirection: ''
  };
}

let prototype = {
  place: function(x,y,f) {
    this._status.isPlaced = true;
    this._status.currentX = x;
    this._status.currentY = y;
    this._status.currentDirection = f;
  },
}

Robot.prototype = Object.create(prototype);
Robot.prototype.constructor = Robot;
