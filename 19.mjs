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
	console.log({rule}, expanded(rule))
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
