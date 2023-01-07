'use strict'

// convert obj and array to str
function sp (part) {
  function sp_array (part) {
    let s = '['
    let n = part.length
    if (n > 0) {
      s += sp(part[0])
      let i = 1
      while (i < n) s += ',' + sp(part[i++])
    }
    return s + ']'
  }

  function sp_obj (part) {
    let s = '{'
    let n = Object.keys(part).length
    if (n > 0) {
      s += sp(Object.keys(part)[0]) + ':' + sp(Object.values(part)[0])
      let i = 1
      while (i < n) {
        s += ',' + sp(Object.keys(part)[i]) + ':' + sp(Object.values(part)[i])
        i++
      }
    }
    return s + '}'
  }

  switch (typeof part) {
    case 'string':
      return '"' + part + '"'
    case 'object':
      if (Array.isArray(part)) return sp_array(part)
      if (part === null) return 'null'
      return sp_obj(part)
    case 'number':
      return part.toString()
    case 'undefined':
      return 'undefined'
    default:
      return part.toString()
  }
}

console.log(
  '\n\n 1. Napisati funkciju koja uklanja sve falsy\
vrijednosti iz niza :'
)

let inputNiz = [1, false, true, null, NaN, undefined, 10, 'test', false]
console.log(`\n input niz: ${sp(inputNiz)}`)
console.log(`output niz: ${sp(inputNiz.filter(element => element !== false))}`)

console.log(
  '\n\n 2. Napisati funkciju koja vraća najmanji indeks na čijoj poziciji treba da se doda\
vrijednost (drugi argument) u niz (prvi argument) koji treba da ostane sortiran\
a. fun([1,2,3,4], 1.5) -> 1 \
b. fun([20,2,3], 19) ->2 jer kad se niz sortira (2,3,20) element 19 može da\
se doda između 3 i 20, tj. na indeksu 2'
)

const najmanjiIndeks = (niz, vrijednost) => {
  let index = 0
  for (let val of niz.sort((a, b) => a - b)) {
    // console.log(`${vrijednost} ${val}`)
    if (vrijednost < val) return index
    index++
  }

  return --index
}

;[
  { niz: [1, 2, 3, 4], v: 1.5 },
  { niz: [20, 2, 3], v: 19 }
].forEach(obj => {
  console.log(`\n Niz: ${sp(obj.niz)}`)
  console.log(` Vriednost: ${obj.v}`)
  console.log(` Result: ${sp(najmanjiIndeks(obj.niz, obj.v))}`)
})

console.log(
  '\n\n 3. Napisati funkciju koja razbija niz (prvi argument) na grupe dužine zadate kao \
drugi argument funkcije i vraća novi 2D niz.\
a. fun([1,2,3,4], 3) -> [[1, 2, 3], [2, 3, 4]]'
)

const razbijaNiz = (niz, sub_len) => {
  let res_niz = []
  let niz_len = niz.length
  if (niz_len === 0 || sub_len === 0) return res_niz
  let i = 0
  while (i + sub_len <= niz_len) {
    res_niz = res_niz.concat([niz.slice(i, i + sub_len)])
    i++
  }
  return res_niz
}

;[
  { niz: [1, 2, 3, 4], len: 3 },
  { niz: [5, 2, 3], len: 1 }
].forEach(obj => {
  console.log(`\n Niz: ${sp(obj.niz)}`)
  console.log(` Len: ${obj.len}`)
  console.log(` Result: ${sp(razbijaNiz(obj.niz, obj.len))}`)
})
