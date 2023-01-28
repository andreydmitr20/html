function picSlider (sliderId, imgArr) {
  const picSliderWrapper = document.querySelector(sliderId)

  // picSliderWrapper.style.border = '1px solid black'
  const setPicSliderWrapperStyle = () => {
    picSliderWrapper.style.position = 'relative'
    picSliderWrapper.style.overflow = 'hidden'
    picSliderWrapper.style.padding = '2vw'
    picSliderWrapper.style.fontFamily = 'sans-serif'
    picSliderWrapper.style.height = 'auto'
  }
  const createPicElement = () => {
    const pic = document.createElement('img')

    // pic.style.border = '1px solid green'

    /* to let left and right arrows be simmetricically
    we have to remove  pic.style.height =  */
    pic.style.width = '100%'

    pic.style.zIndex = '1'
    pic.style.objectFit = 'contain'
    pic.style.position = 'relative'
    pic.style.borderRadius = '0.3rem'

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
    arrow.className = direction

    arrow.style.display = 'none'
    arrow.style.position = 'absolute'
    arrow.style.zIndex = '2'
    arrow.style.filter = 'drop-shadow(0 0 0.2rem black)'
    arrow.style.color = 'white'
    arrow.style.opacity = '0.6'
    arrow.style.fontSize = '3rem'
    arrow.style.cursor = 'pointer'
    arrow.style.padding = '0.2rem'

    if (direction === 'left') {
      arrow.textContent = '<'
    } else {
      arrow.textContent = '>'
    }

    picSliderWrapper.appendChild(arrow)

    arrow.addEventListener('click', arrowClick)

    return arrow
  }

  const arrowOnResize = arrow => {
    arrow.style.top = `${
      picSliderWrapper.clientHeight / 2 - arrow.clientHeight / 2
    }px`
    if (arrow.classList.contains('left')) {
      arrow.style.left = '1rem'
    } else {
      arrow.style.right = '1rem'
    }
  }
  const onResize = event => {
    arrowOnResize(leftArrow)
    arrowOnResize(rightArrow)
  }
  new ResizeObserver(onResize).observe(picSliderWrapper)

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

  let saveStyleArr
  const savePicSliderWrapperStyle = () => {
    return [
      picSliderWrapper.style.display,
      picSliderWrapper.style.marginLeft,
      picSliderWrapper.style.marginTop,
      picSliderWrapper.style.width,
      picSliderWrapper.style.overflow
    ]
  }
  const restorePicSliderWrapperStyle = arr => {
    picSliderWrapper.style.display = arr[0]
    picSliderWrapper.style.marginLeft = arr[1]
    picSliderWrapper.style.marginTop = arr[2]
    picSliderWrapper.style.width = arr[3]
    picSliderWrapper.style.overflow = arr[4]
  }
  const bigPicClick = event => {
    pic.removeEventListener('click', bigPicClick)
    //save pic style
    saveStyleArr = savePicSliderWrapperStyle()

    restorePicSliderWrapperStyle(['block', '5vw', '5vw', '90vw', ''])

    let closeBtnElement = document.createElement('div')
    closeBtnElement.textContent = 'x'
    closeBtnElement.style.position = 'absolute'
    closeBtnElement.style.zIndex = '3'
    closeBtnElement.style.filter = 'drop-shadow(0 0 0.3rem black)'
    closeBtnElement.style.color = 'white'
    closeBtnElement.style.opacity = '0.6'
    closeBtnElement.style.fontSize = '3rem'
    closeBtnElement.style.cursor = 'pointer'
    closeBtnElement.style.top = '0.5rem'
    closeBtnElement.style.right = '2rem' //`${closeBtn.clientWidth * 3}px`

    picSliderWrapper.appendChild(closeBtnElement)
    closeBtnElement.addEventListener('click', closeBigPicClick)
    onResize()
  }
  const closeBigPicClick = event => {
    // remove closeBtn
    event.target.remove()
    closeBtnElement = undefined

    // reset pic style
    restorePicSliderWrapperStyle(saveStyleArr)
    pic.addEventListener('click', bigPicClick)

    leftArrow.style.display = 'none'
    rightArrow.style.display = 'none'
  }

  // create
  setPicSliderWrapperStyle()
  const pic = createPicElement()
  const leftArrow = createArrowElement('left')
  const rightArrow = createArrowElement('right')

  picSliderWrapper.addEventListener('mouseenter', picSliderWrapperMouseEnter)
  picSliderWrapper.addEventListener('mouseleave', picSliderWrapperMouseLeave)
  pic.addEventListener('click', bigPicClick)

  showPic()

  return {
    picSliderWrapper
  }
}
