const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
	input: fs.createReadStream('3.input.txt'),
	//output: process.stdout,
	//console: true
});

var slope = 3
var pos = 0
var count = 0
;
readInterface.on('line', line => {
	if (line[pos % line.length] === '#') count++;
	pos += slope
	console.log({line})
})

readInterface.on('close', args => {
//	.then((args) => {
	console.log(args, {count})
})

console.log({readInterface})
//for await (const line of readInterface) {
//	//if line[pos % line.length] === '#' count++;
//	//pos += slope
//	console.log({line})
//}

