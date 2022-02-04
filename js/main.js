let dotsItem = document.querySelector('.slick-dots')

$('.site-hero__carousel').slick({
    dots: true,
    customPaging: function (slider, i) {
        if (i == 0) {
            return '<span class="slider_num">Suv omborlari</span>';

        } else if (i == 1) {
            return '<span class="slider_num">Irrigatsiya tizimlari</span>';
        } else if (i == 2) {
            return '<span class="slider_num">Kollektorlar</span>';
        } else if (i == 3) {
            return '<span class="slider_num">Suv tejovchi texnologiyalar</span>';
        }
    },
    infinite: true,
    speed: 00,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
});



// SITE HEADER LOGIN POPUP 

let loginPopup = document.querySelector('.site-header__popup-wrapper');
let loginBtn = document.querySelector('.site-header__login');
let popupCloseIcon = document.querySelector('.popup-close');

loginBtn.addEventListener('click', ()=>{
    loginPopup.classList.add('site-header__popup-wrapper-active');
})

popupCloseIcon.addEventListener('click', ()=> [
    loginPopup.classList.remove('site-header__popup-wrapper-active')
])