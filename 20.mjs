import fs from 'fs';

const tiles = fs.readFileSync('20.input.txt').toString()
	.trim()
	.split("\n\n")
	.map(tile => tile.split('\n'))
	.map(([name, ...rows]) => ({name, rows}))


console.log(tiles)

const reverse = (string) => Array.from(string).reverse().join('')

const getColumn = (tile, colnum) => tile.rows.map(row => row[colnum]).join('')

const getFourEdges = (tile) =>
	[tile.rows[0], tile.rows[tile.rows.length -1], getColumn(tile, 0), getColumn(tile, tile.rows.length -1)]

const getMatchingEdgeCountForTile = (tile, edge) =>
	getFourEdges(tile).reduce((memo, candidateEdge) => memo + (candidateEdge === edge) + (reverse(candidateEdge) === edge), 0)

const getMatchingEdgeCount = (exclude, edge) =>
	tiles.reduce((memo, tile) => memo + (tile.name === exclude ? 0 : getMatchingEdgeCountForTile(tile, edge)), 0)

const tileMap = tiles.reduce((memo, tile) => {
	const count = getFourEdges(tile) 
		.reduce((memo, edge) => memo + getMatchingEdgeCount(tile.name, edge), 0)

	memo[tile.name] = count
	return memo
}, {})

const cornersOnly = Object.fromEntries(Object.entries(tileMap).filter(([_, val]) => val === 2))

const sum = (memo, item) => memo + item
const mul = (memo, item) => memo * item
const extractId = (name) => Number.parseInt(name.split(' ')[1])

console.log({tileMap})
console.log({cornersOnly})
console.log('count', tiles.length)
console.log('Part1', Object.keys(cornersOnly).map(extractId).reduce(mul))


