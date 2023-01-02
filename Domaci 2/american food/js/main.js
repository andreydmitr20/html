//
function windowResize () {
  menu('resize')
}

// init
window.onload = function () {
  console.log('init..')

  window.addEventListener('resize', windowResize)

  menu('init')

  console.log('end of init')
}
