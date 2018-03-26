'use strict';

let f = {
  "NORTH": 0,
  "EAST": 1,
  "SOUTH": 2,
  "WEST": 3
};

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
    move: function(callback) {
        switch(this._status.currentDirection) {
            case "NORTH":
                if(this._status.currentY<4) {
                    ++this._status.currentY;
                } else {
                    return callback(false);
                }
            break;
            case "EAST":
                if(this._status.currentX<4) {
                    ++this._status.currentX;
                } else {
                    return callback(false);
                }
            break;
            case "SOUTH":
                if(this._status.currentY>0) {
                    --this._status.currentY
                } else {
                    return callback(false);
                }
            break;
            case "WEST":
                if(this._status.currentX>0) {
                    --this._status.currentX;
                } else {
                    return callback(false);
                }
            break;
        }
    }
}

Robot.prototype = Object.create(prototype);
Robot.prototype.constructor = Robot;
