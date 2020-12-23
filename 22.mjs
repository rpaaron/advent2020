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

const makekey = (a1, a2) => a1.toString() + '|' + a2.toString()

var nextgame=0
function isPlayer1WinnerOfGame(p1, p2) {
	const gameCache = {}
	const game = ++nextgame
	var round = 0
	//console.log("Game", game)
	while (p1.length && p2.length) {
		round++
		//console.log(`Round ${round} (Game ${game})` ,{p1, p2})
		const key = makekey(p1, p2)
		if (gameCache[key]) {
			return true
		}
		gameCache[key] = true

		const c1 = p1.shift()
		const c2 = p2.shift()
		const player1IsWinner = (c1 <= p1.length  && c2 <= p2.length)
			? isPlayer1WinnerOfGame(p1.slice(0, c1), p2.slice(0, c2))
			: c1 > c2

		player1IsWinner
			? p1.push(c1, c2)
			: p2.push(c2, c1)
	}
	return p2.length === 0
}

// Part1 32856
// Part2 33805
console.log("Winner is", isPlayer1WinnerOfGame(p1, p2) ? "Player 1" : "Player 2")
console.log({p1, p2})
console.log('p1', score(p1))
console.log('p2', score(p2))
