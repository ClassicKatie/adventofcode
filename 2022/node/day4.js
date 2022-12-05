/* Problem
	 --- Day 4: Camp Cleanup ---
	Space needs to be cleared before the last supplies can be unloaded from the
	ships, and so several Elves have been assigned the job of cleaning up sections
	of the camp. Every section has a unique ID number, and each Elf is assigned a
	range of section IDs.

	However, as some of the Elves compare their section assignments with each
	other, they've noticed that many of the assignments overlap. To try to quickly
	find overlaps and reduce duplicated effort, the Elves pair up and make a big
	list of the section assignments for each pair (your puzzle input).

	For example, consider the following list of section assignment pairs:

	2-4,6-8
	2-3,4-5
	5-7,7-9
	2-8,3-7
	6-6,4-6
	2-6,4-8
	For the first few pairs, this list means:

	Within the first pair of Elves, the first Elf was assigned sections 2-4
	(sections 2, 3, and 4), while the second Elf was assigned sections 6-8
	(sections 6, 7, 8).

	The Elves in the second pair were each assigned two sections.

	The Elves in the third pair were each assigned three sections: one got sections
	5, 6, and 7, while the other also got 7, plus 8 and 9.

	This example list uses single-digit section IDs to make it easier to draw; your
	actual list might contain larger numbers. Visually, these pairs of section
	assignments look like this:

	.234.....  2-4
	.....678.  6-8

	.23......  2-3
	...45....  4-5

	....567..  5-7
	......789  7-9

	.2345678.  2-8
	..34567..  3-7

	.....6...  6-6
	...456...  4-6

	.23456...  2-6
	...45678.  4-8

	Some of the pairs have noticed that one of their assignments fully contains the
	other. For example, 2-8 fully contains 3-7, and 6-6 is fully contained by 4-6.
	In pairs where one assignment fully contains the other, one Elf in the pair
	would be exclusively cleaning sections their partner will already be cleaning,
	so these seem like the most in need of reconsideration. In this example, there
	are 2 such pairs.

	In how many assignment pairs does one range fully contain the other?

		--- Part Two ---
	It seems like there is still quite a bit of duplicate work planned.
	Instead, the Elves would like to know the number of pairs that overlap at
	all.

	In the above example, the first two pairs (2-4,6-8 and 2-3,4-5) don't
	overlap, while the remaining four pairs (5-7,7-9, 2-8,3-7, 6-6,4-6, and
	2-6,4-8) do overlap:

	5-7,7-9 overlaps in a single section, 7.
	2-8,3-7 overlaps all of the sections 3 through 7.
	6-6,4-6 overlaps in a single section, 6.
	2-6,4-8 overlaps in sections 4, 5, and 6.
	So, in this example, the number of overlapping assignment pairs is 4.

	In how many assignment pairs do the ranges overlap?

*/

const cowsay = require('cowsay');
const fs = require('fs');

const testAssignmentsRaw = "2-4,6-8\n2-3,4-5\n5-7,7-9\n" +
	                       "2-8,3-7\n6-6,4-6\n2-6,4-8";

function findFullyContained(assignmentsRaw) {
	const assignments = [];
	let fullyContained = 0;
	let anyOverlap = 0;
	for (const assignment of assignmentsRaw.split('\n')) {
		if (assignment.length === 0) {
			continue;
		}
		// This is now a string of a pair
		assignmentPair = assignment.split(',');
		firstAssignments = getFullAssignments(assignmentPair[0]);
		secondAssignments = getFullAssignments(assignmentPair[1]);


		let hasOverlap = false;
		// Now we have sets of assignments. Let's check the intersection
		for (const section of firstAssignments) {
			if (secondAssignments.has(section)) {
				// we now know there is at least some overlap
				hasOverlap = true;
				// if they both have this section, we can remove it from both sets
			    firstAssignments.delete(section);
				secondAssignments.delete(section);
			}
		}

		// If either assignment is now empty, we have found an assignment set
		// that is fully contained within another one.
		if (firstAssignments.size == 0 || secondAssignments.size == 0) {
			fullyContained++;
		}
		if (hasOverlap) {
			anyOverlap++;
		}
	}
	console.log('fully contained: ' + fullyContained);
	console.log('have overlap: ' + anyOverlap);
}

function getFullAssignments(range) {
	// range is a string of X-Y, both are inclusive
	endpoints = range.split('-');
	fullAssignment = new Set()
	for (let i = Number(endpoints[0]); i <= endpoints[1]; i++) {
		fullAssignment.add(i);
	}
	return fullAssignment;
}

function runSolution() {
	console.log('Part 1 Test Solution:');
	console.log(findFullyContained(testAssignmentsRaw));

	console.log('Part 1 Full Data Solution:');
	const assignmentsRaw = fs.readFileSync('data/day4.txt', 'utf-8');
	console.log(findFullyContained(assignmentsRaw));
}

runSolution();
