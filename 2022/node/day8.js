const fs = require('fs');

function isVisible(x, y, grid) {
	// the definition of 'is visible' is whether ALL trees in either direction
	// of this tree are shorter in either direction on BOTH axes
	//
	// what we DO know is that for something to be visible, it only has to be visible from one
	// direction. In order to be invisble, it must be invisible from ALL directions
	// This is a substantive difference
	if (x === 0 || y === 0) {
		return true;
	} else if (x === grid[0].length - 1 || y == grid.length) {
		return true;
	}
}

function checkRowVisibility(row) {
	// assume we haven't checked the visibility on the columns yet.
	var maxFromLeft = -1;
	var visibilityRow = [];
	for (const tree of row) {
		if (tree > maxFromLeft) {
			visibilityRow.push(true);
			maxFromLeft = tree;
		} else {
			visibilityRow.push(false);
		}
	}

	var maxFromRight = -1;
	for (let i = row.length; i >= 0; i--) { // go backwards
		if (row[i] > maxFromRight) {
			maxFromRight = row[i];
			visibilityRow[i] = true;
		}
	}
	return visibilityRow;
}

function countColumnVisibility(col, treeMatrix, visibility) {
	// column is an int that is the identifier of the the thing.
	var maxFromTop = -1;
	for (let row = 0; row < treeMatrix.length; row++) {
		if (treeMatrix[row][col] > maxFromTop) {
			// is visible. update
			visibility[row][col] = true;
			maxFromTop = treeMatrix[row][col];
		}
	}

	var maxFromBottom = -1;
	let visibleTrees = 0;
	for (let row = treeMatrix.length - 1; row >= 0; row--) {
		if (treeMatrix[row][col] > maxFromBottom) {
			maxFromBottom = treeMatrix[row][col];
			visibility[row][col] = true;
		}
		if (visibility[row][col] === true) {
			visibleTrees++;
		}
	}
	return visibleTrees;
}

function numVisibleTrees(input) {
	// the ugliest brute force solution is going through each row in both
	// directions and each vertical in both directions
	//
	// we can transpose the rows to make it easier to check the columns. If we
	// do that, however, we need to be careful about coordinates

	const treeHeightMatrix = buildTreeMatrix(input);
	visibilityMatrix = [];
	for (const row of treeHeightMatrix) {
		visibilityMatrix.push(checkRowVisibility(row));
	}

	let visibleTotal = 0;
	for (let column = 0; column < treeHeightMatrix[0].length; column++) {
		visibleTotal += countColumnVisibility(column, treeHeightMatrix, visibilityMatrix);
	}
	console.log('number of trees visible: ' + visibleTotal);

	findScenicScore(treeHeightMatrix);
}

function buildTreeMatrix(input) {
	// the instinct with this is to make it an array of arrays
	matrix = [];
	for (const line of input) {
		matrix.push(line.split(''));
	}
	return matrix;
}

function findScenicScore(treeHeightMatrix) {
	// to find the scenic score, we consider each tree and the number of trees
	// it can find in each direction
	// is there something we can discount when checking the trees' scenic scores?
	// for i in row
	//  for j in colum
	//		check scenery at [i][j]
	//
	//	checkscenery:
	//		if 0 assume low score and move on
	const [maxLength, maxHeight] = [treeHeightMatrix[0].length, treeHeightMatrix.length]
	var maxScore = 4;
	for (let i = 0; i < maxHeight; i++) {
		for (let j = 0; j < maxLength; j++) {

			var left = [true, 0];
			var right = [true, 0];
			var up = [true, 0];
			var down = [true, 0];

			const treeHeight = treeHeightMatrix[i][j];
			// i hate myself
			for (let k = 1; k < Math.max(maxLength, maxHeight); k++) {

				// left first
				if (left[0] && j - k >= 0 && treeHeightMatrix[i][j - k] < treeHeight) {
					// i see you
					left[1]++;
				} else if (left[0] && j - k >= 0) {
					left[1]++;
					left[0] = false;
				} else if (left[0]) {
					left[0] = false;
				}

				if (right[0] && j + k < maxLength && treeHeightMatrix[i][j + k] < treeHeight) {
					right[1]++;
				} else if (right[0] && j + k < maxLength) {
					right[1]++;
					right[0] = false;
				} else if (right[0]){
					right[0] = false;
				}

				if (up[0] && i - k >= 0 && treeHeightMatrix[i - k][j] < treeHeight) {
					up[1]++;
				} else if (up[0] && i - k >= 0) {
					up[1]++;
					up[0] = false;
				} else if (up[0]) {
					up[0] = false;
				}

				if (down[0] && i + k < maxHeight && treeHeightMatrix[i + k][j] < treeHeight) {
					down[1]++;
				} else if (down[0] && i + k < maxHeight) {
					down[1]++;
					down[0] = false;
				} else if (down[0]){
					down[0] = false;
				}

				if (!left[0] && !right[0] && !up[0] && !down[0]) {
					// no need to continue; we've gotten it cleaned up
					break;
				}
			}
			const score = left[1] * right[1] * up[1] * down[1];
			if (score > maxScore) {
				maxScore = score;
			}
		}
	}
	console.log('max scenic score: ' + maxScore);
}

function runSolution() {
	console.log('Run test: ');
	const testInput = "30373\n25512\n65332\n33549\n35390".split('\n');;

	numVisibleTrees(testInput);

	console.log('Run problem: ');
	const input = fs.readFileSync('data/day8.txt', 'utf-8').split('\n');

	numVisibleTrees(input);

}

runSolution();
