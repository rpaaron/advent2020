import fs from 'fs';

const items = fs.readFileSync('21.input.txt').toString()
	.trim()
	.split("\n")
	.map(line => line.split(' (contains '))
	.map(([ingrediants, allergens]) => ({i: ingrediants.trim().split(' '), a: allergens.slice(0, -1).split(', ')}))


console.dir({items}, {depth: null})

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const getAllergens = items => items.reduce((memo, item) => [...memo, ...item.a], []).filter(onlyUnique)
const getIngredients = items => items.reduce((memo, item) => [...memo, ...item.i], []).filter(onlyUnique)

const getAllFoodsContaining = (items, allergen) => items.filter(i => i.a.includes(allergen))
const getAllFoodsWithIngrediant = (foods, ingrediant) => foods.filter(f => f.i.includes(ingrediant))

const getCommonIndgrediant = (foods) =>
	getIngredients(foods).filter(ing => foods.every(food => food.i.includes(ing)))

const go = (items) => {
	var allergens = getAllergens(items)
	while(allergens.length) {
		for (const allergen of allergens) {
			console.log(allergen)
			const foods = getAllFoodsContaining(items, allergen)
			const commonIngrediant = getCommonIndgrediant(foods)
			if (commonIngrediant.length === 1) {
				allergens = allergens.filter(x => x != allergen)
				items = items.map(item => ({i: item.i.filter(ing => ing != commonIngrediant[0]),
							   a: item.a.filter(alg => alg != allergen)})
				)
				console.log('found allergen', allergen, 'in', commonIngrediant[0])
			}
		}
	}
	console.log('Remnainging', items)
	const ingred = getIngredients(items)
	console.log('Remnainging', ingred)

	console.log('Remaining', ingred.reduce((memo, ing) => memo + getAllFoodsWithIngrediant(items, ing).length, 0))
}

console.log('allergens', getAllergens(items))
go(items)
const reverse = (string) => Array.from(string).reverse().join('')

const sum = (memo, item) => memo + item
const mul = (memo, item) => memo * item



