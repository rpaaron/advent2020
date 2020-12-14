import fs from 'fs';

const lines = fs.readFileSync('10.input.txt').toString().split("\n")
	.filter(line => line.length > 0)
	.map(line => line * 1)
	.sort((a,b) => a - b)

lines.unshift(0)
lines.push(lines[lines.length-1] +3)
//console.log('len', lines)

const increment = (db, item) => {
	db[item] = (db[item] || 0) + 1
	return db
}

const result = lines.reduce((memo, adapter) => {
	const diff = adapter - memo.last
	if (diff === 1) {
		memo.seq++;
	} else {
		memo.seq++;
		//console.log('wseq', adapter, memo.seq)
		memo.singles[memo.seq] = (memo.singles[memo.seq] || 0) + 1;
		memo.seq = 0;
	}
	increment(memo, diff)
	memo.last = adapter
	return memo;
}, {last: 0, singles: {}, seq: 0})


console.log({result})
console.log('Part1', result[1] * result[3])
console.log('Part2', Math.pow(2, result.singles[3]) * Math.pow(4, result.singles[4]) * Math.pow(7, (result.singles[5] || 1)))
//const device = result.last + 3

//const arr = lines.reduce((memo, adapter) => {
//	memo[adapter] = true
//	return memo
//}, [true])
//arr[device] = true
//
//const db = {last: 0}
//var i = 0
//var counter = 1;
//console.log("arr len", arr.length)
//while(true) {
//	var incr = 0
//	console.log({i, counter})
//	if (arr[i+1]) incr++;	
//	if (arr[i+2]) incr++;	
//	if (arr[i+3]) incr++;	
//	if (i >= arr.length -1) break;
//	counter <<= incr -1;
//	i++
//	if (arr[i+3]) {i+=3} else
//	if (arr[i+2]) {i+=2} else
//	if (arr[i+1]) {i+=1};
//
//}

/*
1 4 - 1

1 3 4
1   4


1 2 4
1   4

1 2 3 4
1 2   4
1   3 4
1     4


1   3

1 2 3
1   3


1 2 3 4 5
1     4 5
1   3   5
1   3 4 5
1 2     5
1 2   4 5
1 2 3   5

*/

//const att = lines.reduce((memo, adapter) => {
//	memo[adapter] = 0
//	return memo
//}, {[device]: 0, 0: 1})
////console.log({att})
//
//Object.keys(att).forEach(key => {
//	att[key] += att.hasOwnProperty(key-3) + att.hasOwnProperty(key-2) + att.hasOwnProperty(key-1)
//})
//console.log({att})
//const ans = Object.values(att).reduce((memo, value) => memo * value, 1)
//console.log('Part2', ans)
