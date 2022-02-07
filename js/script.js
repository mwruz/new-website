
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