import fs from 'fs';

const seats = fs.readFileSync('5.input.txt').toString().split("\n")
	//.map(line => line.split(/\n| /).reduce(lineToObj, {}))


const toSeatNum = seat => {
	const obj = Array.from(seat).reduce((memo, char, idx) => {
		if (idx <= 6) {
			memo.row <<= 1;
			memo.row += (char === 'F') ? 0 : 1;
		} else {
			memo.col <<= 1;
			memo.col += (char === 'L') ? 0 : 1;
		}
		return memo;

	}, {row: 0, col: 0})
	obj.seat = obj.row * 8 + obj.col;
	return obj
}

//seats.forEach(seat => {
//	console.log('seat', seat, toSeatNum(seat))
//})


const seatObjs = seats.map(toSeatNum)
console.log('Part1', seatObjs.reduce((memo, seat) => seat.seat > memo.seat ? seat : memo, {seat: 0}).seat)

//console.log(seatObjs.sort((a,b) => a.seat < b.seat ? -1 : 1))
console.log('Part2', seatObjs.filter((seat) => {
	return !seatObjs.find(s => s.seat === seat.seat + 1) &&
	       seatObjs.find(s => s.seat === seat.seat + 2)
})[0].seat + 1)
