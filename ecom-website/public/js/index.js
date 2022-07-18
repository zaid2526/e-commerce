const parentContainer = document.getElementById('EcommerceContainer');

const parentNode = document.getElementById('music-content');
let total_cart_price = document.querySelector('#total-value').innerText;
window.addEventListener('load', () => {
    console.log('loaded');
    axios.get('http://localhost:3033/products').then((products) => {
        // console.log(products)
        products.data.forEach(product => {
            const productHtml = `
                <div id="album-${product.id}">
                    <h3> ${product.title}</h3>
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
    // let total_cart_price = document.querySelector('#total-value').innerText;
    // adding to cart....
    if (e.target.className=='shop-item-button'){
        // fetching the clicked product details
        const id = e.target.parentNode.parentNode.id
        //  console.log(id[id.length-1]);
        addToCart(id[id.length-1]);
        notification(id);

        // document.getElementById('cart-items').innerText = parseInt(document.getElementById('cart-items').innerText)+1
    }
    //display cart slider.....
    if (e.target.className=='pagination' || e.target.className == 'cart-holder' || e.target.className=='cart-bottom' || e.target.className=='cart-btn-bottom') {
        const page= e.target.innerText || 1;
        const pageButton=document.querySelector(' div .pagination');
        pageButton.innerHTML=` `;
            axios.post('http://localhost:3033/cartPage',{page:page})
            .then(products=>{
                // console.log(products);
                showItemOnCart(products.data.products.rows)
                if(products.data.products.rows.length>0){
                    console.log("logsgdsjk");
                    if(products.data.currentPage!=1 && products.data.previousPage!=1){
                        pageButton.innerHTML=`
                            <button class='pagination'>1</button>`
                    }
                    if(products.data.hasPreviousPage){
                        pageButton.innerHTML=pageButton.innerHTML+ 
                        `<button class='pagination'>${products.data.previousPage}</button>`
                    }
    
                    pageButton.innerHTML=pageButton.innerHTML+
                        `<button class='pagination active'>${products.data.currentPage}</button>`
                    
                    if(products.data.hasNextPage){
                        pageButton.innerHTML=pageButton.innerHTML+ 
                        `<button class='pagination'>${products.data.nextPage}</button>`
                    }
                    if(products.data.lastPage!=products.data.currentPage 
                        && products.data.nextPage!=products.data.lastPage){
                            pageButton.innerHTML=pageButton.innerHTML+ 
                            `<button class='pagination'>${products.data.lastPage}</button>`
                    }
                    const purchaseButton=document.createElement('button')
                    purchaseButton.classList.add('purchase-btn')
                    purchaseButton.appendChild(document.createTextNode('Order'))
                    console.log(purchaseButton);
                    document.getElementById('cart').appendChild(purchaseButton)
                }
            })
            .catch(err=>{
                console.log(err);
            })
        document.querySelector('#cart').style = "display:block;"
        // }
        
    }
    //closing cart slider......
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }
    //remove item from cart.....
    if(e.target.className=='danger-btn'){
        const id = e.target.parentNode.lastElementChild.id;
        const tr = e.target.parentNode.parentNode;
        // console.log(tr);
        axios.post('http://localhost:3033/delete-cart-item',{productId:id})
        .then(remainProduct=>{
            // removeFromCart(id,tr,remainProduct.data);
            showItemOnCart(remainProduct.data)
            
        })
        .catch(err=>{
            console.log(err);
        })
    }
    if(e.target.className=='pagination'){
        const page=e.target.innerText;
        
        // if(page.length>2){
        //     console.log('click on page button');
        // }
        // else{
        //     axios.post('http://localhost:3033/cartPage',{page:page})
        //     .then(products=>{
        //         // console.log(products);
        //         showItemOnCart(products.data.products.rows)
        //     })
        //     .catch(err=>{
        //         console.log(err);
        //     })  
        // }
        
    // document.querySelector('#cart').style = "display:block";
    }
    if(e.target.className=='purchase-btn'){
        axios.post('http://localhost:3033/createOrder')
            .then(totalPrice=>{
                totalPrice=totalPrice.data
                console.log(totalPrice);
                alert(`order placed worth ${totalPrice}`)
            })
            .catch(err=>{
                console.log(err);
            })
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
            // console.log("addto",data);
            showItemOnCart(data.data)
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

function showItemOnCart(products) {
    let total_cart_price=0;
    const th=document.querySelector('#cart-table tr');
    let cartTable=document.getElementById('cart-table');
    cartTable.innerHTML=` `;
    products.forEach(product => {
        // const id = `album-${product.id}`;
        // const img_src = product.imageUrl;
        const name = product.title;
        const price = product.price;
        const quantity = product.qty;
        const tr = document.createElement('tr')
        tr.innerHTML = `
                <td>${name}</td>
                <td>${price}</td>
                <td id="${name}">
                    <span>${quantity}</span>
                    <button id=${product.id} class="danger-btn">
                        X</button>
                </td>`
        total_cart_price = +total_cart_price + quantity * price;
        cartTable.appendChild(tr);
    })
    document.querySelector('#total-value').innerText = parseFloat(+total_cart_price).toFixed(2)
    cartTable.prepend(th);

}

/*......... instead of this we use only the showitemonCart(products)method
 products get from the cart and show.. (ie we do not need 
 removeFromCart()......)     .......*/


// function removeFromCart(id,tr,remainProduct) {
//     let total_cart_price=0;
//     let qty=tr.lastElementChild.innerText.split(' ')[0];
//             const name=tr.firstElementChild.innerText;
//             if(qty<=1){
//                 tr.remove();
//             }else{
//                 qty=qty-1;
//                 document.getElementById(`${name}`).innerHTML=`
//                             <span>${qty}</span>
//                             <button id=${id} class="danger-btn">
//                     X</button>`
//             }
//             remainProduct.forEach(product=>{
//                 total_cart_price = +total_cart_price + product.qty*product.price;
//             })
//             document.querySelector('#total-value').innerText=parseFloat(+total_cart_price).toFixed(2)
// }


