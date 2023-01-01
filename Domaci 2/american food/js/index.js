var menu_shown = false

function click_menu (init) {
  if (init === true) {
    document
      .querySelector('.g1 .menu img')
      .addEventListener('click', click_menu)
    console.log('set onclick')
  } else {
    let ul = document.querySelector('.g1 .menu ul')

    if (menu_shown) {
      ul.style.display = 'none'
      menu_shown = false
    } else {
      ul.style.display = 'block'
      menu_shown = true
    }
    console.log('onclick')
  }
}

// init
window.onload = function () {
  let init = true
  console.log('init..')
  click_menu(init)
  console.log('end of init')
}
