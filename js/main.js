'use strict'
const d = document
const w = window
const b = d.body

function menuBurger() {
    const burgerButton = d.querySelector('.burger')
    const mainMenu = d.querySelector('nav')
    const menuItem = mainMenu.querySelectorAll('li')
    menuItem.forEach(e => e.addEventListener('click', function(){
        mainMenu.classList.remove('_active')
        burgerButton.classList.remove('_active')
    }))
    burgerButton.addEventListener('click', function(){
        mainMenu.classList.toggle('_active')
        burgerButton.classList.toggle('_active')
    })
}menuBurger()
function getSwiperSliders() {
    
    let pageSlider = new Swiper(".page", {

        direction: "vertical",
        parallax: true,
        slidesPerView: 1,

        spaceBetween: 30,
        mousewheel: true,

        wrapperClass: 'page__wrapper',
        slideClass: 'page__screen',
        watchOverflow: true,
        pageUpDown: true,

        speed: 1200,

        observer: true,
        on:{
            slideChange: function(){
                const slides = pageSlider.slides
                
                let i = pageSlider.realIndex

                for(let n = 0; n < slides.length; n++){
                    let slide = slides[n]
                    let slideActive = slides[i]
                    let animItem = d.querySelectorAll('.anim-item')
                    if (animItem.length) {
                        animItem.forEach(e => e.classList.remove('_active'))
                        
                    }
                    let activeItem = slideActive.querySelectorAll('.anim-item')
                    if (activeItem.length) {
                        animItem.forEach(e => e.classList.add('_active'))
                    }
                }
            }
        }
    });
    
    let cardSwiper = new Swiper("#cards", {
        effect: "cards",
        grabCursor: true,
        nested: true,
    });
    var accordeonSlider = new Swiper(".accordeon__slider", {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        scrollbar: {
          el: ".swiper-scrollbar",
        },
        mousewheel: true,
        nested: true,
    });
    var swiper = new Swiper(".mySwiper", {
        direction: "vertical",
        nested: true,
        freeMode: true,
        mousewheel: true,
    });
    
    function setScrollType() {
        for (let index = 0; index < pageSlider.slides.length; index++) { 
            const pageSlide = pageSlider.slides[index];
            const pageSlideContent = pageSlide.querySelector('.screen__content');
            if (pageSlideContent) {
                const pageSlideContentHeight = pageSlideContent.offsetHeight; 
                if (pageSlideContentHeight > window.innerHeight) { 
                    wrapper.classList.add('_free'); 
                    pageSlider.params.freeMode = true;
                }
            }    
        }
    }

        
}getSwiperSliders()
function gradientAnimation(time, deg) {
    let incline = 1 
    setInterval(() => {
        b.style.background = `linear-gradient(${incline}, #f1a470, #6dc1e7)`
        incline += deg
    }, time);
}//gradientAnimation(150, 2)
function getAccordeon(params) {
    const accordeons = d.querySelectorAll('.accordeon');
    
    for (let accordeon of accordeons) {
        
        accordeon.addEventListener('click', function(e){
            if(e.target != accordeon || e.target == accordeon){
                accordeons.forEach(e => e.classList.remove('_active'))
                this.classList.toggle('_active')
                let aButton = this.querySelector('.accordeon__button')
                aButton.classList.add('_active')
            }

           
        })
    }
}getAccordeon()

