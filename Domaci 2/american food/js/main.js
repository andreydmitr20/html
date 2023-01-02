// resize event
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

// menu
// menu for small screens
var menu_shown = false
function menu (job) {
  const menu_sel = '.g1 .menu ul'

  function menuHide () {
    if (menu_shown) {
      let ul = document.querySelector(menu_sel)
      ul.style.display = 'none'
      menu_shown = false
    }
  }

  function menuShow () {
    ul = document.querySelector(menu_sel)
    ul.style.display = 'block'
    menu_shown = true
  }

  function menuResize () {
    if (window.innerWidth >= 600) {
      menu_shown = false
      ul = document.querySelector(menu_sel)
      ul.style.display = null
    }
  }

  console.log('menu.' + job)
  switch (job) {
    case 'init':
      document.querySelector('.g1 .menu img').addEventListener('click', menu)

      break
    case 'hide':
      menuHide()
      break
    case 'show':
      menuShow()
      break
    case 'resize':
      menuResize()
      break
    default:
      if (menu_shown) {
        menuHide()
      } else {
        menuShow()
      }
      break
  }
}
