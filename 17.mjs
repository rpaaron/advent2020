import fs from 'fs';

const lines = fs.readFileSync('17.input.txt').toString()

const initialCubes =
	lines.split("\n")
	.map(row => row.split(''))
	.map((row, y) => row.map((p, x) => ({x, y, z: 0, p})))
	.flat()
		
const activeCubes = initialCubes
	.filter(c => c.p === '#')
	.map(c => [c.x, c.y, c.z]) 

const mutateCoord = (coord, idx, change) =>
	coord.slice(0, idx).concat(coord[idx] + change).concat(coord.slice(idx+1))

const makeNeighborsRecur = (center, idx) =>
	center.length == idx 
		? [center]
		: [...makeNeighborsRecur(mutateCoord(center, idx, +0), idx+1),
	           ...makeNeighborsRecur(mutateCoord(center, idx, -1), idx+1),
		   ...makeNeighborsRecur(mutateCoord(center, idx, +1), idx+1)]

const makeNeighbors = (center) => makeNeighborsRecur(center, 0).slice(1)

//console.log('T0', makeNeighbors([]))
//console.log('T1', makeNeighbors([0]))
//console.log('T2', makeNeighbors([0,0]))
//console.log('T3', makeNeighbors([0,0,0]))

//const neighbors = ({x: ox, y: oy, z: oz}) => {
//	//console.log('lol', {ox, oy, oz})
//	const n = []
//	for (var x of [ox-1, ox, ox+1]) {
//		for (var y of [oy-1, oy, oy+1]) {
//			for (var z of [oz-1, oz, oz+1]) {
//				if (z !== oz || x !== ox || y !== oy) {
//					n.push({x, y, z})
//				}
//			}
//		}
//	}
//	return n
//}

//const isActive = (cubes) => (loc) => {
//	const theCube = cubes.find(cube => cube.x === loc.x && cube.y == loc.y && cube.z == loc.z)
//	return theCube && theCube.p === '#'
//}

console.log(lines)
//console.dir({cubes}, {depth: null})


//console.dir(makeNeighbors([cubes[1].x, cubes[1].y, cubes[1].z]), {depth:null})

//console.log('isActive', isActive(cubes)(cubes[1]))


//const newActiveCube = ({x, y, z}, active) => ({x, y, z, p: active ? '#' : '.'})

//const next = cubes.map(cube =>
//	if (cube.p === '#') {
//		return newActiveCube(cube, [2,3].includes(neighbors(cube).filter(isActive(cubes)).length))
//	}
//
//	return cube
//)
//
//
//console.log({next})

//const activeCubes = cubes.filter(c => c.p === '#')
//const n = activeCubes.map(neighbors).flat().reduce((memo, n) => {
//	var x = memo[n.x] || {}
//	var y = x[n.y] || {} 
//	var z = (y[n.z] || 0) +1
//
//	memo[n.x] = x
//	x[n.y] = y
//	y[n.z] = z
//	return memo
//}, {})


//function getActiveNeighborCount(db, {x, y, z}) {
//	return ((db[x] || {})[x] || {})[z] || 0
//	//Object.entries(db).forEach((kx, vy) =>
//	//	Object.entries(vy).forEach((ky, vz) =>
//	//		Object.entries(vz).forEach((kz, vc) =
//}

//console.dir({n}, {depth: null})
//console.log('active neighbor count')
//const inactiveNeighbors = activeCubes.map(neighbors).flat().filter(cube => !isActive(cubes)(cube))
//console.dir(inactiveNeighbors.filter(cube => getActiveNeighborCount(n, cube) === 3))
console.log(lines)
console.log({activeCubes})

const makeActiveCubeMap = activeCubes => activeCubes.reduce((memo, coord) => (memo[coord] = true, memo), {})
console.log(makeActiveCubeMap(activeCubes))

const makeIsActive = (activeCubeMap) => coord => activeCubeMap[coord]

const makeActiveNeighborCount = (activeCubeMap, isActive) => (neighbors) => neighbors.filter(isActive).length

const makeFilterDuplicates = function() {
	const db = {}
	return candidate => (db[candidate] ? false : db[candidate] = true)
}

const evolve = (activeCubes) => {
	const activeCubeMap = makeActiveCubeMap(activeCubes)
	const isActive = makeIsActive(activeCubeMap)
	const getActiveNeighborCount = makeActiveNeighborCount(activeCubeMap, isActive)
	const evolvedActiveCubes = activeCubes.filter(cube => [2,3].includes(getActiveNeighborCount(makeNeighbors(cube))))
	const inactiveCandidates = activeCubes.map(activeCube => makeNeighbors(activeCube).filter(neighbor => !isActive(neighbor))).flat().filter(makeFilterDuplicates())
	console.log({inactiveCandidates})
	console.log('count', inactiveCandidates.map(c => getActiveNeighborCount(makeNeighbors(c))))
	const newActiveCubes = inactiveCandidates.filter(candidate => getActiveNeighborCount(makeNeighbors(candidate)) == 3)
	console.log(makeActiveCubeMap(newActiveCubes))
	console.log({evolvedActiveCubes})
	console.log({newActiveCubes})
	const together = evolvedActiveCubes.concat(newActiveCubes)
	console.log('new size', together.length)
	return together
}

const stage1 = evolve(activeCubes)
const stage2 = evolve(stage1)
const stage3 = evolve(stage2)
const stage4 = evolve(stage3)
const stage5 = evolve(stage4)
const stage6 = evolve(stage5)









