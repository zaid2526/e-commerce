const toggle= document.getElementById('toggle');
toggle.addEventListener('change',(e)=>{
    console.log(toggle);
    document.body.classList.toggle('dark',e.target.checked);
    
    
})