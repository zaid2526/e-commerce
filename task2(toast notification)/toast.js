var btn=document.querySelector('#btn')
var container=document.querySelector('#container')

btn.addEventListener('click',()=>{
    createToast();
})
function createToast(){
    var toast=document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML="some text....."
    container.appendChild(toast);

    setTimeout(()=>{
        toast.remove()
    },2000)
}