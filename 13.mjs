import fs from 'fs';

const lines = fs.readFileSync('13.input.txt').toString().split("\n")
	.filter(line => line.length > 0)

const earliestDepature = lines[0] * 1
const buses = lines[1].split(',').map(x => x * 1)

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


function rec(time, pos, every) {
	while (true) {
		const bus = buses[pos]
		console.log({time, bus, pos, every})
		if (isNaN(bus) || ((time + pos) % bus == 0)) { 
			if (pos == buses.length -1)
				return time;
			return rec(time, pos+1, (bus||1) * every)
		}

		time+= every
	}
}

const blah = rec(1, 0, 1)
console.log('Part2', blah)
//1111111111111111111111111111111
//2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
//3  3  3  3  3  3  3  3  3  3  3
//4   4   4   4   4   4   4   4   
//5    5    5    5    5    5    5
//6     6     6     6      6     6
