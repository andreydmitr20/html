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
    return movesToTheEndGame === 0
  }
  const showWinLine = (arr, color) => {
    for (let i = 0; i < dimension; i++) {
      let xy = `${arr[i][0]}-${arr[i][1]}`
      let cell = xo.querySelector(`[data-xy="${xy}"]`)
      console.log(cell)
      cell.style.backgroundColor = color
    }
  }

  const startNewGame = () => {
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
  }

  const clickCell = event => {
    console.log(event.target)
    if (movesToTheEndGame === 0) return

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
      let cell = xo.querySelector(`[data-xy="${xy}"]`)
      cell.innerHTML = `
        <div style="transform:
        rotate(45deg)
        translate(0,0);
        color:red;
        font-size:4rem">
          ${curGamerChar}
        </div>
      `
      // check
      let check = checkEndGame()
      if (check === false) {
        // next gamer
        nextGamer()
      } else if (check === true) {
        // standoff
        console.log('standoff')
      } else {
        // win
        console.log('win', curGamerChar)
        // saveResult()
        movesToTheEndGame = 0
        showWinLine(check, 'blue')
        // setTimeout(showWinLine, 2000, check, null)
      }
    }
  }

  const nextGamer = () => {
    if (curGamerChar === 'X') curGamerChar = 'O'
    else curGamerChar = 'X'
    // info
  }

  // initialization
  const xo = document.querySelector(divId)
  const xoElemWidth = 5
  const xoTransform = 'rotateX(40deg) rotateZ(-45deg)'
  setStyle(xo, {
    display: 'flex',
    flexFlow: 'row wrap',
    width: `${dimension * xoElemWidth}rem`,
    transform: xoTransform,
    marginTop: '2rem'
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

  let movesToTheEndGame
  let curGamerChar
  startNewGame()
  return xo
}
