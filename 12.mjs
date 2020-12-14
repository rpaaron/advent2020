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
