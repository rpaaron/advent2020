import fs from 'fs';

const [rawrules, input] = fs.readFileSync('19.input.sample2.txt').toString()
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
console.log({rule42})
console.log({rule31})
const rule42regExp = RegExp("^" + rule42)
const rule31regExp = RegExp(      rule31 + "$")

//console.log('pos', theRule.slice(0, rule42.length) + '+' + theRule.slice(rule42.length * 2))

//const regex2 = RegExp("^" + theRule.slice(0, rule42.length) + '+' + theRule.slice(rule42.length * 2) + "+$")

const part2 = input.reduce((memo, line) => {
	if (regex.test(line)) return memo + 1;
	var r42 = 0, r31 = 0
	while (rule42regExp.test(line) || rule31regExp.test(line)) {
		if (rule42regExp.test(line))
			(line = line.replace(rule42regExp, ''), r42++)
		if (rule31regExp.test(line))
			(line = line.replace(rule31regExp, ''), r31++)
	}
	return memo + (!line && r42 >= (r31 + 1))
}, 0)

console.log({part2})
// ((b(a(bb|ab)|b(a|b)(a|b))|a(bbb|a(bb|a(a|b))))b|(((aa|ab)a|bbb)b|((a|b)a|bb)aa)a)+
// ((b(a(bb|ab)|b(a|b)(a|b))|a(bbb|a(bb|a(a|b))))b|(((aa|ab)a|bbb)b|((a|b)a|bb)aa)a)(b(b(aba|baa)|a(b(ab|(a|b)a)|a(ba|ab)))|a(b((ab|(a|b)a)b|((a|b)a|bb)a)|a(bab|(ba|bb)a)))

// 0: 8 11
// 8: 42
// 11: 42 31
// 31: 12 129 | 106 128
// 42: 106 2 | 12 88
