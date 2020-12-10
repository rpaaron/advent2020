import fs from 'fs';

const first_instructions = fs.readFileSync('8.input.txt').toString().split("\n")
	.filter(line => line.length > 0)
	.map(line => ((([ins, val]) => ({ins, val}))(line.split(' '))))

function execute(instructions, terminate) {
	const state = {
		memo: {},
	 	pos: 0,
	        acc: 0,
	}

	while (true) {
		//console.log({pos})
		if (terminate(state)) break
		state.memo[state.pos] = true;
		const instruction = instructions[state.pos]
		switch (instruction.ins) {
			case 'nop':
				state.pos++;
				break
			case 'acc': 
				state.acc += instruction.val * 1
				state.pos++;
				break
			case 'jmp':
				state.pos += instruction.val * 1
				break
			default:
				console.err(instruction)
				throw {}
		}
	}

	return state;
}

console.log("Part1", execute(first_instructions, state => state.memo[state.pos]).acc)

//const alternatives = first_instructions.reduce((memo, instr, idx) => {
//	if (instr === 'jmp') {
//		first_instructions[idx]
//	}
//	return memo
//}, [first_instructions])
//console.log({acc})
