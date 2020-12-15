function say(db, turn, num) {
	//console.log({db, turn, num})
	db.last = num
	db[num] = db[num] || {times: 0, lastTurn: turn, diff: 0}
	db[num].times++
	db[num].diff = turn - db[num].lastTurn
	db[num].lastTurn = turn
}

const makeDb = (arr, size) => arr.reduce((memo, item, idx) => (memo[item] = {times: 1, lastTurn: idx +1, diff: 0}, memo.last = item, memo), Array(size))

function answer(start, turns) {

	const db = makeDb(start, turns)

	for(var i = Object.keys(db).length; i <= turns; i++) {
		//if (i % 100000 === 0) console.log(i)
		if (db[db.last].times == 1) {
			say(db, i, 0)
		} else {
			say(db, i, db[db.last].diff)
		}
	}

	console.log({arr: start, ans: db.last, turns})
}

const times = 30000000 // 2020
answer([0,3,6], times)
answer([1,3,2], times)
answer([1,2,3], times)
answer([2,3,1], times)
answer([3,2,1], times)
answer([3,1,2], times)
answer([0,12,6,13,20,1,17], times)
