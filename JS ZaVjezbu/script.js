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
  console.log(
    `\n ran_inclusive(${sp(obj.f)},${sp(obj.l)},${sp(obj.n)}): ${ran_inclusive(
      obj.f,
      obj.l,
      obj.n
    )}`
  )
})

console.log(
  '\n\n 9. Napisati program koji za unijeti URL (string), izvlači (parsira) samo domain \
name i vraća ga kao string. Pretpostaviti da korisnik unosi ispravan URL. \
Primjeri​: \
get_domain​("http://github.com/carbonfive/raygun"), izlaz "github.com" \
get_domain(​"https://google.com"), izlaz "google.com" \
get_domain(​"http://github.com/carbonfive/raygun"), izlaz "github.com" \
get_domain(​"http://www.zombie-bites.com"), izlaz "zombie-bites.com"'
)

const get_domain = url => {
  const err = () => {
    return ''
  }

  url = url.trim()
  if (url === '') return err()

  url = url.toLowerCase()

  // http
  let i = url.indexOf('http')
  if (i === -1) {
    i = 0
  } else {
    i += 4
    if (url[i] === 's') i++
    if (url[i] !== ':') return err()
    i++
    if (url.substr(i, 2) !== '//') return err()
    i += 2
  }

  // find first '/'
  let end_i = url.indexOf('/', i)
  if (end_i === -1) end_i = url.length

  // find first '.'
  let first_dot_i = url.indexOf('.')
  if (first_dot_i === -1) return err()
  first_dot_i++

  while (true) {
    // test length between domain start and '.'
    if (i === first_dot_i - 1) return err()

    let next_dot_i = url.indexOf('.', first_dot_i)
    if (next_dot_i === -1 || next_dot_i >= end_i) break
    //
    i = first_dot_i
    first_dot_i = next_dot_i + 1
  }

  // test length between '.' and domain end
  if (first_dot_i === end_i) return err()

  return url.substr(i, end_i - i)
}

;[
  'https://github./carbonfive/raygun',
  'test',
  '.com',
  'redbull.common.org',
  'http://github.com/carbonfive/raygun',
  'https://google.com',
  'http://www.zombie-bites.com',
  'zombie-bites.com'
].forEach(url => {
  console.log(`\n get_domain(${sp(url)}): ${sp(get_domain(url))}`)
})

console.log(
  '\n\n 10. Dječakov put od škole do kuće je dug. \
Da bi mu bilo interesantnije, odlučio je \
da sabira sve brojeve kuća (na svakoj kući piše adresa, tj. broj) pored kojih \
prođe dok ide do kuće. Nažalost, nemaju sve kuće brojeve na njima, a osim \
toga dječak redovno mijenja ulice, tako da se brojevi ne pojavljuju u nekom \
definisanom redosledu. U jednom momentu tokom šetnje, dječak naiđe na \
kuću na kojoj piše 0, što ga je iznenadilo toliko da je zaboravio (prestao) da \
sabira brojeve nakon što je naišao na ovu kuću. Za zadati niz kuća (svaka \
identifikovana sa brojem) odrediti zbir koji je dječak dobio.  \
Primjer​:\
Za ​input ​= [5, 1, 2, 3, 0, 1, 5, 0, 2], ​output ​treba da bude 11 (5 + 1 + 2 + 3 =\
11)'
)

const sumToZero = niz => {
  let sum = 0
  for (let broj of niz) {
    if (broj == 0) break
    sum += broj
  }
  return sum
}

;[[5, 1, 2, 3, 0, 1, 5, 0, 2], [3, 0, 1, 5, 0, 2], []].forEach(niz => {
  console.log(`\n sumToZero(${sp(niz)}): ${sp(sumToZero(niz))}`)
})

