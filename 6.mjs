import fs from 'fs';

const groups = fs.readFileSync('6.input.txt').toString().split("\n\n")
	//.map(line => line.split(/\n| /).reduce(lineToObj, {}))

const groupCount = group => {
	const arr = Array.from(group).filter(l => l <= 'z' && l >= 'a')
	const unique = arr.filter((l, i) => arr.indexOf(l) == i)
	return unique.length
}

const groupCountEvery = group => {
	const arr = group.split('\n')
	const com = Array.from(arr[0]).filter(l => arr.every(line => line.includes(l)))
	//console.log(arr, arr[0], com.length)
	return com.length
}

console.log('Part1', groups.map(groupCount).reduce((memo, item) => memo + item, 0))
console.log('Part2', groups.map(groupCountEvery).reduce((memo, item) => memo + item, 0))
