import fs from 'fs';

const lines = fs.readFileSync('9.input.txt').toString().split("\n")
	.filter(line => line.length > 0)
	.map(line => line * 1)

const preambleLength = 25

function findPair(arr, sum) {
	//console.log(sum, arr)
	for (var i = 0; i < arr.length; i++)
		for (var j = i+1; j < arr.length; j++)
			if (arr[i] + arr[j] === sum) {
				//console.log(arr[i], arr[j])
				return true
			}

	return false
}

function findSeq(arr, sum) {
	for (var i = 0; i < arr.length; i++) {
		var acc = arr[i];
		for (var j = i+1; j < arr.length; j++) {
			//if (acc > sum) return false
			acc+= arr[j];
			if (acc === sum) return arr.slice(i, j)
		}
	}

	return false;
}

lines.some((line, idx) => {
	if (idx >= preambleLength) {
		if (!findPair(lines.slice(idx-preambleLength,idx), line)) {
			console.log('Part1', line)
			const seq = findSeq(lines, line)
			console.log('Part2', Math.max(...seq) + Math.min(...seq))
			return true
		}

		
	}
})

