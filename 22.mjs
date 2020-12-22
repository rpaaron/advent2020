import fs from 'fs';

const items = fs.readFileSync('22.input.txt').toString()
	.trim()
	.split("\n\n")
	.map(set => set.split('\n'))
	.map(([name, ...cards]) => ({name, cards}))

const p1 = items[0].cards.map(Number)
const p2 = items[1].cards.map(Number)

console.dir({items}, {depth: null})

const reverse = (string) => Array.from(string).reverse().join('')

const sum = (memo, item) => memo + item
const mul = (memo, item) => memo * item


const score = cards => cards.reverse().reduce((memo, card, idx) => memo + card * (idx + 1), 0)

function winround([winner, loser]) {
	winner.push(winner.shift())
	winner.push(loser.shift())
}

while (p1.length && p2.length) {
	console.log({p1, p2})
	winround(p1[0] > p2[0] ? [p1, p2] : [p2, p1])

}


console.log({p1, p2})
console.log('p1', score(p1))
console.log('p2', score(p2))