console.log(
  '\n\n 11. Klijenti postavljaju zahtjeve brokeru za kupovinu/prodaju akcija.\
 Zahtjevi mogu da budu jednostavni ili višestruki (više jednostavnih). \
 Zahtjev ima sledeći format:Quote /space/ Quantity /space/ Price /space/ Status \
gdje ​Quote ​predstavlja naziv akcije, sadrži non-whitespace karaktere, \
Quantity ​je prirodan broj koji predstavlja broj akcija koje se prodaju/kupuju,\
Price ​je float koji predstavlja cijenu pojedine akcije (sa decimalnom tačkom \
"." ), ​Status ​je B (buy) ili S (sell) koji predstavlja da li se akcije prodaju ili kupuju.\
Primjer 1 (simple): "GOOG 300 542.0 B" \
Višestruki zahtjevi se sastoje od više simple zahtjeva koji su spojeni zarezom \
Primjer 2 (multiple-višestruki): \
"ZNG 1300 2.66 B,NY 50 56.32 B,OWW 1000 11.623 B,OGG 20 580.1 B" \
Da olakšate brokeru posao vaš zadatak je da mu vratite string "Buy: b Sell: s" \
gdje su b i s formata double zaokruženog na 2 decimalse, b predstavlja \
ukupnu cijenu kupljenih akcija, a s ukupnu cijenu prodatih akcija.\
Output za primjer 2: "Buy: 29499.00 Sell: 0"'
)

const prepBrokerData = stringData => {
  let parsedData = []

  const err = () => 'ERROR'

  const parseData = data => {
    if (data.length === 0) return err()
    let start_i
    let next_i = -1
    do {
      const singeData = new Object()

      // quote
      start_i = next_i + 1
      next_i = data.indexOf(' ', start_i)
      if (next_i === -1) return err()
      singeData.quote = data.substr(start_i, next_i - start_i)

      // quantity
      start_i = next_i + 1
      next_i = data.indexOf(' ', start_i)
      if (next_i === -1) return err()
      singeData.quantity = data.substr(start_i, next_i - start_i)

      // price
      start_i = next_i + 1
      next_i = data.indexOf(' ', start_i)
      if (next_i === -1) return err()
      singeData.price = data.substr(start_i, next_i - start_i)

      // status
      start_i = next_i + 1
      next_i = data.indexOf(',', start_i)
      if (next_i === -1) {
        singeData.status = data.substr(start_i, data.length - start_i)
      } else {
        singeData.status = data.substr(start_i, next_i - start_i)
      }

      parsedData.push(singeData)
    } while (next_i !== -1)
    return
  }

  let error = parseData(stringData)
  if (error !== undefined) return error
  //   console.log(sp(parsedData))

  let buy = 0
  let sell = 0
  parsedData.forEach(line => {
    let total = parseFloat(line.quantity) * parseFloat(line.price)
    if (line.status === 'B') {
      buy += total
    } else if (line.status === 'S') {
      sell += total
    } else return err()
  })

  return `Buy: ${buy.toFixed(2)} Sell: ${sell.toFixed(2)}`
}

;[
  'GOOG 300 542.0 B',
  'ZNG 1300 2.66 B,NY 50 56.32 B,OWW 1000 11.623 B,OGG 20 580.1 B'
].forEach(val => {
  console.log(`\n input: ${sp(val)}`)
  console.log(` prepBrokerData: ${sp(prepBrokerData(val))}`)
})

console.log(
  '\n\n 12. Vaš program treba da nađe najdužu sekvencu izastopnih \
nula za unijetu listu.\
Takodje, treba da vrati pocetnu i krajnju poziciju te podliste u listi \
Primjer​:\
Niz [1, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0] ima tri sekvence uzastopnih nula sa \
dužinama 3, 1 i 4. \
Vraća niz ​[4, 7, 10] gdje je 4 duzina podniza, 7 startna pozicija (uključujući),\
10 krajnja pozicija (ukljucujući)'
)

