import fs from 'fs';

const lines = fs.readFileSync('18.input.sample2.txt').toString()
	.split("\n")
	.filter(x => x)


//const lineToTokens = line =>
//	line[0] === '('
//		? (line.slice(1, -1)).split(' ')
//		: line.split(' ')

const partsToToken = ([op, val]) => val === undefined
	? ({op: '+', val: Number.parseInt(op)}) // leading value
	: ({op, val: Number.parseInt(val)})

const lineToTokens = line =>
	line.match(/([+*]\ |)[0-9]+/g).map(part => partsToToken(part.split(' ')))
	.sort((t1, t2) => t1.op === '+' ? -1 : 1)
	

const calc = line => lineToTokens(line).reduce((memo, token) => {
	//console.log({token})
	if (token.op === '*')
		memo = memo * token.val
	else if (token.op === '+')
		memo += token.val
	else {
		console.log('what', {token})
		throw "unknown token"
	}

	console.log({token, memo})
	return memo
}, 0)

const calcs = lines.map(line => {
	console.log({line})
	for (var i = 0; i < 20; i++)
		line = line.replace(/\([^\()]*\)/, calc)
	return calc(line)
})


console.log({calcs})
console.log('Part1', calcs.reduce((memo, n) => memo + n * 1, 0))
