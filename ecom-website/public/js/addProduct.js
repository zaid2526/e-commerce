const addButton=document.getElementById('add-btn');
addButton.addEventListener('click', function addProduct(){
    const title=document.getElementById('title').value;
    const price=document.getElementById('price').value;
    const imageUrl=document.getElementById('imageUrl').value;
    const product={
        title:title,
        price:price,
        imageUrl:imageUrl
    }
    axios.post('http://localhost:3033/products',{product:product})
        .then(product=>{
            console.log(product);
        })
        .catch(err=>{console.log(err);})
})