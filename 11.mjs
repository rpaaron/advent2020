import fs from 'fs';

const lines = fs.readFileSync('11.input.txt').toString().split("\n")
	.filter(line => line.length > 0)
	.map(line => Array.from(line))


const print = (layout) => console.log(layout.map(row => row.join('')).join('\n'), '\n')

const getPos = (layout, row, col) =>
	layout[row] || []

const seatCycle = (layout, row, col) =>
	(layout[row-1] || [])[col-1] == '#' ||
	(layout[row-1] || [])[col  ] == '#' ||
	(layout[row-1] || [])[col+1] == '#' ||
	(layout[row  ] || [])[col-1] == '#' ||
	(layout[row  ] || [])[col+1] == '#' ||
	(layout[row+1] || [])[col-1] == '#' ||
	(layout[row+1] || [])[col  ] == '#' ||
	(layout[row+1] || [])[col+1] == '#' ? 'L' : '#'

const emptyCycle = (layout, row, col) =>
	(((layout[row-1] || [])[col-1] == '#') +
	 ((layout[row-1] || [])[col  ] == '#') +
	 ((layout[row-1] || [])[col+1] == '#') +
	 ((layout[row  ] || [])[col-1] == '#') +
	 ((layout[row  ] || [])[col+1] == '#') +
	 ((layout[row+1] || [])[col-1] == '#') +
	 ((layout[row+1] || [])[col  ] == '#') +
	 ((layout[row+1] || [])[col+1] == '#')) > 3 ? 'L' : '#'

const cycle = (layout) => {
	var mutateCount = 0
	const newLayout = layout.map(
		(row, row_idx) => 
			row.map((seat, col_idx) => {
				const newSeat = 
					seat === 'L' ? seatCycle(layout, row_idx, col_idx) :
					seat === '#' ? emptyCycle(layout, row_idx, col_idx) :
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

var current = lines
do {
	var answer = cycle(current)
	current = answer.newLayout
} while ((answer.mutateCount > 0))

console.log({answer})
print(answer.newLayout)


const occupiedCount = (layout) => 
	layout.reduce((memo, row) => row.reduce((memo, seat) => memo + (seat === '#' ? 1 : 0), memo), 0)


console.log('Part1', occupiedCount(answer.newLayout))
