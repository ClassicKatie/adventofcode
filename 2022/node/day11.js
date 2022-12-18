const fs = require('fs');

let input = [];
let monkeyRegistry = {};

function processRounds() {
	var roundsRemaining = 20;
	while (roundsRemaining > 0) {
		// in each round, each monkey takes a turn
		console.log('ROUND ' + roundsRemaining);
		for (const monkey of Object.keys(monkeyRegistry)) {
			// monkey turn!
			//console.log('Monkey ' + monkey);
			monkeyTurn(monkeyRegistry[monkey]);
		}

		roundsRemaining--;
	}
	console.log('monkey business: ' + monkeyBusiness());
}

function monkeyBusiness() {
	monkeys = Object.values(monkeyRegistry);
	monkeys.sort(compareMonkeys);
	return monkeys[0].inspectedItems * monkeys[1].inspectedItems;
}

function compareMonkeys (a, b) {
	if (a.inspectedItems > b.inspectedItems) {
		return -1;
	} else if (a.inspectedItems < b.inspectedItems) {
		return 1;
	} else {
		return 0;
	}
}

function monkeyTurn(monkey) {
	// in a monkey's turn, they go through all their items
	while (monkey['items'].length > 0) {
		old = monkey['items'].shift();
		// 1) monkey inspects item
		// 2) monkey gets bored with item
		// 3) monkey tests worry level
		// 4) monkey throws item based on 3

		// when inspecting item, your worry level changes according to the operation
		//console.log('\tMonkey inspects an item of worry level ' + old);
		var newWorryLevel = eval(monkey['operation']);
		// monkey inpsections increases
		monkey['inspectedItems']++;

		// 2) monkey gets bored with item
		//console.log('\t\tworry level increases to ' + newWorryLevel);
		newWorryLevel = Math.floor(newWorryLevel / 3);
		//console.log('\t\tMoneky gets bored. worry level decreases to ' + newWorryLevel);

		// 3) monkey tests worry level; all worry levels are a matter of divisibility
		if (newWorryLevel % monkey['test'] === 0) {
			//console.log('\t\tworry level is divisible by ' + monkey['test']);
			//console.log('\t\tmonkey tosses item to ' + monkey['success']);
			throwItem(newWorryLevel, monkey['success']);
		} else {
			//console.log('\t\tworry level not divisble by ' + monkey['test']);
			//console.log('\t\tmonkey tosses item to ' + monkey['fail']);
			throwItem(newWorryLevel, monkey['fail']);
		}
	}
}

function throwItem(worryLevel, receivingMonkey) {
	monkeyRegistry[receivingMonkey]['items'].push(worryLevel);
}

function readMonkeys() {
	while (input.length > 0) {
		const monkeyNumber = input.shift().match(/\b(\d+)\b/)[0];
		var items = [];
		for (const item of input.shift().split(': ')[1].split(', ')) {
			items.push(Number(item));
		} // i think this works
		const operation = input.shift().split('= ')[1];
		const test = Number(input.shift().split('by ')[1]);
		const success = Number(input.shift().split('monkey ')[1]); // works
		const fail = Number(input.shift().split('monkey ')[1]); // works

		monkeyRegistry[Number(monkeyNumber)] = {
			'items': items,
			'operation': operation,
			'test': test,
			'success': success,
			'fail': fail,
			'inspectedItems': 0
		};
		input.shift(); // get rid of the new line
	}
}

function resetData() {
	input = [];
	monkeyRegistry = {};
}

function runSolution() {
	input = fs.readFileSync('data/day11test.txt', 'utf-8').split('\n');
	readMonkeys();
	processRounds();

	resetData();

	input = fs.readFileSync('data/day11.txt', 'utf-8').split('\n');
	readMonkeys();
	processRounds();
}

runSolution();
