

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


$('.links__list').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
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