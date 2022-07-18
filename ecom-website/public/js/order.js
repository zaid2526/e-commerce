const orderPage= document.getElementById('orders');
console.log("orderPage",orderPage);
window.addEventListener('load', () => {
    console.log('order loaded');
    axios.get('http://localhost:3033/getOrders').then((products) => {
        console.log(products)
        products.data.forEach(product => {
            const productHtml = `
                <div>
                    <h1>id : ${product.id}</h1>
                    <hr>
                    <h5>Product Name: ${product.title}</h3>
                    
                    <div class="prod-details">
                        <span>Total Price :  <span>${product.price*product.qty}</span></span>
                    </div>
                </div>`
                orderPage.innerHTML += productHtml
        })
    })

})