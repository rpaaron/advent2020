import fs from 'fs';

const lines = fs.readFileSync('13.input.txt').toString().split("\n")
	.filter(line => line.length > 0)

const earliestDepature = lines[0] * 1
const buses = lines[1].split(',').filter(x => x * 1).map(x => x * 1)

console.log({earliestDepature})
console.log({buses})

const map = buses.reduce((memo, bus) => {
	memo[bus] = bus - (earliestDepature % bus)
	return memo
}, {})


console.log({map})

const leBus = Object.entries(map).reduce(
	(memo, [bus, distance]) => {
		if (distance < memo.distance) {
			return {bus, distance}
		}
		return memo
	},
	{bus: -1, distance: earliestDepature+1}	
)

console.log({leBus})
console.log('Part1', leBus.bus * leBus.distance)
