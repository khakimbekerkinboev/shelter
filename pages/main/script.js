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
const cardContainer = document.querySelector('.card-container')

//randomize indexes of any array by length
function arrayRandom(length) {
  let arr = []
  while (arr.length < length) {
    const newNumber = Math.floor(Math.random() * length)
    if (!arr.includes(newNumber)) {
      arr.push(newNumber)
    }
  }
  return arr
}
//get 8 random indexes of an array and grab the first 1, 2, 3 elements
const firstRandom = arrayRandom(8)
let oneCard = firstRandom.slice(0, 1)
let twoCards = firstRandom.slice(0, 2)
let threeCards = firstRandom.slice(0, 3)

fetch('../../assets/pets data/pets.json')
  .then((response) => response.json())
  .then((data) => {
    //"fill the section" function
    function fillContainer(numOfCards) {
      //empty the section
      cardContainer.innerHTML = ''
      //fill the section with cards
      numOfCards.forEach((e) => {
        cardContainer.innerHTML += `
        <!-- single card -->
        <div class="single-card">
          <img src="${data[e].img}" alt=""/>
          <h1>${data[e].name}</h1>
          <a href="#">Learn more</a>
        </div> 
        <!-- end of single card -->`
      })

      //modal window function
      modalWindow()
    }

    //"control buttons" function
    function controlBtns(cardType, numOfCards) {
      //next button
      rightBtn.addEventListener('click', () => {
        cardContainer.style.transform = 'translateX(-120%)'
        setTimeout(() => {
          cardContainer.innerHTML = ''
          cardContainer.style.transform = 'translateX(120%)'
        }, 200)

        setTimeout(() => {
          //change cards
          while (true) {
            const secondRandom = arrayRandom(8)
            if (
              !cardType.some((e) =>
                secondRandom.slice(0, numOfCards).includes(e)
              )
            ) {
              cardType = secondRandom.slice(0, numOfCards)
              break
            }
          }
          //fill the container
          fillContainer(cardType)
          cardContainer.style.transform = 'none'
        }, 450)
      })

      //previous button
      leftBtn.addEventListener('click', () => {
        cardContainer.style.transform = 'translateX(120%)'
        setTimeout(() => {
          cardContainer.innerHTML = ''
          cardContainer.style.transform = 'translateX(-120%)'
        }, 200)

        setTimeout(() => {
          //change cards
          while (true) {
            const secondRandom = arrayRandom(8)
            if (
              !cardType.some((e) =>
                secondRandom.slice(0, numOfCards).includes(e)
              )
            ) {
              cardType = secondRandom.slice(0, numOfCards)
              break
            }
          }
          //fill the container
          fillContainer(cardType)
          cardContainer.style.transform = 'none'
        }, 450)
      })
    }

    //1280px <= width
    if (screen.width >= 1280) {
      //fill the section in the pages load
      fillContainer(threeCards)
      controlBtns(threeCards, 3)
    }

    //768px <= width < 1280px
    if (screen.width >= 768 && screen.width < 1280) {
      fillContainer(twoCards)
      controlBtns(twoCards, 2)
    }

    //width < 768px
    if (screen.width < 768) {
      fillContainer(oneCard)
      controlBtns(oneCard, 1)
    }
  })

//==================
//Popup
//==================
function modalWindow() {
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
              document.querySelector('.modal-parasites').innerHTML =
                pet.parasites
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
}
modalWindow()
