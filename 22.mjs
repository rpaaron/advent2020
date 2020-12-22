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

const makekey = (a1, a2) => [...a1, '|', ...a2]

var nextgame=0
function isPlayer1WinnerOfGame(p1, p2) {
	const gameCache = {}
	const game = ++nextgame
	var round = 0
	console.log("Game", game)
	while (p1.length && p2.length) {
		round++
		//console.log(`Round ${round} (Game ${game})` ,{p1, p2})
		if (gameCache[makekey(p1, p2)]) {
			//console.log('Infinate recursion', 'Player 1 wins!')
			//console.log({gameCache})
			return true
		}
		gameCache[makekey(p1, p2)] = true
		if (p1[0] < p1.length  && p2[0] < p2.length) { // recurse
			winround(isPlayer1WinnerOfGame(p1.slice(1, p1[0] + 1), p2.slice(1, p2[0] + 1)) ? [p1, p2] : [p2, p1])
		} else
		{
			//console.log('w1', {p1, p2})
			winround(p1[0] > p2[0] ? [p1, p2] : [p2, p1])
			//console.log('w2', {p1, p2})
		}

	}
	return p2.length === 0
}

// Part1 32856
// Part2 34027 too high
console.log("Winner is", isPlayer1WinnerOfGame(p1, p2) ? "Player 1" : "Player 2")
console.log({p1, p2})
console.log('p1', score(p1))
console.log('p2', score(p2))
