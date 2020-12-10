import fs from 'fs';

const rules = fs.readFileSync('7.input.txt').toString().split("\n")
	.filter(line => line.length > 0)
	//.map(line => line.split(/\n| /).reduce(lineToObj, {}))

const root = rules.reduce((memo, line) => {
	const parts = line.split(' bags contain ')
	//console.log({parts})
	memo[parts[0]] = {};
	parts[1].split(', ').forEach(sub => {
		//console.log({sub})
		if (sub === "no other bags.") return
		const type = sub.substring(2, sub.indexOf(" bag"))
		memo[parts[0]][type] = Number.parseInt(sub)
	});
	return memo
}, {})


const getParents = (root, bag) => {
	return Object.entries(root).reduce((memo, [parent, children]) => {
		//console.log({parent, children})
		if (Object.keys(children).includes(bag)) {
			if (!memo.includes(parent)) {
				memo.push(parent)
				getParents(root, parent).forEach(grandParent => {
					if (!memo.includes(grandParent)) {
						memo.push(grandParent)
					}
				})
			}
		}
		return memo
	}, [])
}

const getContents = (root, rule) => {
	return Object.entries(rule).reduce((memo, [child, qty]) => memo + qty + qty * getContents(root, root[child] || {}), 0)
}

console.log({root})
console.log('Part1', getParents(root, 'shiny gold').length)
console.log('Part2', getContents(root, root['shiny gold']))
//console.log('Part2', groups.map(groupCountEvery).reduce((memo, item) => memo + item, 0))
