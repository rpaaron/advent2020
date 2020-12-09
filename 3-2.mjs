import fs from 'fs';

const array = fs.readFileSync('3.input.txt').toString().split("\n")

//console.log({readline})

function doIt(down, across) {

	var pos = 0
	var count = 0
	;
	array.forEach((line, index) => {
		if ((index % down) != 0) return;
		if (line[pos % line.length] === '#') count++;
		pos += across
	})
	console.log({count})
	return count
}

console.log("Part1", doIt(1,3))
console.log("Part2", doIt(1,1) * doIt(1,3) * doIt(1,5) * doIt(1,7) * doIt(2,1))
console.log('done')
