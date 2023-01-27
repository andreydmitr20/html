;(function picSlider (sliderId) {
  const picSliderWrapper = document.querySelector('#pic-slider-wrapper')
  picSliderWrapper.style.position = 'relative'

  const arrowClick = event => {
    if (event.target.classList.contains('arrow-left')) {
      console.log('leftArrow')
    } else {
      console.log('rightArrow')
    }
  }

  const createArrowElement = direction => {
    const arrow = document.createElement('div')
    arrow.className = 'arrow-' + direction
    arrow.style.position = 'absolute'
    arrow.style.zIndex = '2'
    // arrow.style.backgroundColor = 'black'
    arrow.style.filter = 'drop-shadow(0 0 0.5rem black)'
    arrow.style.color = 'white'
    // arrow.style.opacity = '0.5'
    arrow.style.fontSize = `3rem`

    if (direction === 'left') {
      arrow.style.left = '0'
      arrow.style.paddingLeft = '0.5rem'
      arrow.textContent = '<'
    } else {
      arrow.style.right = '0'
      arrow.style.paddingRight = '0.5rem'
      arrow.textContent = '>'
    }

    picSliderWrapper.appendChild(arrow)

    arrow.style.top = `${
      picSliderWrapper.clientHeight / 2 - arrow.clientHeight / 2
    }px`
    arrow.addEventListener('click', arrowClick)

    return arrow
  }

  const createPicElement = () => {
    const pic = document.createElement('div')
    picSliderWrapper.appendChild(pic)
    return pic
  }

  const pic = createPicElement()

  const leftArrow = createArrowElement('left')
  const rightArrow = createArrowElement('right')

  //
  return {
    picSliderWrapper
  }
})()
