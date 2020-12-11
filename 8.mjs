import fs from 'fs';

const lineToInstruction = line => ((([ins, val]) => ({ins, val}))(line.split(' ')))

const lines = fs.readFileSync('8.input.txt').toString().split("\n")
	.filter(line => line.length > 0)

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
		//console.log(instruction, state.acc)
	}

	return state;
}

const isRecursive = state => state.memo[state.pos]
console.log("Part1", execute(lines.map(lineToInstruction), isRecursive).acc)

lines.forEach((line, idx) => {
	if (['jmp', 'nop'].includes(lineToInstruction(line).ins)) {
		const instructions = lines.map(lineToInstruction)
		instructions[idx].ins = instructions[idx].ins === 'jmp' ? 'nop' : 'jmp'
		const result = execute(instructions, state => isRecursive(state) || state.pos >= instructions.length || state.pos < 0)
		if (result.pos === instructions.length) {
			console.log("Part2", result.acc)
		} else {
			//console.log("Ended")
		}
	}
})
