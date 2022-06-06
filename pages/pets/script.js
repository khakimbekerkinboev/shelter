//==================
//Burger menu
//==================

const headerCenter = document.querySelector('.header-center')
const menuBtns = document.querySelectorAll('.menu-btn')
const secondMenuBtn = menuBtns[1]
const mobileMenu = document.querySelector('.mobile-menu')
const menu = document.querySelector('.menu')
const mobileMenuBackground = document.querySelector('.mobile-menu-background')

//open and close the menu
menuBtns.forEach((e) => {
  e.addEventListener('click', () => {
    if (e.parentElement.classList.contains('header-center')) {
      headerCenter.style.opacity = '0'
      mobileMenuBackground.style.display = 'block'
      document.body.style.overflowY = 'hidden'
    } else {
      headerCenter.style.opacity = '1'
      mobileMenuBackground.style.display = 'none'
      document.body.style.overflowY = 'visible'
    }
    mobileMenu.classList.toggle('menu-inactive')
    secondMenuBtn.classList.toggle('btn-rotate')
  })
})
//close the menu when clicked a link inside
Array.from(menu.children).forEach((e) => {
  e.addEventListener('click', () => {
    document.body.style.overflowY = 'visible'
    mobileMenu.classList.add('menu-inactive')
    secondMenuBtn.classList.remove('btn-rotate')
    headerCenter.style.opacity = '1'
    mobileMenuBackground.style.display = 'none'
  })
})
//close the menu when clicked the darker area
mobileMenuBackground.addEventListener('click', () => {
  document.body.style.overflowY = 'visible'
  mobileMenu.classList.add('menu-inactive')
  secondMenuBtn.classList.remove('btn-rotate')
  headerCenter.style.opacity = '1'
  mobileMenuBackground.style.display = 'none'
})

//==================
//Pagination
//==================

//buttons
const firstBtn = document.querySelector('.first-btn')
const previousBtn = document.querySelector('.previous-btn')
const currentPageBtn = document.querySelector('.current-page')
const nextBtn = document.querySelector('.next-btn')
const lastBtn = document.querySelector('.last-btn')

//cards section
const cards = document.querySelector('.cards')

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

//create the map of all 48 cards in the form of 8 X 6
const cardMap = []
for (let i = 0; i < 6; i++) {
  cardMap.push(arrayRandom(8))
}

//create a cusomizable (for different width) map
let customCardMap = []

fetch('../../assets/pets data/pets.json')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    //"fill the page" function
    function fillThePage(pageNumber) {
      //empty the section
      cards.innerHTML = ''

      //fill the section with cards
      customCardMap[pageNumber - 1].forEach((e) => {
        cards.innerHTML += `
          <!-- single card -->
          <div class="single-card">
            <img  
              src="${data[e].img}"
              alt="pets-katrine"
            />
            <h3>${data[e].name}</h3>
            <a href="#">Learn more</a>
          </div>
          <!-- end of single card -->`
      })

      //modal window function
      modalWindow()
    }

    //make the current page "1" and disable left buttons when the page loads
    let currentPage = 1
    firstBtn.setAttribute('id', 'btn-inactive')
    previousBtn.setAttribute('id', 'btn-inactive')

    //"control buttons" function
    function controlBtns() {
      nextBtn.addEventListener('click', (e) => {
        if (currentPage < customCardMap.length) {
          currentPage++
          currentPageBtn.innerText = `${currentPage}`
          fillThePage(currentPage)
          firstBtn.removeAttribute('id', 'btn-inactive')
          previousBtn.removeAttribute('id', 'btn-inactive')
        }
        if (currentPage == customCardMap.length) {
          nextBtn.setAttribute('id', 'btn-inactive')
          lastBtn.setAttribute('id', 'btn-inactive')
        }
      })

      previousBtn.addEventListener('click', (e) => {
        if (currentPage > 1) {
          currentPage--
          currentPageBtn.innerText = `${currentPage}`
          fillThePage(currentPage)
          nextBtn.removeAttribute('id', 'btn-inactive')
          lastBtn.removeAttribute('id', 'btn-inactive')
        }
        if (currentPage == 1) {
          firstBtn.setAttribute('id', 'btn-inactive')
          previousBtn.setAttribute('id', 'btn-inactive')
        }
      })

      lastBtn.addEventListener('click', () => {
        currentPage = customCardMap.length
        currentPageBtn.innerText = `${currentPage}`
        fillThePage(currentPage)
        nextBtn.setAttribute('id', 'btn-inactive')
        lastBtn.setAttribute('id', 'btn-inactive')
        firstBtn.removeAttribute('id', 'btn-inactive')
        previousBtn.removeAttribute('id', 'btn-inactive')
      })

      firstBtn.addEventListener('click', () => {
        currentPage = 1
        currentPageBtn.innerText = `${currentPage}`
        fillThePage(currentPage)
        nextBtn.removeAttribute('id', 'btn-inactive')
        lastBtn.removeAttribute('id', 'btn-inactive')
        firstBtn.setAttribute('id', 'btn-inactive')
        previousBtn.setAttribute('id', 'btn-inactive')
      })
    }

    //1280px <= width

    if (screen.width >= 1280) {
      //customize the map for 8 cards X 6 pages
      customCardMap = [...cardMap]
      //generate the current page
      fillThePage(currentPage)
      //control buttons
      controlBtns()
    }

    //768px <= width < 1280px

    if (screen.width >= 768 && screen.width < 1280) {
      //customize the map for 6 cards X 8 pages
      const allCards = cardMap.join(',').split(',')
      for (let i = 0; i < 8; i++) {
        customCardMap.push(allCards.slice(0, 6))
        allCards.splice(0, 6)
      }
      //generate the current page
      fillThePage(currentPage)
      //control buttons
      controlBtns()
    }

    //width < 768px

    if (screen.width < 768) {
      //customize the map for 3 cards X 16 pages
      const allCards = cardMap.join(',').split(',')
      for (let i = 0; i < 16; i++) {
        customCardMap.push(allCards.slice(0, 3))
        allCards.splice(0, 3)
      }
      //generate the current page
      fillThePage(currentPage)
      //control buttons
      controlBtns()
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

  //"close modal window" function
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
  //change the close button when hovering over the close button and the darker area
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
