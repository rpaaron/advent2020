import fs from 'fs';

const [rawrules, input] = fs.readFileSync('19.input.txt').toString()
	.trim()
	.split("\n\n")
	.map(line => line.split('\n'))


console.log({rawrules, input})

const parseRule = (memo, [num, rule]) => (memo[num] = rule, memo)

const rules = rawrules.reduce((memo, rawrule) => parseRule(memo, rawrule.split(': ')), {})


/*
  rules: {
    '0': '4 1 5',
    '1': '2 3 | 3 2',
    '2': '4 4 | 5 5',
    '3': '4 5 | 5 4',
    '4': '"a"',
    '5': '"b"'
  }
*/

const expanded = rule => /^[a-z"]+$/.test(rule)

const replace = (rules, rule) => 
	rule.split(' ')
		.map(l => l[0] === '"' ? l[1] : rules[l])
		.join('')

const expandRule = (rules) => rule => {
	//console.log({rule}, expanded(rule))
	return expanded(rule) 
		? Array.from(rule).filter(l => /[a-z|\(\)]+/.test(l)).join('')
		: rule.includes(' | ')
			? "(" + rule.split(' | ').map(orRule => expandRule(rules)(orRule)).join('|') + ")"
			: rule.split(' ').map(andRule => expandRule(rules)(replace(rules, andRule))).join('')
}

console.log({rules})

const theRule = expandRule(rules)("0");
const regex = RegExp("^" + theRule + "$")

console.log({theRule})
const part1 = input.reduce((memo, line) => (console.log(line, memo+= regex.test(line)), memo), 0)
console.log({part1})


const rule42 = expandRule(rules)("42")
const rule31 = expandRule(rules)("31")
const rule11 = times => `${rule42}{${times}}${rule31}{${times}}` 
const theRule2 = `${rule42}+(${rule11(1)}|${rule11(2)}|${rule11(3)}|${rule11(4)})`
console.log({theRule2})
const regex2 = RegExp("^" + theRule2 + "$")
const part2 = input.reduce((memo, line) => (console.log(line, memo+= regex2.test(line)), memo), 0)
console.log({part2})
//242 too low
