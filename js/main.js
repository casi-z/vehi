'use strict'
const d = document
const w = window
const b = d.body
const wrapper = d.querySelector('.wrapper')
const log = (n) => console.log(n)

//? Мобильная версия меню
function menuBurger() {
    const burgerButton = d.querySelector('.burger')
    const mainMenu = d.querySelector('nav')
    const menuItem = mainMenu.querySelectorAll('li')
    burgerButton.onclick = function(){
        mainMenu.classList.toggle('_active')
        burgerButton.classList.toggle('_active')
    }
    menuItem.forEach(e => e.onclick = function(){
        mainMenu.classList.remove('_active')
        burgerButton.classList.remove('_active')
    })
}
menuBurger()

//? Настройка библиотеки Swiper

//? Слайдер для поэкранной прокрутки
let pageSlider = new Swiper('.page', {

    direction: 'vertical',
    parallax: true,
    slidesPerView: 'auto',

    spaceBetween: 30,
    mousewheel: {
        sensetivity: 1,
    },

    wrapperClass: 'page__wrapper',
    slideClass: 'page__screen',
    watchOverflow: true,
    pageUpDown: true,

    speed: 1200,

    observer: true,

    observeSlideChildren: true,

    observeParents: true,

    freeMode: false,

    init: false,
    on:{
        //?Анимация при смене слайдов
        slideChange: function(){
            swiperAnimation('.anim-item', pageSlider)
            
        },
        init: function()  {
            sliderNavMenu() 
            
        },
        resize: function(){
            setScrollType()
        },
    }
});

//? Карточки на главной странице
let cardSlider = new Swiper('#cards', {
    effect: 'cards',
    grabCursor: true,
    nested: true,
});

//? Прокрутка внутри гармошки
let accordeonScroll = new Swiper('.ac-scroll', {
    direction: 'vertical',
    nested: true,
    freeMode: true,
    mousewheel: true,
    spaceBetween: 30,
});
//? Прокрутка внутри 4 слайда
let fullpageScroll = new Swiper('.scroller', {
    direction: 'vertical',
    wrapperClass: 'scroller__wrapper',
    slideClass: 'scroller__body',
    nested: true,
    freeMode: true,
    mousewheel: true,
    spaceBetween: 30,
    on:{
        //?Анимация при смене слайдов
        slideChange: function(){
            swiperAnimation('.anim-item-scroll', fullpageScroll)
            
        },
    }    
});
//? Анимация при смене слайдов
function swiperAnimation(classname, sliderName) {
    const slides = sliderName.slides
    let i = sliderName.realIndex

    let slideActive = slides[i]
    let animItem = d.querySelectorAll(classname)
    if (animItem.length) {
        animItem.forEach(e => e.classList.remove('_animated'))
        
    }
    let activeItem = slideActive.querySelectorAll('.anim-item')
    if (activeItem.length) {
        activeItem.forEach(e => e.classList.add('_animated'))
    }
}
//TODO: доделать функцию, должна отключать слайдер на мобилке
function setScrollType() {
    

    if(wrapper.classList.contains('_free')){
        wrapper.classList.remove('_free')
        pageSlider.params.freeMode = false;
    }

    for (let index = 0; index < pageSlider.slides.length; index++) { 
        const pageSlide = pageSlider.slides[index];
        const pageSlideContent = pageSlide.querySelector('.screen__content');
        if (pageSlideContent) {
            const pageSlideContentHeight = pageSlideContent.offsetHeight; 
            if (pageSlideContentHeight > window.innerHeight) { 
                wrapper.classList.add('_free'); 
                pageSlider.params.freeMode = true
                break;
                
            }
        }    
    }
}setScrollType()

//? Меню с якорями
function sliderNavMenu(params) {
    const slideAnchors = d.querySelectorAll('.slide-anchor')
    const scrollBar = d.querySelector('.main-menu__scroll-bar')
    
    for (let i = 0; i < slideAnchors.length; i++) {
        let slideAnchor = slideAnchors[i];
        slideAnchor.onclick = function(){
            pageSlider.slideTo(i, pageSlider.params.speed);
            
        }
    }
    pageSlider.on('slideChange', function () {
        scrollBar.style.transform = `translateX(${pageSlider.realIndex * 100}%)`
    });
}

//? Гармошка
function getAccordeon(params) {
    const accordeons = d.querySelectorAll('.accordeon');
    
    for (let accordeon of accordeons) {
        

        accordeon.onclick = function(e){
            if(e.target != accordeon || e.target == accordeon){
                accordeons.forEach(e => e.classList.remove('_active'))
                this.classList.toggle('_active')
                let aButton = this.querySelector('.accordeon__button')
                aButton.classList.add('_active')
                
            }
        }
        
        
    }
    function gradientAnimation(time, deg) {
        let incline = 1 
        let accordeonNumber = d.querySelectorAll('.accordeon__number')
        log
        setInterval(() => {
            accordeonNumber.forEach(e=> e.style.background = `linear-gradient(${incline}deg, rgba(252, 0, 255, 0.7), rgba(0, 219, 222, 0.7)`)
            incline += deg
        }, time);
    }gradientAnimation(40, 1)
}
getAccordeon()

//? Анимация цифр при наведении в описании карты
function cardDescription(params) {
    const cardNumbers = d.querySelectorAll('.card__number')
    const cardDescriptionItems = d.querySelectorAll('.card-description__text')
    for (let i = 0; i < cardDescriptionItems.length; i++) {
        let cardDescriptionItem = cardDescriptionItems[i];
        cardDescriptionItem.onmouseover = function(e){
            cardNumbers[i].classList.add('_active')
        }
        cardDescriptionItem.onmouseout = function(e){
            cardNumbers[i].classList.remove('_active')
        }
        
    }
}
cardDescription()

//? Кастомный курсор
function customCursor(){
    let cursor = d.querySelector('.cursor');
    
    w.addEventListener('mousemove', function(e) {
		cursor.style.left = e.clientX + 'px'
		cursor.style.top = e.clientY + 'px'
       
        if (e.target.classList.contains('target') || e.target.tagName == 'A' || e.target.tagName == 'BUTTON') {
            cursor.classList.add('pointer')

        }else {
            cursor.classList.remove('pointer')
        }
        
	})
    let nodes = d.childNodes;

    for (let node of nodes) {
        node.onmousedown = function(){
            cursor.classList.add('active')
        }
        
    }
}customCursor()

function innerCss(elem, styles){
    elem.setAttribute('style', styles);
    
}
function getRandomizer(params) {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const randomItems = d.querySelectorAll('[data-random]')
    for (let randomItem of randomItems) {
        let randomAttribute = parseInt(randomItem.getAttribute('data-random'))
        if (randomAttribute > 1) {
            randomItem.classList.add(`case_${getRandomInt(1, ++randomAttribute)}`)
        }
    }
   
}getRandomizer()

//23 11:20
pageSlider.init()
