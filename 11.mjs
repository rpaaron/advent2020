import fs from 'fs';

const lines = fs.readFileSync('11.input.txt').toString().split("\n")
	.filter(line => line.length > 0)
	.map(line => Array.from(line))


const print = (layout) => console.log(layout.map(row => row.join('')).join('\n'), '\n')

const getPos = (layout, row, col) =>
	layout[row] || []

const findSeat = (layout, row, col, row_dir, col_dir, depth) => {
	//if (depth != 100000) throw "oope"
	while(row >= 0 && row < layout.length &&
	      col >= 0 && col < layout[0].length && depth > 0) {
		depth--
		if (depth <= 0) {
			//console.log({row, col, depth, row_dir, col_dir})
			//throw "depth expired"
		}

		row+=row_dir
		col+=col_dir
		if ((layout[row]||[])[col] == '#') return true
		if ((layout[row]||[])[col] == 'L') return false
	}
	return false
}

const seatCycle = (layout, depth, row, col) => {
	const found = (
	findSeat(layout, row, col, -1, -1, depth) +
	findSeat(layout, row, col, -1,  0, depth) + 
	findSeat(layout, row, col, -1, +1, depth) + 
	findSeat(layout, row, col,  0, -1, depth) + 
	findSeat(layout, row, col,  0, +1, depth) + 
	findSeat(layout, row, col, +1, -1, depth) + 
	findSeat(layout, row, col, +1,  0, depth) + 
	findSeat(layout, row, col, +1, +1, depth))
	//console.log({row, col, found})
	return found > 0 ? 'L' : '#'
}

const emptyCycle = (layout, depth, count, row, col) => {
	const found = (
	 findSeat(layout, row, col, -1, -1, depth) +
	 findSeat(layout, row, col, -1,  0, depth) +
	 findSeat(layout, row, col, -1, +1, depth) +
	 findSeat(layout, row, col,  0, -1, depth) +
	 findSeat(layout, row, col,  0, +1, depth) +
	 findSeat(layout, row, col, +1, -1, depth) +
	 findSeat(layout, row, col, +1,  0, depth) +
	 findSeat(layout, row, col, +1, +1, depth))
 	 //console.log({row, col, found})
	return found >= count ? 'L' : '#'
}

const cycle = (layout, depth, count) => {
	var mutateCount = 0
	const newLayout = layout.map(
		(row, row_idx) => 
			row.map((seat, col_idx) => {
				const newSeat = 
					seat === 'L' ? seatCycle(layout, depth, row_idx, col_idx) :
					seat === '#' ? emptyCycle(layout, depth, count, row_idx, col_idx) :
					seat

				mutateCount+= newSeat == seat ? 0 : 1;
				return newSeat;
			})
	)

	console.log({mutateCount})
	return {newLayout, mutateCount}
}

print(lines)
//print(cycle(lines).newLayout)
//print(cycle(cycle(lines).newLayout).newLayout)
//print(cycle(cycle(cycle(lines).newLayout).newLayout).newLayout)
//print(cycle(cycle(cycle(cycle(lines).newLayout).newLayout).newLayout).newLayout)
//print(cycle(cycle(cycle(cycle(cycle(lines).newLayout).newLayout).newLayout).newLayout).newLayout)
//print(cycle(cycle(cycle(cycle(cycle(cycle(lines).newLayout).newLayout).newLayout).newLayout).newLayout).newLayout)


function go (depth, count) {
	var current = lines
	do {
		var answer = cycle(current, depth, count)
		current = answer.newLayout
		//print(current)
	} while ((answer.mutateCount > 0))
	return answer
}

//const answer = go(1, 4)
//console.log({answer})
//print(answer.newLayout)


const occupiedCount = (layout) => 
	layout.reduce((memo, row) => row.reduce((memo, seat) => memo + (seat === '#' ? 1 : 0), memo), 0)


console.log('Part1', occupiedCount(go(1, 4).newLayout))
console.log('Part2', occupiedCount(go(100000, 5).newLayout))
