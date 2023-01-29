function picSlider (sliderId, imgArr) {
  const setStyle = (element, styleObj) => {
    for (let style in styleObj) element.style[style] = styleObj[style]
  }

  const saveStyle = (element, styleArray) => {
    let obj = {}
    styleArray.forEach(style => (obj[style] = element.style[style]))
    return obj
  }

  let bigPicMode = false
  const createPicElement = direction => {
    const pic = document.createElement('img')
    let height
    if (bigPicMode) height = 'auto'
    else height = `${picSliderWrapper.clientHeight}px`
    setStyle(pic, {
      // border : '1px solid green',
      width: `${picSliderWrapper.clientWidth}px`,
      height: height,
      // zIndex: '1',
      objectFit: 'contain',
      position: 'relative',
      borderRadius: '0.3rem',
      padding: '0.2rem',
      // transition: 'transform 1s'
      transitionTimingFunction: 'ease-out'
      // display: 'inline'
    })
    if (direction === 'left' || direction === undefined) {
      picSliderWrapper.insertBefore(pic, picSliderWrapper.firstChild)
    } else {
      picSliderWrapper.insertBefore(
        pic,
        picSliderWrapper.firstChild.nextSibling
      )
    }
    if (!bigPicMode) pic.addEventListener('click', bigPicClick)
    return pic
  }

  const arrowClick = event => {
    if (event.target.classList.contains('left')) {
      onLeftArrowClick()
    } else {
      onRightArrowClick()
    }
  }
  const showArrows = show => {
    let display
    if (show) display = 'block'
    else display = 'none'
    leftArrow.style.display = display
    rightArrow.style.display = display
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
    if (bigPicMode)
      arrow.style.top = `${pic.clientHeight / 2 - arrow.clientHeight / 2}px`
    else
      arrow.style.top = `${
        picSliderWrapper.clientHeight / 2 - arrow.clientHeight / 2
      }px`
  }
  const onResize = event => {
    pic.style.width = `${picSliderWrapper.clientWidth}px`
    if (!bigPicMode) pic.style.height = `${picSliderWrapper.clientHeight}px`
    else {
      pic.style.height = 'auto'
    }
    arrowOnResize(leftArrow)
    arrowOnResize(rightArrow)
  }
  const showPic = (i, picElement) => {
    if (i === undefined) i = 0
    picElement.setAttribute('src', 'img/' + imgArr[i] + '.jpeg')
    picElement.setAttribute('data-i', i)
    setTimeout(onResize, 10)
  }
  let isAnimationInProgress = false
  const onPicAnimationEnd = (event, picSlide) => {
    let picOld = event.target
    pic = picSlide
    pic.style.transition = null

    pic.style.transform = null
    pic.style.top = '0'
    pic.style.left = '0'

    picOld.remove()

    showArrows(isMousePointerInsidePic)
    isAnimationInProgress = false
    onResize()
  }
  const onLeftArrowClick = () => {
    let i = pic.dataset.i
    if (i == 0) i = imgArr.length - 1
    else i--

    pic.style.top = `${-pic.clientHeight - 4}px`
    pic.style.left = '0'

    let picSlide = createPicElement('left')
    showPic(i, picSlide)

    picSlide.style.top = '0'
    picSlide.style.left = `${-pic.clientWidth}px`

    pic.addEventListener('transitionend', event =>
      onPicAnimationEnd(event, picSlide)
    )
    isAnimationInProgress = true
    pic.style.transition = 'transform 0.5s'
    picSlide.style.transition = 'transform 0.5s'
    pic.style.transform = `translateX(100%)`
    picSlide.style.transform = `translateX(100%)`
    showArrows(false)
  }
  const onRightArrowClick = () => {
    let i = pic.dataset.i
    i++
    if (i === imgArr.length) i = 0

    pic.style.top = '0'
    pic.style.left = '0'

    let picSlide = createPicElement('right')
    showPic(i, picSlide)

    picSlide.style.top = `${-pic.clientHeight - 4}px`
    picSlide.style.left = `${pic.clientWidth}px`

    pic.addEventListener('transitionend', event =>
      onPicAnimationEnd(event, picSlide)
    )
    isAnimationInProgress = true
    pic.style.transition = 'transform 0.5s'
    picSlide.style.transition = 'transform 0.5s'
    pic.style.transform = `translateX(-100%)`
    picSlide.style.transform = `translateX(-100%)`
    showArrows(false)
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
  let isMousePointerInsidePic = false
  const picSliderWrapperMouseEnter = event => {
    // to can be focused
    picSliderWrapper.setAttribute('tabindex', '0')
    picSliderWrapper.focus()

    picSliderWrapper.addEventListener('keyup', picSliderWrapperKeyUp)
    picSliderWrapper.style.outline = 'none'
    isMousePointerInsidePic = true
    showArrows(isMousePointerInsidePic)
    onResize()
  }
  const picSliderWrapperMouseLeave = event => {
    picSliderWrapper.removeEventListener('keyup', picSliderWrapperKeyUp)
    picSliderWrapper.removeAttribute('tabindex')
    isMousePointerInsidePic = false
    showArrows(isMousePointerInsidePic)
  }

  let saveStyleObj
  const bigPicClick = event => {
    bigPicMode = true
    pic.removeEventListener('click', bigPicClick)
    //save pic style
    saveStyleObj = saveStyle(picSliderWrapper, [
      'display',
      'marginLeft',
      'marginTop',
      'width',
      'height',
      'overflow',
      'zIndex'
    ])

    setStyle(picSliderWrapper, {
      display: 'block',
      marginLeft: '5vw',
      marginTop: '5vw',
      width: '90vw',
      height: '100%',
      overflow: '',
      zIndex: '5'
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
    bigPicMode = false

    leftArrow.style.display = 'none'
    rightArrow.style.display = 'none'
  }

  // initialization
  const picSliderWrapper = document.querySelector(sliderId)
  setStyle(picSliderWrapper, {
    // border: '1px solid black',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'sans-serif'
  })
  let pic = createPicElement()
  // let picSlide // for slide effect
  const leftArrow = createArrowElement('left')
  const rightArrow = createArrowElement('right')
  new ResizeObserver(onResize).observe(picSliderWrapper)

  picSliderWrapper.addEventListener('mouseenter', picSliderWrapperMouseEnter)
  picSliderWrapper.addEventListener('mouseleave', picSliderWrapperMouseLeave)
  pic.addEventListener('click', bigPicClick)

  showPic(0, pic)

  return {
    picSliderWrapper
  }
}
