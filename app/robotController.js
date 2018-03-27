'use strict';
/**
* This module uses robot instance and call its methods to operate.
**/

module.exports = RobotController;

let robot = new(require('./robot.js')); // robot instance
let readline = require('readline');

// Create command interface
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: '> '
});

const response = {
	welcome: "\n Welcome! Test the robot with available command: \n - PLACE {X},{Y},{F} \n X : 0 to 4 \n Y : 0 to 4 \n F : NORTH | EAST | SOUTH | WEST \n Followed by command: LEFT | RIGHT | MOVE | REPORT \n - QUIT to exit the command.",
	invalidCommand: "Robot don't understand your command.",
	invalidDirection: "Direction is incorrect. Available directions are: NORTH, EAST, SOUTH, WEST",
	wrongDimension: "The robot must be within the dimensions of 5 x 5 units.",
	robotNotPlaced: "Robot has not been placed.",
	robotFall: "The robot will not move as it would fall off the table.",
	robotPosition: "Robot position is: "
};

const command = {
	place: "PLACE",
	move: "MOVE",
	left: "LEFT",
	right: "RIGHT",
	north: "NORTH",
	east: "EAST",
	south: "SOUTH",
	west: "WEST",
	report: "REPORT",
	quit: "QUIT"
};


function RobotController() {}

let prototype = {

	start: function() {
		console.log(response.welcome);
		rl.prompt();
		rl.on('line', (input) => {
			this._executeCommand(input);
			rl.prompt();
		});
	},
	_executeCommand: function(input) {

		let cmd = input.toUpperCase().trim().split(" ");
		let primaryCommand = cmd[0]; // PLACE

		switch(primaryCommand) {
			case command.place:
				if(cmd.length <= 1) {
					console.log(response.invalidCommand);
					return;
				}
				let secondaryCommand = cmd[1].trim().split(","); // X,Y,F
				if(secondaryCommand.length == 3) {
					let x = secondaryCommand[0];
					let y = secondaryCommand[1];
					let f = String(secondaryCommand[2]).toUpperCase();

					this._validateInput(x,y,f, function(isValid) {
						if(isValid) {
							robot.place(x,y,f);
						}
					});
				} else {
					console.log(response.invalidCommand);
				}
			break;
			case command.move:
				if(!robot._status.isPlaced) {
					console.log(response.notPlaced);
					return;
				}
				robot.move(function(isValid) {
					if(!isValid) {
						console.log(response.robotFall);
					}
				});
			break;
			case command.left:
				if(!robot._status.isPlaced) {
					console.log(response.notPlaced);
					return;
				}
				robot.rotate(-1);
			break;
			case command.right:
				if(!robot._status.isPlaced) {
					console.log(response.notPlaced);
					return;
				}
				robot.rotate(1);
			case command.report:
				this._report();
			break;
			case command.quit:
				process.exit();
			break;
			default:
				console.log(response.invalidCommand);
		}

	},
	_validateInput: function(x,y,f, callback) {

		// Check F
		switch(f) {
			case command.north:
			case command.east:
			case command.south:
			case command.west:
				// Check X,Y
				if(x<0||x>4||y<0||y>4) {
					console.log(response.wrongDimension);
					return;
				}
				return callback(true);
			break;
				default: console.log(command.invalidDirection);
			break;
		}
	},
	_report: function() {
		if(robot._status.isPlaced){
			console.log(`${response.robotPosition}${robot._status.currentX},${robot._status.currentY},${robot._status.currentDirection}`);
		  } else {
			console.log(response.robotNotPlaced);
		  }
	}

}

RobotController.prototype = Object.create(prototype);
RobotController.prototype.constructor = RobotController;
