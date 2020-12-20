import fs from 'fs';

const lines = fs.readFileSync('18.input.txt').toString()
	.split("\n")


const lineToTokens = line =>
	line[0] === '('
		? (line.slice(1, -1)).split(' ')
		: line.split(' ')

const calc = line => lineToTokens(line).reduce((memo, token) => {
	//console.log({token})
	if (['*', '+'].includes(token)) {
		memo.op = token
	}
	else
	if (Number.isInteger(token *1)) {
		if (memo.op === '*')
			memo.t = memo.t * token
		if (memo.op === '+')
			memo.t += (token *1)
	}
	else {
		console.log('what', {token})
		throw "unknown token"
	}

	console.log({token, memo})
	return memo
}, {t:0, op:'+'}).t

const part2 = line => {
	for (var i = 0; i < 20; i++)
		line = line.replace(/[0-9]+(\ \+\ )[0-9]+/g, calc)
	return calc(line)
}

const calcs = lines.map(line => {
	console.log({line})
	for (var i = 0; i < 20; i++)
		line = line.replace(/\([^\()]*\)/, part2)
	return part2(line)
})


console.log({calcs})
console.log('Part2', calcs.reduce((memo, n) => memo + n * 1, 0))
