const fs = require('fs');

let spritePosition = 1;
let cycle = 0;
let signalStrength = 0;
let screenRow = '';

function followInstructions(input) {
	input.pop(); // one day i will fix this
	while (input.length > 0) {
		runInstruction(input.shift());
	}
}

function findSignalStrength() {
	signalStrength += spritePosition * cycle;
}

function runInstruction(instruction) {
	var [command, value] = instruction.split(' ');
	value = Number(value);
	if (command === 'noop') {
		// do nothing for 1 cycle. the x value does not change
		runCycle();
	} else {
		// does nothing for the first cycle
		runCycle();

		// adds the value at the end of the second cycle
		runCycle(value);
	}
}

function runCycle(value) {
	cycle++;
	duringCycle();
	endCycle(value);
}

function duringCycle() {
	// during the cycle, we draw a pixel on the board
	var pixel = '';
	if (Math.abs(spritePosition - ((cycle - 1) % 40)) <= 1) {
		// if the sprite position is on the cycle or within 1 of it
		// draw a # pixel
		pixel = '#';
	} else {
		pixel = '.';
	}
	screenRow += pixel;
	if (cycle % 40 === 0) {
		// end of row
		console.log(screenRow);
		screenRow = ''; // reset the row
	} if (cycle % 40 === 20) {
		findSignalStrength();
	}
}

function endCycle(value) {
	// at the end of the cycle we change the sprite position
	// based on the value
	if (!value) {
		value = 0;
	}
	spritePosition += Number(value);
}

function resetData() {
	spritePosition = 1;
	cycle = 0;
	queue = [];
	screenRow = '';
}

function runSolution() {
	const testData = fs.readFileSync('data/day10test.txt', 'utf-8').split('\n');
	followInstructions(testData);
	console.log('signal strength sum: ' + signalStrength)

	resetData();

	const data = fs.readFileSync('data/day10.txt', 'utf-8').split('\n');
	followInstructions(data);
}

runSolution();
