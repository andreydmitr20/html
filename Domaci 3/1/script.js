function xoGame (divId, dimension) {
  const setStyle = (element, styleObj) => {
    for (let style in styleObj) element.style[style] = styleObj[style]
  }

  const saveStyle = (element, styleArray) => {
    let obj = {}
    styleArray.forEach(style => (obj[style] = element.style[style]))
    return obj
  }

  // return true if standoff
  // return false if nobody win yet
  // return wonArray if current gamer has won
  const checkEndGame = () => {
    let wonArray = []
    let elem
    // rows
    for (let row = 0; row < dimension; row++) {
      wonArray = []

      for (let col = 0; col < dimension; col++) {
        elem = xoArray[row][col]
        if (elem !== curGamerChar) break
        wonArray.push([row, col])
      }
      if (wonArray.length === dimension) return wonArray
    }
    // cols
    for (let col = 0; col < dimension; col++) {
      wonArray = []

      for (let row = 0; row < dimension; row++) {
        elem = xoArray[row][col]

        if (elem !== curGamerChar) break
        wonArray.push([row, col])
      }
      if (wonArray.length === dimension) return wonArray
    }
    // diag \
    wonArray = []
    for (let col = 0; col < dimension; col++) {
      elem = xoArray[col][col]
      if (elem !== curGamerChar) break
      wonArray.push([col, col])
    }
    if (wonArray.length === dimension) return wonArray
    // diag /
    wonArray = []
    row = dimension - 1
    for (let col = 0; col < dimension; col++) {
      elem = xoArray[row][col]
      if (elem !== curGamerChar) break
      wonArray.push([row, col])
      row--
    }
    if (wonArray.length === dimension) return wonArray

    let endGame = movesToTheEndGame === 0

    return endGame
  }
  const showWinLine = (arr, color) => {
    for (let i = 0; i < dimension; i++) {
      let xy = `${arr[i][0]}-${arr[i][1]}`
      let cell = xo.querySelector(`[data-xy="${xy}"]`)
      cell.style.backgroundColor = color
    }
  }

  // start new game
  const startNewGame = () => {
    let gx = gamerxInput.value.toLowerCase()
    let go = gameroInput.value.toLowerCase()
    if (
      gx === '' ||
      go === '' ||
      gx === go ||
      gamerxInput.style.color === gameroInput.style.color
    ) {
      xoInfo.textContent = 'Enter different names and colors'
      return
    }
    xo.style.display = 'flex'
    xo.style.transform = xoTransform

    curGamerChar = 'X'
    for (let row = 0; row < dimension; row++) {
      for (let col = 0; col < dimension; col++) {
        xoArray[row][col] = 0
        let cell = xo.querySelector(`[data-xy="${row}-${col}"]`)
        cell.innerHTML = ''
        cell.style.backgroundColor = null
      }
    }

    movesToTheEndGame = dimension * dimension

    disableControl(true)

    showMoveInfo()
  }

  const disableControl = disable => {
    // console.log(disable)
    if (disable) {
      display = 'none'
    } else {
      display = 'block'
    }
    btnNewGame.style.display = display
    gamerxInput.disabled = disable
    gamerxColor.disabled = disable
    gameroInput.disabled = disable
    gameroColor.disabled = disable
  }

  const showMoveInfo = () => {
    xoInfo.textContent = `MOVE ${
      curGamerChar === 'X'
        ? gamerxInput.value.toUpperCase()
        : gameroInput.value.toUpperCase()
    }`
  }

  const showScore = () => {
    let gamerx = gamerxInput.value.toLowerCase()
    let gamerxScore = 0
    if (gamerx !== '') gamerxScore = localStorage.getItem('xo' + gamerx) || '0'

    let gamero = gameroInput.value.toLowerCase()
    let gameroScore = 0
    if (gamero !== '') gameroScore = localStorage.getItem('xo' + gamero) || '0'

    xoInfo.textContent = `${gamerxScore} : ${gameroScore}`
  }

  const xoTransformEnd = event => {
    if (movesToTheEndGame === 0) {
      disableControl(false)
      // get and show score
      showScore()
    } else disableControl(true)
  }

  const clickCell = event => {
    if (movesToTheEndGame === 0) {
      xo.style.transform = `rotate(${
        (Math.random() < 0.5 ? 1 : -1) * Math.random() * 360
      }deg)`
      return
    }
    let xy = event.target.dataset.xy
    if (xy !== undefined) {
      // check if free cell
      let x = parseInt(xy)
      let y = parseInt(xy.substr(xy.indexOf('-') + 1))
      if (xoArray[x][y] !== 0) {
        console.log('busy cell')
        return
      }

      xoArray[x][y] = curGamerChar
      movesToTheEndGame--

      let color
      if (curGamerChar === 'X') color = gamerxInput.style.color
      else color = gameroInput.style.color

      let cell = xo.querySelector(`[data-xy="${xy}"]`)
      cell.innerHTML = `
        <div style="transform:
        rotate(45deg)
        translate(0,0);
        color:${color};
        font-size:4rem">
          ${curGamerChar}
        </div>
      `
      // check
      let check = checkEndGame()
      if (check === false) {
        // next gamer
        nextGamer()
        return
      } else if (check === true) {
        // standoff
        xoInfo.textContent = 'STANDOFF'
      } else {
        // win
        let winner =
          curGamerChar === 'X' ? gamerxInput.value : gameroInput.value
        xoInfo.textContent = `WINNER is ${winner.toUpperCase()} !`
        movesToTheEndGame = 0
        // save score
        let score = localStorage.getItem('xo' + winner.toLowerCase())
        if (score === null || score === undefined) score = 0
        score++
        localStorage.setItem('xo' + winner.toLowerCase(), score)
        // show winning line
        showWinLine(check, 'blue')
      }

      xo.addEventListener('transformend', xoTransformEnd)
      xo.style.transform = `rotate(${
        (Math.random() < 0.5 ? 1 : -1) * Math.random() * 360
      }deg)`

      // change X and O
      let val = gamerxInput.value
      let col = gamerxColor.value
      gamerxInput.value = gameroInput.value
      gamerxInput.style.color = gameroColor.value
      gamerxColor.value = gameroColor.value
      gameroInput.value = val
      gameroInput.style.color = col
      gameroColor.value = col
    }
  }

  const nextGamer = () => {
    if (curGamerChar === 'X') curGamerChar = 'O'
    else curGamerChar = 'X'
    // info
    showMoveInfo()
  }
  const setGamerXColor = event => {
    gamerxInput.style.color = event.target.value
  }
  const setGamerOColor = event => {
    gameroInput.style.color = event.target.value
  }
  // initialization
  let movesToTheEndGame = 0
  let curGamerChar

  const xoInfo = document.querySelector('#xo-info')

  const btnNewGame = document.querySelector('#btn-new-game')
  btnNewGame.addEventListener('click', startNewGame)

  const gamerxColor = document.querySelector('#gamerx-color')
  gamerxColor.addEventListener('input', setGamerXColor)
  const gamerxInput = document.querySelector('#gamerx')
  gamerxInput.addEventListener('input', showScore)

  const gameroColor = document.querySelector('#gamero-color')
  gameroColor.addEventListener('input', setGamerOColor)
  const gameroInput = document.querySelector('#gamero')
  gameroInput.addEventListener('input', showScore)

  const xo = document.querySelector(divId)
  xo.addEventListener('transitionend', xoTransformEnd)
  const xoElemWidth = 5
  const xoTransform = 'rotateX(40deg) rotateZ(-45deg)'
  setStyle(xo, {
    display: 'flex',
    flexFlow: 'row wrap',
    width: `${dimension * xoElemWidth}rem`,
    filter: 'drop-shadow(0.2rem 0.2rem 0.2rem grey)',
    transition: 'all 3s',
    marginTop: '3rem'
  })

  let xoArray = []
  for (let row = 0; row < dimension; row++) {
    xoArray.push([])
    for (let col = 0; col < dimension; col++) {
      xoArray[row].push(0)
      let element = document.createElement('div')
      setStyle(element, {
        width: `${xoElemWidth}rem`,
        height: `${xoElemWidth}rem`,
        border: '0.1rem solid black',
        transition: 'all 2s'
      })
      element.dataset.xy = `${row}-${col}`
      element.addEventListener('click', clickCell)
      xo.appendChild(element)
    }
  }

  return xo
}
