import fs from 'fs';

const [lines_rules, lines_your_ticket, lines_nearby_tickets]
	= fs.readFileSync('16.input.txt').toString().split("\n\n")

const nearby_tickets = lines_nearby_tickets
	.split('\n')
	.filter(line => line.includes(','))

const your_ticket = lines_your_ticket
	.split('\n')
	[1]
	.split(',')
	//.filter(line => line.includes(','))
	

const rules = lines_rules
	.split('\n')
	.map(line => line.split(':'))
	.map(([klass, ranges]) => (([rangeA, rangeB]) => ({klass, rangeA, rangeB, colcache: {}}))(ranges.split(' or ')))
	.reverse()


function between_range(range, value) {
	const [lower, upper] = range.split('-').map(value => value * 1)

	const result = value >= lower && value <= upper
	//console.log({range, value, result})
	return result
}

function obeys_rule(rule, value) {
	const result = between_range(rule.rangeA, value) || between_range(rule.rangeB, value)
	//if (!result) {
	//	console.log('failed', {value, rule, result})
	//}
	return result
}


//const invalid_numbers = nearby_tickets.reduce((memo, ticket) => {
//	return memo.concat(ticket.split(',').filter(value => !rules.some(rule => obeys_rule(rule, value))))
//}, [])
//
////console.log({rules})
console.log({nearby_tickets})
////console.log({invalid_numbers})
//// 28884
//console.log('Part1', invalid_numbers.reduce((memo, value) => memo + value * 1, 0))


const valid_tickets = nearby_tickets.filter(ticket => ticket.split(',').every(value => rules.some(rule => obeys_rule(rule, value))))


function rule_works_in_col(rule, idx, tickets) {
	if (rule.colcache.hasOwnProperty(idx)) {
		//console.log('cached!')
		return rule.colcache[idx]
	}
	const result =  tickets.every(ticket => (obeys_rule(rule, ticket.split(',')[idx])))
	rule.colcache[idx] = result
	return result
}

function loop(subrules, tickets, idx, db) {
	//console.log({idx, subrules})
	return subrules.some((rule, ri) => {
		//console.log('Testing col', idx, rule)
		if (tickets.every(ticket => (obeys_rule(rule, ticket.split(',')[idx])))) {
		//if (rule_works_in_col(rule, idx, tickets)) {
			//console.log('Found', idx, rule, subrules.length -1)
			db[rule.klass] = idx
			return subrules.length == 1 || loop(subrules.filter(item => item != rule), tickets, idx+1, db)
			//return false
		}
	})
}

//console.log({valid_tickets})
//console.log(valid_tickets.length)
//console.log(nearby_tickets.length)
//console.log(invalid_numbers.length)

for(var col=0; col < rules.length; col++)
	rules.forEach(rule => rule_works_in_col(rule, col, valid_tickets))

const colmatches = (rule) => Object.values(rule.colcache).reduce((memo, value) => memo + value, 0)

const sorted_rules = rules.sort((a, b) => colmatches(a) < colmatches(b) ? -1 : 1) 
//console.log({sorted_rules})
console.log({x: sorted_rules.map(rule => rule.colcache)})
const db = {}
if (loop(sorted_rules, valid_tickets, 0, db)) {
	console.log('Part2', db)
	const cols = Object.entries(db).reduce((memo, entry) => {
		const [key, value] = entry
		//console.log({entry})
		if (key.startsWith('departure')) {
			memo.push(value)
		}
		return memo
	}, [])
	console.log({cols})	
	console.log({your_ticket})
	console.log(cols.reduce((memo, col) => memo * your_ticket[col], 1))
} else {
	console.log('Part2, failed')
}
//console.log(rules.reduce(
//	(memo, rule) => {
//		console.log({colc: rule.colcache});
//		Object.entries(rule.colcache).forEach(
//			([col, val]) => {
//				memo['col' + col] = (memo['col'+col] || 0) + val
//				memo['rul' + rule.klass] = (memo['rul' + rule.klass] || 0) + val
//			}
//		)
//		return memo
//	},
//	{}
//))
