import fs from 'fs';

const array = fs.readFileSync('3.input.txt').toString().split("\n")

function doIt(down, across) {
	const result = array
		.filter((line, index) => (index % down) === 0)
		.reduce((memo, line) => {
			if (line[memo.pos % line.length] === '#')
				memo.count++;
			memo.pos += across
			return memo
		}, {pos:0, count:0})
	console.log('count', result.count)
	return result.count
}

console.log("Part1", doIt(1,3))
console.log("Part2", doIt(1,1) * doIt(1,3) * doIt(1,5) * doIt(1,7) * doIt(2,1))
console.log('done')
