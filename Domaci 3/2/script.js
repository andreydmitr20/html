const plHeader = document.querySelector('#pl-header')
const plLenInput = document.querySelector('#pl-len input')
const plLenLabel = document.querySelector('#pl-len label')
const plChars = document.querySelector('#pl-chars')
const plInfo = document.querySelector('#pl-info')

const maxPlLen = 40
let plLen
plLenLabel.textContent += ` ( max: ${maxPlLen} chars):`

// return true if inStr is a palindrome
const isPalindrome = inStr => {
  if (inStr === undefined || inStr === null) return false
  lenStr = inStr.length
  if (lenStr === 0) return true

  inStr = inStr.toLowerCase()
  startI = 0
  endI = lenStr - 1
  while (startI < endI) {
    if (inStr[startI++] !== inStr[endI--]) return false
  }
  return true
}

// ;['A', ' ', 'ada', 'add', 'addA', 'adIDa', 'adIDAs'].forEach(str =>
//   console.log(str, isPalindrome(str))
// )

// check if it is a palindrome and show info
const showInfo = () => {
  // get string
  const chars = plChars.children

  let str = Array.from(chars).reduce((total, elem) => {
    let val = elem.value.toString()
    if (val === '') val = ' '
    return total + val
  }, '')

  // show info
  if (isPalindrome(str)) {
    plInfo.textContent = 'It is a palindrome'
  } else {
    plInfo.textContent = 'It is NOT a palindrome'
  }
}

const charChanged = event => {
  let char = event.target.value.toString().toLowerCase()
  if (char.length === 1 && (char === ' ' || (char >= 'a' && char <= 'z'))) {
    // Ok
    // go to next char
    let next = event.target.nextSibling
    if (next !== null) {
      next.focus()
    } else {
      plLenInput.focus()
    }
  } else {
    event.target.value = ''
  }
  showInfo()
}

const changeLen = event => {
  // console.log(event.target.value)
  plLen = event.target.value
  if (plLen === null || plLen === undefined || plLen === '') {
    plLen = 1
  } else if (plLen > maxPlLen) {
    plLen = maxPlLen
  }
  event.target.value = plLen.toString()

  // make new char places
  let html = ''
  for (let i = 0; i < plLen; i++) html += `<input class="pl-char" type="text">`
  plChars.innerHTML = html
  const chars = plChars.children
  Array.from(chars).forEach(elem =>
    elem.addEventListener('change', charChanged)
  )
  plChars.querySelectorAll('.pl-char')[0].focus()
  plInfo.textContent = ''
}

// const plLenInputKeyUp = event => {
//   if (event.keyCode === 13) plLenInput.focus()
// }
// events
plLenInput.addEventListener('change', changeLen)
// plLenInput.addEventListener('onkeyup', plLenInputKeyUp)

// start
// plLenInput.focus()