const findMaxZeroSubArray = niz => {
  let max_count = 0
  let max_start_i = 0
  let max_end_i = 0

  let cur_count = 0
  let cur_start_i = 0

  let isZero = false
  let i

  const saveIfMax = () => {
    if (cur_count > max_count) {
      max_count = cur_count
      max_start_i = cur_start_i
      max_end_i = i - 1
    }
  }
  for (i = 0; i < niz.length; i++) {
    let elem = niz[i]
    if (elem === 0) {
      if (isZero) {
        // inside zero subarray
        cur_count++
      } else {
        // first 0 in new subarray
        isZero = true
        cur_start_i = i
        cur_count = 1
      }
    } else {
      if (isZero) {
        // first non-zero after zero array
        isZero = false
        saveIfMax()
      } else {
        // ordinary non-zero element
      }
    }
  }

  if (isZero) saveIfMax()

  return [max_count, max_start_i, max_end_i]
}

;[
  [1, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0],
  [288, 0, 0, 0, 0, 0, 7, 6, 0, 0, 0, 0, 7, 54, 0, 9, 0, 9, 0]
].forEach(niz => {
  console.log(`\n input: ${sp(niz)}`)
  console.log(` findMaxZeroSubArray: ${sp(findMaxZeroSubArray(niz))}`)
})

console.log(
  '\n\n 13. Napisati funkciju koja za zadati string i slovo vraća sve riječi koje se \
završavaju sa zadatim slovom, indekse zadatog slova, kao i broj riječi koje se \
završavaju sa zadatim slovom u rečenici. \
Primjer​: ​get_words_ends_with_letter ​(“Print only the words that end with the \
chosen letter in those sentences. Example can contains one or more \
sentences.”, “s”) vraća niz objekata sledećeg oblika:\
[ { { word: “words”, position: 19 }, { word : “sentences”, position : 70 },\
num_of_words: 2 }, { { word: “contains”, position: 92}, { word: “sentences”,\
position: 114 }, num_of_words: 2} ]\
Objašnjenje​: objekti unutar liste predstavljaju informacije o svakoj rečenici \
pojedinačno. Objekti u rečenici opisuju: key ​word ​je riječ koja se završava sa \
zadatim slovom (u primjeru je to slovo s), a key ​position ​predstavlja indeks \
slova u unešenom stringu. Key ​num_of_words (​u obije rečenice je to 2​) \
predstavlja broj riječi koje se u rečenici završavaju sa odabranim slovom.'
)

const get_words_ends_with_letter = (in_str, end_char) => {
  let res = []

  let i = 0
  let word

  let dot = false
  let for_sentence = new Object()
  for_sentence.num_of_words = 0
  for_sentence.items = []

  const testWord = (word, n) => {
    if (word[n - 1] === end_char) {
      let for_word = new Object()
      for_word.word = word
      for_word.position = i
      for_sentence.items.push(for_word)
      for_sentence.num_of_words++
    }
  }

  for (word of in_str.split(' ')) {
    let n = word.length
    if (n === 0) {
      // space
      i++
    } else {
      if (word[n - 1] === '.') {
        dot = true

        if (n > 1) testWord(word.substr(0, n - 1), n - 1)
      } else {
        testWord(word, n)
      }

      i += n + 1

      if (dot) {
        dot = false

        res.push(for_sentence)

        for_sentence = new Object()
        for_sentence.num_of_words = 0
        for_sentence.items = []
      }
    }
  }
  return res
}

;[
  {
    in_str:
      'Print only the words that end with the chosen letter in those sentences. Example can contains one or more sentences.',
    end_char: 's'
  },
  {
    in_str:
      ' Print only  the words that end with the chosen letter in those sentences .  Example can contains one or more sentences.',
    end_char: 's'
  }
].forEach(obj => {
  console.log(`\n input string: ${sp(obj.in_str)}`)
  console.log(` end char: ${sp(obj.end_char)}`)
  console.log(
    ` get_words_ends_with_letter:): ${sp(
      get_words_ends_with_letter(obj.in_str, obj.end_char)
    )}`
  )
})

console.log(
  '\n\n 14. Napisati funkciju koja vraća broj cifara u stringu i kreira od njih integer.\
  Primjer​: ​get_digits​(“Hi Mr. Rober53. How are you today? Today is \
  08.10.2019”), vraća 5308102019 i to kao integer. ​Pomoć​: da provjerite da li je \
  karakter slovo koristiti isalpha metod.'
)

