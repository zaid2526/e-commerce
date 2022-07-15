const parentContainer = document.getElementById('EcommerceContainer');

const parentNode = document.getElementById('music-content');

window.addEventListener('load', () => {
    console.log('loaded');
    axios.get('http://localhost:3033/products').then((products) => {
        console.log(products)
        products.data.forEach(product => {
            const productHtml = `
                <div id="album-${product.id}">
                    <h3>${product.title}</h3>
                    <div class="image-container">
                        <img class="prod-images" src=${product.imageUrl} alt="">
                    </div>
                    <div class="prod-details">
                        <span>$<span>${product.price}</span></span>
                        <button class="shop-item-button" type='button'>ADD TO CART</button>
                    </div>
                </div>`
            parentNode.innerHTML += productHtml
        })
    })

})
parentContainer.addEventListener('click', (e) => {
    let total_cart_price = document.querySelector('#total-value').innerText;
    // adding to cart....
    if (e.target.className=='shop-item-button'){
        // fetching the clicked product details
        const id = e.target.parentNode.parentNode.id
         console.log(id[id.length-1]);
        addToCart(id[id.length-1]);

        notification(id);

        document.getElementById('cart-items').innerText = parseInt(document.getElementById('cart-items').innerText)+1
    }
    //display cart slider.....
    if (e.target.className == 'cart-holder' || e.target.className=='cart-bottom' || e.target.className=='cart-btn-bottom') {
        document.querySelector('#cart').style = "display:block;"
    }
    //closing cart slider......
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }
    //remove item from cart.....
    if(e.target.className=='danger-btn'){
        const id = e.target.parentNode.firstElementChild.id;
        const tr = e.target.parentNode.parentNode;
        removeFromCart(id,tr,total_cart_price);
    }
})

// function addToCart(id){
//     const name = document.querySelector(`#${id} h3`).innerText;
//     const img_src = document.querySelector(`#${id} img`).src;
//     // const price = e.target.parentNode.firstElementChild.firstElementChild.innerText;
//     const price =document.querySelector(`#${id} .prod-details`).firstElementChild.firstElementChild.innerText

// /*  add only one iteminto the cart
//     if(document.getElementById(`${name}`)){
//         alert("item already presents");
//         return;
//     }
// */
    
// //one or more item will be added.. max quantity is 3....
//     let total_cart_price = document.querySelector('#total-value').innerText;
//     if (document.getElementById(`${name}`)) {
//         let quantity = document.getElementById(`${name}`).innerText
//         if (quantity >= 3) {
//             alert(`${name} is out of stock`);
//             return;
//         }
//         document.getElementById(`${name}`).innerText = +quantity + 1
//         total_cart_price = parseFloat(total_cart_price) + parseFloat(price);
//         total_cart_price=total_cart_price.toFixed(2)
//         document.querySelector('#total-value').innerText = `${total_cart_price}`;
//     } else {
//         total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
//         total_cart_price=total_cart_price.toFixed(2)
//         document.querySelector('#total-value').innerText = `${total_cart_price}`;

//         const tr = document.createElement('tr')
//         const td_name = document.createElement("td");
//         const item_name = document.createTextNode(name);
//         td_name.appendChild(item_name);
//         tr.appendChild(td_name);

//         const td_price = document.createElement("td");
//         const item_price = document.createTextNode(price);
//         td_price.appendChild(item_price);
//         tr.appendChild(td_price);

//         const td_quantity = document.createElement("td");
//         const item_quantity = document.createElement('span');
//         item_quantity.setAttribute('id', `${name}`)
//         item_quantity.appendChild(document.createTextNode(1))
//         td_quantity.appendChild(item_quantity);

//         const remove_btn=document.createElement('button');
//         remove_btn.classList.add('danger-btn');
//         remove_btn.appendChild(document.createTextNode('X'))
//         td_quantity.appendChild(remove_btn);
//         tr.appendChild(td_quantity);

//         document.getElementById('cart-table').appendChild(tr);
//     }


// }
function addToCart(id){
    axios.post('http://localhost:3033/cart',{prodId:id})
        .then(data=>{
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
        })

}
function notification(id){
    //getting product name
    const name = document.querySelector(`#${id} h3`).innerText;

    const toast_noftification=document.createElement('div');
    toast_noftification.classList.add('notification');
    toast_noftification.innerHTML=`<span> ${name} is added to your cart</span>`
    document.getElementById('container').appendChild(toast_noftification);
    setTimeout(()=>{
        toast_noftification.remove();
    },2000)
}

function removeFromCart(id,item,total_cart_price) {
    let quantity = document.getElementById(`${id}`).innerText;
    const price = item.getElementsByTagName('td')[1].innerText;
    if (quantity <= 1) {
        document.querySelector('#total-value').innerText = parseFloat(total_cart_price).toFixed(2) - parseFloat(price)
        item.remove()
    } else {
        document.getElementById(`${id}`).innerText = +quantity - 1
        document.querySelector('#total-value').innerText = parseFloat(total_cart_price).toFixed(2) - parseFloat(price)
    }
}


