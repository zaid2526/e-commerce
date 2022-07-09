var logo=document.querySelector('.container')
var menu=document.querySelector('.menu')

logo.addEventListener('click', ()=>{
    logo.classList.toggle('icon')
    menu.classList.toggle('showmenu')

})