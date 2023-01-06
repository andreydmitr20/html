'use strict'

console.log('1. Napisati funkciju koja uklanja sve falsy\
vrijednosti iz niza :')

let inputNiz = [1, false, true, null, NaN, undefined, 10, 'test', false]
console.log(`\n input niz: ${inputNiz}`)
console.log(`output niz: ${inputNiz.filter(element => element !== false)}`)

console.log(
  '\n\n2. Napisati funkciju koja vraća najmanji indeks na čijoj poziciji treba da se doda\
vrijednost (drugi argument) u niz (prvi argument) koji treba da ostane sortiran\
a. fun([1,2,3,4], 1.5) -> 1 \
b. fun([20,2,3], 19) ->2 jer kad se niz sortira (2,3,20) element 19 može da\
se doda između 3 i 20, tj. na indeksu 2'
)

const najmanjiIndeks = (niz, vrijednost) => {
  let index = 0
  for (let val of niz.sort((a, b) => a - b)) {
    // console.log(`${vrijednost} ${val}`)
    if (vrijednost < parseFloat(val)) return index
    index++
  }

  return --index
}

;[
  { niz: [1, 2, 3, 4], v: 1.5 },
  { niz: [20, 2, 3], v: 19 }
].forEach(obj => {
  console.log(`\n Niz: ${obj.niz}`)
  console.log(` Vriednost: ${obj.v}`)
  console.log(` Result: ${najmanjiIndeks(obj.niz, obj.v)}`)
})
