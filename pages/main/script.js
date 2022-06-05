//==================
//Burger menu
//==================
const navbar = document.querySelector('.navbar')
const menuBtns = document.querySelectorAll('.menu-btn')
const secondMenuBtn = menuBtns[1]
const mobileMenu = document.querySelector('.mobile-menu')
const menu = document.querySelector('.menu')
const mobileMenuBackground = document.querySelector('.mobile-menu-background')

menuBtns.forEach((e) => {
  e.addEventListener('click', () => {
    if (e.parentElement.classList.contains('navbar')) {
      navbar.style.opacity = '0'
      mobileMenuBackground.style.display = 'block'
      document.body.style.overflowY = 'hidden'
    } else {
      navbar.style.opacity = '1'
      mobileMenuBackground.style.display = 'none'
      document.body.style.overflowY = 'visible'
    }
    mobileMenu.classList.toggle('menu-inactive')
    secondMenuBtn.classList.toggle('btn-rotate')
  })
})

Array.from(menu.children).forEach((e) => {
  e.addEventListener('click', () => {
    document.body.style.overflowY = 'visible'
    mobileMenu.classList.add('menu-inactive')
    secondMenuBtn.classList.remove('btn-rotate')
    navbar.style.opacity = '1'
    mobileMenuBackground.style.display = 'none'
  })
})
mobileMenuBackground.addEventListener('click', () => {
  document.body.style.overflowY = 'visible'
  mobileMenu.classList.add('menu-inactive')
  secondMenuBtn.classList.remove('btn-rotate')
  navbar.style.opacity = '1'
  mobileMenuBackground.style.display = 'none'
})

//==================
//Carousel
//==================
const leftBtn = document.querySelector('.left-btn')
const rightBtn = document.querySelector('.right-btn')
const friendsCenter = document.querySelector('.friends-center')
const singleCard = `
        <!-- single card -->
        <!-- <div class="single-card">
          <img src="../../assets/images/pets-katrine.png" alt="pets-katrine" />
          <h1>katrine</h1>
          <a href="">Learn more</a>
        </div> -->
        <!-- end of single card -->`
const width = screen.width
fetch('../../assets/pets data/pets.json')
  .then((response) => response.json())
  .then((data) => {})

//==================
//Popup
//==================
const singleCards = document.querySelectorAll('.single-card')
const modalWindow = document.querySelector('.modal')
const petImage = document.querySelector('.modal-left')
const modalRight = document.querySelector('.modal-right')
const modalCloseBtn = document.querySelector('.modal-close')

//change the modal content and open it
fetch('../../assets/pets data/pets.json')
  .then((response) => response.json())
  .then((data) => {
    singleCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        const currentCardName = e.currentTarget.children[1].innerText
        data.forEach((pet) => {
          if (pet.name == currentCardName) {
            //change the modal content
            //Image
            petImage.setAttribute('src', `${pet.img}`)
            //Name
            modalRight.children[0].innerHTML = pet.name
            //Type & breed
            modalRight.children[1].innerHTML = `${pet.type} - ${pet.breed}`
            //Description
            modalRight.children[2].innerHTML = pet.description
            //Age
            document.querySelector('.modal-age').innerHTML = pet.age
            //Inoculations
            document.querySelector('.modal-inoculations').innerHTML =
              pet.inoculations
            //Diseases
            document.querySelector('.modal-diseases').innerHTML = pet.diseases
            //Parasites
            document.querySelector('.modal-parasites').innerHTML = pet.parasites
          }
        })
        //open the modal window
        modalWindow.classList.remove('modal-hidden')
        //disable vertical scroll
        document.body.style.overflowY = 'hidden'
      })
    })
  })

//close modal window
function closeModal() {
  modalWindow.classList.add('modal-hidden')
  document.body.style.overflowY = 'visible'
}
//click close button
modalCloseBtn.addEventListener('click', closeModal)
//click the darker area
modalWindow.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeModal()
  }
})
//hover effect on the close button and the darker area
modalWindow.addEventListener('mouseover', (e) => {
  if (
    e.target.classList.contains('modal') ||
    e.target.classList.contains('modal-close') ||
    e.target.classList.contains('modal-close-icon')
  ) {
    modalCloseBtn.style.background = '#f1cdb3'
    modalCloseBtn.style.cursor = 'pointer'
    e.target.style.cursor = 'pointer'
  } else {
    modalCloseBtn.style.background = 'none'
    modalCloseBtn.style.cursor = 'auto'
    e.target.style.cursor = 'auto'
  }
})
