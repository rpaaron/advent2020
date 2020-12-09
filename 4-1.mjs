import fs from 'fs';


const fields = [ 
	'byr',
	'iyr',
	'eyr',
	'hgt',
	'hcl',
	'ecl',
	'pid',
	//'cid'
]

const eyecolor = 'amb blu brn gry grn hzl oth'.split(' ')

//    'byr' (Birth Year)
//    'iyr' (Issue Year)
//    'eyr' (Expiration Year)
//    'hgt' (Height)
//    'hcl' (Hair Color)
//    'ecl' (Eye Color)
//    'pid' (Passport ID)
//    'cid' (Country ID)

const lineToObj = (obj, line) => {
	const parts = line.split(':')
	obj[parts[0]] = parts[1]
	return obj
}

const fieldsPresent = (pass) => fields.every(field => pass[field])
const extraFields = (pass) => !Object.keys(pass).every(field => field == 'cid' || fields.includes(field))

const validHeight = (height) => {
	const val = Number.parseInt(height)
	if (height.endsWith('cm')) return ((val >= 150) && val <= 193)
	if (height.endsWith('in')) return ((val >= 59) && val <= 76)
	return false
}

const isValid = (pass) =>
	(pass.byr >= 1920) && pass.byr <= 2002 &&
	(pass.iyr >= 2010) && pass.iyr <= 2020 &&
	(pass.eyr >= 2020) && pass.eyr <= 2030 &&
	validHeight(pass.hgt) &&
	(/#[0-9a-f]{6}$/.test(pass.hcl)) &&
	eyecolor.includes(pass.ecl) &&
	/[0-9]{9}$/.test(pass.pid)


const passports = fs.readFileSync('4.input.txt').toString().split("\n\n")
	.map(line => line.split(/\n| /).reduce(lineToObj, {}))

console.log('Total', passports.length)
const part1Passports = passports.filter(fieldsPresent)
console.log('Part1', part1Passports.length)
// 128 too high, 127 is the answer, but why?
const part2Passports = part1Passports.filter(isValid)
console.log('Part2', part2Passports.length)
//console.dir(part1Passports, {'maxArrayLength': null}) //.filter(extraFields))

//console.dir(part2Passports, {'maxArrayLength': null})
//console.dir(part2Passports.map(obj => obj.byr).sort(), {'maxArrayLength': null})
//console.dir(part2Passports.map(obj => obj.iyr).sort(), {'maxArrayLength': null})
//console.dir(part2Passports.map(obj => obj.eyr).sort(), {'maxArrayLength': null})
//console.dir(part2Passports.map(obj => obj.hgt).sort(), {'maxArrayLength': null})
//console.dir(part2Passports.map(obj => obj.hcl).sort(), {'maxArrayLength': null})
//console.dir(part2Passports.map(obj => obj.ecl).sort(), {'maxArrayLength': null})
//console.dir(part2Passports.map(obj => obj.pid).sort(), {'maxArrayLength': null})
//console.dir(part2Passports.map(obj => obj.cid).sort(), {'maxArrayLength': null})
