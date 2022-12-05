/*
 * --- Day 5: Supply Stacks ---

	The expedition can depart as soon as the final supplies have been unloaded from
	the ships. Supplies are stored in stacks of marked crates, but because the
	needed supplies are buried under many other crates, the crates need to be
	rearranged.

	The ship has a giant cargo crane capable of moving crates between stacks. To
	ensure none of the crates get crushed or fall over, the crane operator will
	rearrange them in a series of carefully-planned steps. After the crates are
	rearranged, the desired crates will be at the top of each stack.

	The Elves don't want to interrupt the crane operator during this delicate
	procedure, but they forgot to ask her which crate will end up where, and they
	want to be ready to unload them as soon as possible so they can embark.

	They do, however, have a drawing of the starting stacks of crates and the
	rearrangement procedure (your puzzle input). For example:

		[D]
	[N] [C]
	[Z] [M] [P]
	 1   2   3

	move 1 from 2 to 1
	move 3 from 1 to 3
	move 2 from 2 to 1
	move 1 from 1 to 2

	In this example, there are three stacks of crates. Stack 1 contains two crates:
	crate Z is on the bottom, and crate N is on top. Stack 2 contains three crates;
	from bottom to top, they are crates M, C, and D. Finally, stack 3 contains a
	single crate, P.

	Then, the rearrangement procedure is given. In each step of the procedure, a
	quantity of crates is moved from one stack to a different stack. In the first
	step of the above rearrangement procedure, one crate is moved from stack 2 to
	stack 1, resulting in this configuration:

	[D]
	[N] [C]
	[Z] [M] [P]
	 1   2   3

	In the second step, three crates are moved from stack 1 to stack 3. Crates are
	moved one at a time, so the first crate to be moved (D) ends up below the
	second and third crates:

			[Z]
			[N]
		[C] [D]
		[M] [P]
	 1   2   3

	Then, both crates are moved from stack 2 to stack 1. Again, because crates are
	moved one at a time, crate C ends up below crate M:

			[Z]
			[N]
	[M]     [D]
	[C]     [P]
	 1   2   3

	Finally, one crate is moved from stack 1 to stack 2:

			[Z]
			[N]
			[D]
	[C] [M] [P]
	 1   2   3

	The Elves just need to know which crate will end up on top of each stack; in
	this example, the top crates are C in stack 1, M in stack 2, and Z in stack 3,
	so you should combine these together and give the Elves the message CMZ.

	After the rearrangement procedure completes, what crate ends up on top of each
	stack?

	--- Part Two ---
	As you watch the crane operator expertly rearrange the crates, you notice the
	process isn't following your prediction.

	Some mud was covering the writing on the side of the crane, and you quickly
	wipe it away. The crane isn't a CrateMover 9000 - it's a CrateMover 9001.

	The CrateMover 9001 is notable for many new and exciting features: air
	conditioning, leather seats, an extra cup holder, and the ability to pick up
	and move multiple crates at once.

	Again considering the example above, the crates begin in the same
	configuration:

		[D]
	[N] [C]
	[Z] [M] [P]
	 1   2   3
	Moving a single crate from stack 2 to stack 1 behaves the same as before:

	[D]
	[N] [C]
	[Z] [M] [P]
	 1   2   3
	However, the action of moving three crates from stack 1 to stack 3 means that
	those three moved crates stay in the same order, resulting in this new
	configuration:

			[D]
			[N]
		[C] [Z]
		[M] [P]
	 1   2   3
	Next, as both crates are moved from stack 2 to stack 1, they retain their order
	as well:

			[D]
			[N]
	[C]     [Z]
	[M]     [P]
	 1   2   3
	Finally, a single crate is still moved from stack 1 to stack 2, but now it's
	crate C that gets moved:

			[D]
			[N]
			[Z]
	[M] [C] [P]
	 1   2   3
	In this example, the CrateMover 9001 has put the crates in a totally different
	order: MCD.

	Before the rearrangement process finishes, update your simulation so that the
	Elves know where they should stand to be ready to unload the final supplies.
	After the rearrangement procedure completes, what crate ends up on top of each
	stack?

*/

const fs = require('fs')

// note: can assume there's only one digit in the column numbers
function findCrateArrangement(rawData) {
	// clean up the data
	lines = rawData.split('\n');
	lines.pop(); // still don't know where that last empty string comes from

	var [arrangement9000, arrangement9001] = buildInitialArrangement(lines);

	// buildInitialArrangement removes the initial arrangement lines from lines
	// so what we're left with in lines are just the moves
	moveCrates9000(arrangement9000, lines);
	findTopCrates(arrangement9000);

	moveCrates9001(arrangement9001, lines);
	findTopCrates(arrangement9001);
	return;
}

function moveCrates9001(arrangement, moves) {
	for (const move of moves) {
		var [numToMove, initial, end] = move.match(/(\d+)/g);

		initialColumn = arrangement[initial - 1];
		finalColumn = arrangement[end - 1];

		movingCrates = initialColumn.slice(-numToMove)
		while (movingCrates.length > 0) {
			initialColumn.pop();
			finalColumn.push(movingCrates.shift());
		}
		//arrays are references, right? so changes are in place?
	}
}

function findTopCrates(finalTowers) {
	let solution = '';
	for (const tower of finalTowers) {
		solution = solution + tower.slice(-1);
	}
	console.log(solution);
}

function moveCrates9000(arrangement, moves) {
	for (const move of moves) {
		var [numToMove, initial, end] = move.match(/(\d+)/g);
		// what is the column that we need to slice from?
		// finalArrangement[initial -1]

		initialColumn = arrangement[initial - 1];
		finalColumn = arrangement[end - 1];

		while (numToMove > 0) {
			finalColumn.push(initialColumn.pop());
			numToMove--;
		}
	}
}

function buildInitialArrangement(dataLines) {
	// dataLines should be an array of strings
	arrangementLines = [];
	while (dataLines[0] != '') { // keep going until you find an empty line
		arrangementLines.unshift(dataLines.shift())
	}
	dataLines.shift(); // remove that blank line

	// okay, now we have the arrangment lines in the correct order. We need to
	// process the lines

	// Our desired data structure will turn the columns into arrays from the
	// bottom up. That way, we always know that index on the array shows what
	// row they are on
	const referenceRow = arrangementLines.shift(); // get rid of the reference line
	const firstRow = arrangementLines.shift().match(/([A-Z])/g);
	//const firstRow = arrangementLines.shift().replace(/[\[\]]/g, '').split(' ');
	var arrangement9000 = [];
	var arrangement9001 = [];

	for (const item of firstRow) {
		arrangement9000.push([item]);
		arrangement9001.push([item]);
	}

	for (const row of arrangementLines) {
		// the first row we do is the bottom line. This should adequately build
		// our initial columns.
		for (let i = 1; i < 4 * arrangement9000.length - 1; i=i + 4) {
			if (row[i] == ' ') {
				continue;
			}
			const column = referenceRow[i] - 1;
			arrangement9000[column].push(row[i]);
			arrangement9001[column].push(row[i]);
		}
	}
	return [arrangement9000, arrangement9001];
}

function runSolution() {
	console.log('Test solution');
	findCrateArrangement(fs.readFileSync('data/day5test.txt', 'utf-8'));

	console.log('Actual soultion');
	findCrateArrangement(fs.readFileSync('data/day5.txt', 'utf-8'));
}

runSolution();
