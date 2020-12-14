import fs from 'fs';

const lines = fs.readFileSync('12.input.txt').toString().split("\n")
	.filter(line => line.length > 0)
	.map(line => ({cmd:line[0], o: line.substr(1) * 1}))


console.log({lines})


const ans = lines.reduce((memo, cmd) => {
	switch(cmd.cmd) {
		case 'F':
		switch(((memo.dir % 4)+4)%4) {
			case 0: //E
				memo.h += cmd.o
				break;
			case 1: //S
				memo.v -= cmd.o
				break;

			case 2: //W
				memo.h -= cmd.o
				break;

			case 3: // N
				memo.v += cmd.o
				break;

		}
		break;

		case 'N':
		memo.v += cmd.o
		break;

		case 'S':
		memo.v -= cmd.o
		break;

		case 'E':
		memo.h += cmd.o
		break;

		case 'W':
		memo.h -= cmd.o
		break;

		case 'L':
		memo.dir -= cmd.o / 90;
		break;

		case 'R':
		memo.dir += cmd.o / 90;
		break;
	}

	console.log({cmd, memo})
	return memo

}, {dir: 0, v: 0, h: 0})

console.log({ans})
console.log('Part1', Math.abs(ans.v) + Math.abs(ans.h))

const p2 = lines.reduce((memo, cmd) => {
	var o = cmd.o
	switch(cmd.cmd) {
		case 'F':
			memo.ship.x += memo.h * cmd.o
			memo.ship.y += memo.v * cmd.o
		break;

		case 'N':
		memo.v += cmd.o
		break;

		case 'S':
		memo.v -= cmd.o
		break;

		case 'E':
		memo.h += cmd.o
		break;

		case 'W':
		memo.h -= cmd.o
		break;

		case 'L':
			// x  5  y +1
			// x -1  y +5
			// x -5  y -1
			// x  1  y -5
			while((o -= 90) >= 0) {
				//console.log("hi", cmd.o)
				const x = memo.h
				const y = memo.v

				memo.h = -y
				memo.v = x
			}

		case 'R':
			while((o -= 90) >= 0) {
				const x = memo.h
				const y = memo.v

				memo.h = y
				memo.v = -x
			}
		break;
	}

	console.log({cmd, memo})
	return memo

}, {v: 1, h: 10, ship: {x:0, y:0}})

console.log('Part2', Math.abs(p2.ship.x) + Math.abs(p2.ship.y))