// const get_digits = in_str => {
//   return parseInt(in_str.match(/[0-9]/g).join(''))
// }

const get_digits = in_str => {
  let s = ''
  for (let ch of in_str) if (ch >= '0' && ch <= '9') s += ch
  return parseInt(s)
}

;['Hi Mr. Rober53. How are you today? Today is 08.10.2019'].forEach(in_str => {
  console.log(`\n string: ${sp(in_str)}`)
  console.log(` get_digits: ${sp(get_digits(in_str))}`)
})

console.log(
  '\n\n 15. Napisati funkciju koja vraća broj malih i broj velikih \
slova za zadati string.\
Primjer​: ​upper_lower ​(“Hi Mr. Rober. How are you today?”), vraća torku (19, \
4), 19 - broj malih slova, 4 - broj velikih slova. Koristeći dobijeni torku \
izračunati ukupan broj malih i velikih slova. ​Pomoć​: da provjerite da li je \
karakter slovo koristiti isalpha metod.'
)

const lower_upper = in_str => {
  let lo_cnt = 0
  let hi_cnt = 0
  for (let ch of in_str) {
    let ch_down = ch.toLowerCase()
    if (ch.toUpperCase() !== ch_down) {
      if (ch == ch_down) lo_cnt++
      else hi_cnt++
    }
  }
  return [lo_cnt, hi_cnt]
}

;['Hi Mr. Rober. How are you today?'].forEach(in_str => {
  console.log(`\n string: ${sp(in_str)}`)
  console.log(` lower_upper: ${sp(lower_upper(in_str))}`)
})

console.log(
  '\n\n 16. Svakog jutra sva vrata škole su zatvorena. \
Škola je prilično velika, ima N \
vrata. Učenici su počeli da dolaze. Teško je za povjerovati, ali svi oni žele da \
uče. Škola ima N učenika, a oni dolaze jedno po jedno. Kada dijete prođe \
kroz vrata, ono izmijeni status za vrata (Open-> Closed, Closed-> Opened).\
Svaki učenik ima svoj broj, i svaki i-ti mijenja status i-tim vratima. ​Na primjer​: \
kada prvi učenik dođe u školu, on mijenja status svim prvim vratima (otvara ih \
sve). Drugi mijenja status za svaka druga vrata (druga, četvrta, šesta, itd.). \
Treći mijenja status za svaka treća vrata (treća, šesta, itd.). Konačno, zadnji \
učenik (n-ti), mijenja status za svaka n-ta vrata (samo su jedna takva, zadnja). \
Vaš zadatak je da izračunate koliko vrata će ostati otvoreno nakon što dođu \
svi učenici.\
Primjer​:\
Crveni kvadrati – zatvorena vrata, zeleni – otvorena vrata.\
Input​: n – broj vrata i učenika, n ∈ N, n ∈ [1, 100000] \
Output​: o – broj otvorenih vrata, o ∈ N \
doors(5) treba da vrati 2'
)

const bruteForceDoor = n => {
  let doors = []
  let i
  for (i = 1; i <= n; i++) {
    doors.push(0)
  }

  for (i = 1; i <= n; i++) {
    for (let j = i; j <= n; j += i) {
      doors[j - 1] = 1 - doors[j - 1]
    }
  }
  return doors.toString().match(/[1]/g).length
}

const doors = n => {
  return Math.floor(Math.sqrt(n))
}

// for (let k = 1; k < 40; k++) {
//   console.log(`${bruteForceDoor(k)} ${doors(k)}`)
// }

;[5, 24, 25].forEach(n => {
  console.log(`\n broj vrata i učenika: ${sp(n)}`)
  console.log(` broj otvorenih vrata (brute force) : ${sp(bruteForceDoor(n))}`)
  console.log(` broj otvorenih vrata (doors): ${sp(doors(n))}`)
})
