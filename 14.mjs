import fs from 'fs';

const lines = fs.readFileSync('14.input.sample2.txt').toString().split("\n")
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

const toMemAddr = (mask, val) => {
	const toOnes = BigInt("0b" + Array.from(mask).map(x => x == '1' ? 1 : 0).join(''), 2)
	const ans = (BigInt(val) | toOnes)
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

const makeCombo = (mask, xMap, iteration) => {
	return mask.map((l, i) => l == 'X'
		? ((iteration & (BigInt(1) << BigInt(xMap.indexOf(i))) ? 1 : 0))
		: l == '0' ? 'X' : '1'
	).join('')

}

const maskCombos = (mask) => {
	const maskArray = Array.from(mask)
        const xMap = maskArray.map((x, i) => x == 'X' ? i : NaN).filter(i => i).reverse()	
	const count = (BigInt(1) << BigInt(xMap.length)) - BigInt(1);

	var combos = []
	//console.log({xMap, count})
	//console.log(1 << xMap.length)
	for(var i = BigInt(0); i <= count; i++) {
		combos.push(makeCombo(maskArray, xMap, i))
	}

	return combos
}


const result2 = lines.reduce((memo, line) => {
	const parts = line.split(' = ')
	const subs = parts[0].substr(0, 3)
	console.log({parts, subs})
	switch(subs) {
		case 'mas':
			memo.mask = parts[1]
			break
		case 'mem':
			console.log(memo.mask)
			const loc = Number.parseInt(parts[0].substr(4))
			maskCombos(memo.mask).forEach(mask => {
				console.log(mask, loc, toValue(mask, loc))
				memo.mem[toValue(mask, loc)] = parts[1]
			})
			console.log('====')
			break
	}
	return memo
}, {mem: {}, mask: ''})


// answer 2558807135598n
//        2558807135598
//        2558807135598
//console.log({result2})
console.log('Part2', Object.values(result2.mem).reduce((memo, x) => memo + (x * 1), 0))
