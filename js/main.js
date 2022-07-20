const d = document
const w = window
const b = d.body

function menuBurger(params) {
    const burgerButton = d.querySelector('.burger')
    const mainMenu = d.querySelector('.header__navbar')
    burgerButton.addEventListener('click', function(){
        mainMenu.classList.toggle('_active')
        
        burgerButton.classList.toggle('_active')
       
        
    })
    
    
}menuBurger()