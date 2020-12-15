import fs from 'fs';

const lines = fs.readFileSync('14.input.txt').toString().split("\n")
	.filter(line => line.length > 0)

const toValue = (mask, val) => {

	const toOnes = BigInt("0b" + Array.from(mask).map(x => x == '1' ? 1 : 0).join(''), 2)
	const toZero = BigInt("0b" + Array.from(mask).map(x => x == '0' ? 0 : 1).join(''), 2)
	const ans = (BigInt(val) | toOnes) & toZero
	if (ans < 0) {
		console.log(val.toString(2).padStart(36, 0))
		console.log(mask)
		console.log(toOnes.toString(2).padStart(36, 0))
		console.log(toZero.toString(2).padStart(36, 0))
		console.log(ans.toString(2).padStart(36, 0))
		console.log({mask, val, ans})
		throw 'oops'
	}
	return ans
}

const result = lines.reduce((memo, line) => {
	const parts = line.split(' = ')
	const subs = parts[0].substr(0, 3)
	//console.log({parts, subs})
	switch(subs) {
		case 'mas':
			memo.mask = parts[1]
			break
		case 'mem':
			const loc = Number.parseInt(parts[0].substr(4))
			memo.mem[loc] = toValue(memo.mask, parts[1])
			break
	}
	return memo
}, {mem: {}, mask: ''})

//console.log({result})
// not     332440436143
// bigint 8471403462063n
console.log('Part1', Object.values(result.mem).reduce((memo, x) => memo + x))
