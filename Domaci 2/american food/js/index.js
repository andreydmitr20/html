// menu for small screens
var menu_shown = false
function menuClick (job) {
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

  function menuRestore () {
    if (window.innerWidth >= 600) {
      menu_shown = false
      ul = document.querySelector(menu_sel)
      ul.style.display = null
    }
  }

  console.log('menuClick.' + job)
  switch (job) {
    case 'init':
      document
        .querySelector('.g1 .menu img')
        .addEventListener('click', menuClick)
      window.addEventListener('resize', menuRestore)
      break
    case 'hide':
      menuHide()
      break
    case 'show':
      menuShow()
    default:
      if (menu_shown) {
        menuHide()
      } else {
        menuShow()
      }
      break
  }
}
