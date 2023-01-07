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

console.log(
  '\n\n 4. Napisati program koji za n elemenata niza (brojevi od 1 do n) generiše parove \
tako da se niti jedan od elemenata koji je već u paru ne ponovi više ni u \
jednom paru. Npr. (1,4), (2,3), (5,8) su ok, ali (1,6) nije jer je 1 već u paru sa \
4, (2,5) takođe nije jer je 2 u paru sa 3, a 5 u paru sa 8. \
a. Koristiti Math.floor() - zaokružuje na donje cijelo i Math.random() - \
vraca decimilan broj između 0 i 1 (uključujući 0, ne uključujući 1) i. \
 Math.random() * 10 - vraća brojeve od 0 do 9,99999.... \
b. Može vam pomoći i array.splice(element_index, 1) u kombinaciji sa \
arr.indexOf(item) [ako ne nađe item u arr vrati -1] i. \
 [“a”,”b”,”c”].splice(2, 1) => [“a”, “b”]'
)

const randomNiz = n => {
  let res_niz = []
  while (res_niz.length !== n) {
    let rand = Math.floor(Math.random() * (n + 1))
    if (rand !== 0 && res_niz.indexOf(rand) === -1)
      res_niz = res_niz.concat(rand)
  }
  return res_niz
}

const randomPairs = niz => {
  let res_niz = []
  let n = niz.length

  while (n > 0) {
    if (n == 1) {
      res_niz = res_niz.concat([niz])
      break
    }
    res_niz = res_niz.concat([niz.splice(0, 2)])
    n -= 2
  }
  return res_niz
}

;[0, 1, 4, 9].forEach(n => {
  let niz = randomNiz(n)
  console.log(`\n N: ${sp(n)}`)
  console.log(` Niz: ${sp(niz)}`)
  console.log(` Result: ${sp(randomPairs(niz))}`)
})

console.log(
  '\n\n 5. Napisati funkciju koja provjerava da li se string (prvi argument funkcije) \
završava sa target stringom (drugi argument funkcije)'
)

const isStringEndedWith = (end_str, inp_str) => {
  inp_str = inp_str.trim()
  let i = inp_str.indexOf(end_str, 0)
  let j = -1
  while (i !== -1) {
    j = i
    i = inp_str.indexOf(end_str, j + 1)
  }
  return j !== -1 && j + end_str.length === inp_str.length
}

;[
  { end_str: 'end', inp_str: 'end the endend ' },
  { end_str: 'enk', inp_str: ' end endthe end enk ' },
  { end_str: 'end', inp_str: 'endendthe end1' }
].forEach(obj => {
  console.log(`\n ending substring: ${sp(obj.end_str)}`)
  console.log(` string: ${sp(obj.inp_str)}`)
  console.log(
    ` isStringEndedWith: ${sp(isStringEndedWith(obj.end_str, obj.inp_str))}`
  )
})

console.log(
  '\n\n 6. Napisati funkciju koja skraćuje string (prvi argument) do unijete dužine (drugi \
    argument). Na kraj stringa dodati ...'
)

const dottedStr = (inp_str, str_len) => {
  let n = inp_str.length
  if (str_len > n) return inp_str + '.'.repeat(str_len - n)
  return inp_str.substr(0, str_len) + '.'.repeat(n - str_len)
}

;[
  { inp_str: 'test string', n: 0 },
  { inp_str: 'test string', n: 4 },
  { inp_str: 'test string', n: 8 },
  { inp_str: 'test string', n: 13 }
].forEach(obj => {
  console.log(`\n string: ${sp(obj.inp_str)}`)
  console.log(` cut length: ${sp(obj.n)}`)
  console.log(` truncStr: ${sp(dottedStr(obj.inp_str, obj.n))}`)
})

console.log(
  '\n\n 7. Narcissistic Number je broj čija suma cifara (tog broja) stepenova sa njegovim \
brojem cifara daje isti taj broj. \
Primjer 1​: 153 (3 cifre) \
1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153 \
Primjer 2​: 1634 (4 cifre): \
1^4 + 6^4 + 3^4 + 4^4 = 1 + 1296 + 81 + 256 = 1634 \
Vaš program treba da vrati ​true ​ili ​false ​u zavisnosti od toga da li je broj \
Narcissitic ili nije. Input je uvijek validan broj.'
)

const isNarcissitic = broj => {
  let str_broj = broj.toString()
  let str_broj_len = str_broj.length

  let sum = 0
  let i = 0
  //   while (i < str_broj_len) sum += str_broj[i++].charCodeAt() ** str_broj_len
  while (i < str_broj_len) {
    sum += (str_broj[i++].charCodeAt() - 48) ** str_broj_len
  }
  return sum === broj
}

;[0, 12, 153, 122, 371, 1634].forEach(broj => {
  console.log(`\n broj: ${sp(broj)}`)
  console.log(` isNarcissitic: ${sp(isNarcissitic(broj))}`)
})

console.log(
  '\n\n 8. Napisati program koji provjerava da li se zadati broj nalazi u zadatom \
segmentu. Primjer: ​ran_inclusive( ​ 3, 10, 5) vraća ​true ​jer je 3 <= 5 <= 10, \
ran_inclusive (- ​ 10, 13, -25) vraća ​false ​jer je -25 manji od -10, a samim tim i \
od 13, pa nije iz zadatog segmenta'
)

const ran_inclusive = (first, last, num) => {
  if (first > last) {
    let i = last
    last = first
    first = i
  }

  return first <= num && num <= last
}

;[
  { f: 3, l: 10, n: 5 },
  { f: -10, l: 13, n: -25 },
  { f: -10, l: -25, n: -11 }
].forEach(obj => {
  console.log(`\n ran_inclusive(${sp(obj.f)},${sp(obj.l)},${sp(obj.n)}):`)
  console.log(`${ran_inclusive(obj.f, obj.l, obj.n)}`)
})
