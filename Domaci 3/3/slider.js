function picSlider (sliderId, imgArr) {
  const setStyle = (element, styleObj) => {
    for (let style in styleObj) element.style[style] = styleObj[style]
  }

  const saveStyle = (element, styleArray) => {
    let obj = {}
    styleArray.forEach(style => (obj[style] = element.style[style]))
    return obj
  }

  const createPicElement = () => {
    const pic = document.createElement('img')
    setStyle(pic, {
      // border : '1px solid green',
      width: '100%',
      zIndex: '1',
      objectFit: 'contain',
      position: 'relative',
      borderRadius: '0.3rem'
    })
    picSliderWrapper.appendChild(pic)
    return pic
  }

  const arrowClick = event => {
    if (event.target.classList.contains('left')) {
      onLeftArrowClick()
    } else {
      onRightArrowClick()
    }
  }

  const createArrowElement = direction => {
    const arrow = document.createElement('div')
    setStyle(arrow, {
      display: 'none',
      position: 'absolute',
      zIndex: '2',
      filter: 'drop-shadow(0 0 0.2rem black)',
      color: 'white',
      opacity: '0.6',
      fontSize: '3rem',
      cursor: 'pointer',
      padding: '0.2rem'
    })
    arrow.className = direction
    if (direction === 'left') {
      arrow.textContent = '<'
      arrow.style.left = '1rem'
    } else {
      arrow.textContent = '>'
      arrow.style.right = '1rem'
    }
    picSliderWrapper.appendChild(arrow)

    arrow.addEventListener('click', arrowClick)

    return arrow
  }

  const arrowOnResize = arrow => {
    arrow.style.top = `${
      picSliderWrapper.clientHeight / 2 - arrow.clientHeight / 2
    }px`
  }
  const onResize = event => {
    arrowOnResize(leftArrow)
    arrowOnResize(rightArrow)
  }
  const showPic = i => {
    if (i === undefined) i = 0
    pic.setAttribute('src', 'img/' + imgArr[i] + '.jpeg')
    pic.setAttribute('data-i', i)
    setTimeout(onResize, 10)
  }
  const onLeftArrowClick = () => {
    let i = pic.dataset.i
    if (i == 0) i = imgArr.length - 1
    else i--
    showPic(i)
  }
  const onRightArrowClick = () => {
    let i = pic.dataset.i
    i++
    if (i === imgArr.length) i = 0
    showPic(i)
  }

  const picSliderWrapperKeyUp = event => {
    // console.log(event)
    switch (event.keyCode) {
      case 39: //right
        onRightArrowClick()
        break
      case 37: //left
        onLeftArrowClick()
        break
    }
  }
  const picSliderWrapperMouseEnter = event => {
    // to can be focused
    picSliderWrapper.setAttribute('tabindex', '0')
    picSliderWrapper.focus()

    picSliderWrapper.addEventListener('keyup', picSliderWrapperKeyUp)
    picSliderWrapper.style.outline = 'none'

    leftArrow.style.display = 'block'
    rightArrow.style.display = 'block'
    onResize()
  }
  const picSliderWrapperMouseLeave = event => {
    picSliderWrapper.removeEventListener('keyup', picSliderWrapperKeyUp)
    picSliderWrapper.removeAttribute('tabindex')

    leftArrow.style.display = 'none'
    rightArrow.style.display = 'none'
  }

  let saveStyleObj
  const bigPicClick = event => {
    pic.removeEventListener('click', bigPicClick)
    //save pic style
    saveStyleObj = saveStyle(picSliderWrapper, [
      'display',
      'marginLeft',
      'marginTop',
      'width',
      'overflow'
    ])

    setStyle(picSliderWrapper, {
      display: 'block',
      marginLeft: '5vw',
      marginTop: '5vw',
      width: '90vw',
      overflow: ''
    })

    let closeBtnElement = document.createElement('div')
    closeBtnElement.textContent = 'x'
    setStyle(closeBtnElement, {
      position: 'absolute',
      zIndex: '3',
      filter: 'drop-shadow(0 0 0.3rem black)',
      color: 'white',
      opacity: '0.6',
      fontSize: '3rem',
      cursor: 'pointer',
      top: '0.5rem',
      right: '2rem'
    })

    picSliderWrapper.appendChild(closeBtnElement)
    closeBtnElement.addEventListener('click', closeBigPicClick)
    onResize()
  }
  const closeBigPicClick = event => {
    // remove closeBtn
    event.target.remove()
    closeBtnElement = undefined

    // reset pic style
    setStyle(picSliderWrapper, saveStyleObj)
    pic.addEventListener('click', bigPicClick)

    leftArrow.style.display = 'none'
    rightArrow.style.display = 'none'
  }

  // initialization
  const picSliderWrapper = document.querySelector(sliderId)
  setStyle(picSliderWrapper, {
    // border : '1px solid black',
    position: 'relative',
    overflow: 'hidden',
    padding: '1vw',
    fontFamily: 'sans-serif',
    height: 'auto'
  })
  const pic = createPicElement()
  const leftArrow = createArrowElement('left')
  const rightArrow = createArrowElement('right')
  new ResizeObserver(onResize).observe(picSliderWrapper)

  picSliderWrapper.addEventListener('mouseenter', picSliderWrapperMouseEnter)
  picSliderWrapper.addEventListener('mouseleave', picSliderWrapperMouseLeave)
  pic.addEventListener('click', bigPicClick)

  showPic()

  return {
    picSliderWrapper
  }
}
