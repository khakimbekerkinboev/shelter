const menuBtns = document.querySelectorAll('.menu-btn')
const secondMenuBtn = menuBtns[1]
const mobileMenu = document.querySelector('.mobile-menu')
const menu = document.querySelector('.menu')

menuBtns.forEach((e) => {
  e.addEventListener('click', () => {
    mobileMenu.classList.toggle('menu-inactive')
    secondMenuBtn.classList.toggle('btn-rotate')
  })
})

Array.from(menu.children).forEach((e) => {
  e.addEventListener('click', () => {
    mobileMenu.classList.add('menu-inactive')
    secondMenuBtn.classList.remove('btn-rotate')
  })
})
