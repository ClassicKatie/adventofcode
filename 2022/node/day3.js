/* Problem
 *
	--- Day 3: Rucksack Reorganization ---

	One Elf has the important job of
	loading all of the rucksacks with supplies for the jungle journey.
	Unfortunately, that Elf didn't quite follow the packing instructions, and so a
	few items now need to be rearranged.

	Each rucksack has two large compartments. All items of a given type are meant
	to go into exactly one of the two compartments. The Elf that did the packing
	failed to follow this rule for exactly one item type per rucksack.

	The Elves have made a list of all of the items currently in each rucksack (your
	puzzle input), but they need your help finding the errors. Every item type is
	identified by a single lowercase or uppercase letter (that is, a and A refer to
	different types of items).

	The list of items for each rucksack is given as characters all on a single
	line. A given rucksack always has the same number of items in each of its two
	compartments, so the first half of the characters represent items in the first
	compartment, while the second half of the characters represent items in the
	second compartment.

	For example, suppose you have the following list of contents from six
	rucksacks:

	vJrwpWtwJgWrhcsFMMfFFhFp
	jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
	PmmdzqPrVvPwwTWBwg
	wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
	ttgJtRGJQctTZtZT
	CrZsJsPPZsGzwwsLwLmpwMDw

	The first rucksack contains the items vJrwpWtwJgWrhcsFMMfFFhFp, which means its
	first compartment contains the items vJrwpWtwJgWr, while the second compartment
	contains the items hcsFMMfFFhFp. The only item type that appears in both
	compartments is lowercase p.  The second rucksack's compartments contain
	jqHRNqRjqzjGDLGL and rsFMfFZSrLrFZsSL. The only item type that appears in both
	compartments is uppercase L.  The third rucksack's compartments contain
	PmmdzqPrV and vPwwTWBwg; the only common item type is uppercase P.  The fourth
	rucksack's compartments only share item type v.  The fifth rucksack's
	compartments only share item type t.  The sixth rucksack's compartments only
	share item type s.  To help prioritize item rearrangement, every item type can
	be converted to a priority:

	Lowercase item types a through z have priorities 1 through 26.  Uppercase item
	types A through Z have priorities 27 through 52.  In the above example, the
	priority of the item type that appears in both compartments of each rucksack is
	16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

	Find the item type that appears in both compartments of each rucksack. What
	is the sum of the priorities of those item types?
 */
const cowsay = require('cowsay');
const fs = require('fs');
const readline = require('readline');

const testData = "vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n" +
				  "PmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n" +
                  "ttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw";

function readInput() {
	// read data from a file
    //const fileStream = fs.createReadStream('data/day3.txt');
	const elfSacksRaw = fs.readFileSync('data/day3.txt', 'utf8');
	//const elfSacksRaw = testData;
	const priorities = buildPriorities();

	const elfSacks = elfSacksRaw.split('\n');
	let priorityPoints = 0;
	elfSacks.forEach(sack => {
		if (sack.length === 0) {
			// hack because somehow the last line is in here even though the data looks
			// like not
			return;
		}
		// breakdown the compartments
		const midpoint = sack.length / 2;
		// best to convert to array first since will need to convert to array anyways
		sackItems = sack.split('');
		const compartment1 = new Set(sackItems.slice(0, midpoint));
		const compartment2 = new Set(sackItems.slice(midpoint));

		// problem says we can assume that there is a single intersection of the sets
		let sharedItem = '';
		for (const item of compartment1) {
			if (compartment2.has(item)) {
				sharedItem = item;
			}
		}
		priorityPoints += priorities[sharedItem];
	});
	console.log(priorityPoints);
}

function buildPriorities() {
	priorityOrder = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	priorityMap = {};
	priorityOrder.split('').forEach((item, index) => {
		priorityMap[item] = index + 1;
	});
	return priorityMap;
}
//console.log(cowsay.say({text: 'Hi,Katie!'}));
readInput();
