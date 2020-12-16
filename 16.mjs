import fs from 'fs';

const [lines_rules, lines_your_ticket, lines_nearby_tickets]
	= fs.readFileSync('16.input.txt').toString().split("\n\n")

const nearby_tickets = lines_nearby_tickets
	.split('\n')
	.filter(line => line.includes(','))

const rules = lines_rules
	.split('\n')
	.map(line => line.split(' '))
	.map(([klass, rangeA, _or, rangeB]) =>({klass, rangeA, rangeB}))


function between_range(range, value) {
	const [lower, upper] = range.split('-').map(value => value * 1)

	const result = value >= lower && value <= upper
	//console.log({range, value, result})
	return result
}

function obeys_rule(rule, value) {
	const result = between_range(rule.rangeA, value) || between_range(rule.rangeB, value)
	console.log({value, rule, result})
	return result
}


const invalid_numbers = nearby_tickets.reduce((memo, ticket) => {
	return memo.concat(ticket.split(',').filter(value => !rules.some(rule => obeys_rule(rule, value))))
}, [])

console.log({rules})
console.log({nearby_tickets})
console.log({invalid_numbers})
console.log('Part1', invalid_numbers.reduce((memo, value) => memo + value * 1, 0))

