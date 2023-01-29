const plHeader = document.querySelector('#pl-header')
const plLenInput = document.querySelector('#pl-len input')
const plLenLabel = document.querySelector('#pl-len label')
const plChars = document.querySelector('#pl-chars')
const plInfo = document.querySelector('#pl-info')
const plAdd = document.querySelector('#pl-add')
const plDel = document.querySelector('#pl-del')

let selectedCharElement

const newChar = () => {
  const char = document.createElement('input')
  char.className = 'pl-char'
  char.setAttribute('type', 'text')
  // char.addEventListener('input', charChanged)
  char.addEventListener('focus', charFocus)
  char.addEventListener('focusout', charFocusOut)
  char.addEventListener('keyup', charKeyUp)
  return char
}

const maxPlLen = 40
let plLen
plLenLabel.textContent += ` ( max: ${maxPlLen} chars):`

// return true if inStr is a palindrome
const isPalindrome = inStr => {
  if (inStr === undefined || inStr === null) return false
  inStr = inStr.trim().toLowerCase()
  lenStr = inStr.length
  if (lenStr === 0) return true

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

const charFocus = event => {
  //
  selectedCharElement = event.target

  plAdd.style.display = 'block'
  plAdd.style.top = `${selectedCharElement.offsetTop - plAdd.clientHeight}px`
  plAdd.style.left = `${
    selectedCharElement.offsetLeft - plAdd.clientWidth / 3
  }px`

  plDel.style.display = 'block'
  plDel.style.top = `${selectedCharElement.offsetTop - plDel.clientHeight}px`
  plDel.style.left = `${
    selectedCharElement.offsetLeft +
    selectedCharElement.clientWidth -
    plDel.clientWidth / 3
  }px`
}

let timeoutHideAddDelId
const charFocusOut = event => {
  //
  if (timeoutHideAddDelId !== undefined) {
    clearTimeout(timeoutHideAddDelId)
  }
  timeoutHideAddDelId = setTimeout(() => {
    if (!document.activeElement.classList.contains('pl-char')) {
      plAdd.style.display = 'none'
      plDel.style.display = 'none'
      timeoutHideAddDelId = undefined
    }
  }, 300)
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
  plChars.innerHTML = ''
  for (let i = 0; i < plLen; i++) plChars.appendChild(newChar())
  plChars.querySelectorAll('.pl-char')[0].focus()
  plInfo.textContent = ''
}

const clickAdd = event => {
  if (plLen === maxPlLen) return
  // insert char
  plLen++
  plLenInput.value = plLen
  const next = selectedCharElement.nextSibling
  let char = newChar()
  if (next !== null) {
    // insertbefore
    selectedCharElement.parentNode.insertBefore(char, next)
  } else {
    selectedCharElement.parentNode.appendChild(char)
  }
  showInfo()
  char.focus()
}

const clickDel = event => {
  if (plLen <= 1) {
    selectedCharElement.focus()
    return
  }
  plLen--
  plLenInput.value = plLen
  let next = selectedCharElement.nextSibling
  if (next === null) {
    next = selectedCharElement.previousSibling
  }
  selectedCharElement.remove()
  showInfo()
  next.focus()
}

const leftKeyPressed = event => {
  let prev = event.target.previousSibling
  if (prev !== null) {
    prev.focus()
  } else {
    plChars.lastChild.focus()
  }
}
const rightKeyPressed = event => {
  let next = event.target.nextSibling
  if (next !== null) {
    next.focus()
  } else {
    plChars.firstChild.focus()
  }
}

const charKeyUp = event => {
  // event.preventDefault()
  switch (event.keyCode) {
    case 45: // insert as add
      clickAdd(event)
      return
      break
    case 46: // delete as del
      clickDel(event)
      return
      break
    case 39: //right
      rightKeyPressed(event)
      return
      break
    case 37: //left
      leftKeyPressed(event)
      return
      break
  }
  let ch = event.key
  if (ch.length > 1) return
  if (ch === ' ' || (ch.toLowerCase() >= 'a' && ch.toLowerCase() <= 'z')) {
    // Ok
    event.target.value = ch
    rightKeyPressed(event)
  } else {
    event.target.value = ''
  }
  showInfo()
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
// events
plLenInput.addEventListener('change', changeLen)
plAdd.addEventListener('click', clickAdd)
plDel.addEventListener('click', clickDel)

// start
plLenInput.focus()
