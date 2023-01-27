const plHeader = document.querySelector('#pl-header')
const plLenInput = document.querySelector('#pl-len input')
const plChars = document.querySelector('#pl-chars')
const plInfo = document.querySelector('#pl-info')

// return true if inStr is a palindrome
const isPalindrome = inStr => {
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

;['A', ' ', 'ada', 'add', 'addA', 'adIDa', 'adIDAs'].forEach(str =>
  console.log(str, isPalindrome(str))
)
