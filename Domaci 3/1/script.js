function xoGame (divId, dimension) {
  const setStyle = (element, styleObj) => {
    for (let style in styleObj) element.style[style] = styleObj[style]
  }

  const saveStyle = (element, styleArray) => {
    let obj = {}
    styleArray.forEach(style => (obj[style] = element.style[style]))
    return obj
  }

  // initialization
  const xo = document.querySelector(divId)
  const xoElemWidth = 5
  const xoTransform = 'rotateX(50deg) rotateY(0deg) rotateZ(-45deg)'
  setStyle(xo, {
    display: 'flex',
    flexFlow: 'row wrap',
    width: `${dimension * xoElemWidth}rem`,
    transform: xoTransform
  })
  xoArray = []
  for (let row = 0; row < dimension; row++) {
    xoArray.push([])
    for (let col = 0; col < dimension; col++) {
      xoArray[row].push(0)
      let element = document.createElement('div')
      setStyle(element, {
        width: `${xoElemWidth}rem`,
        height: `${xoElemWidth}rem`,
        border: '0.1rem solid black'
      })
      element.dataset.xy = `${row}-${col}`
      xo.appendChild(element)
    }
  }
  console.log(xoArray)

  return xo
}
