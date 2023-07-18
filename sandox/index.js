// Spread operator

// pour les tableaux

const arra1 = [2, 4, 7]
const arra2 = [3, 5, 8]

const newArr = [...arra1, ...arra2]

console.log(newArr)

// pour les objets

const amir = {
    name: 'Amir',
    age: 36
}

const amirWithEmail = {
    ...amir,
    email: 'amir@example.com'

}

console.log(amirWithEmail)

const oldAmir = {
    ...amir,
    age: 37
}

console.log(oldAmir)

// Exercices

const arr1 = ["Bonjour", "tout", "le monde"]
const arr2 = ["Salut", "à tous"]
const arr3 = ["je m'appelle", "mon nom est"]
const arr4 = ["Paul", "Doazan"]
const arr5 = ["Antoine", "Dupont"]


const newArra = [...arr1, arr3[0], ...arr5]
const result = newArra.join(' ')

console.log(result)

const newArray = [...arr2, arr3[1], ...arr4]
const result2 = newArray.join(' ')

console.log(result2)

// Confusion avec le rest parameter
function sum(...params) {
    let total = 0
    params.forEach(param => total += param)
    return total
}
console.log(sum(4, 5, 7))

