const parentContainer = document.getElementById('EcommerceContainer');
parentContainer.addEventListener('click', (e) => {
    
    // adding to cart
    if (e.target.className=='shop-item-button'){
        // fetching the clicked product details
        const id = e.target.parentNode.parentNode.id
        const name = document.querySelector(`#${id} h3`).innerText;
        const img_src = document.querySelector(`#${id} img`).src;
        const price = e.target.parentNode.firstElementChild.firstElementChild.innerText;
        // console.log(id,name,img_src,price);
        
    /*  add only one iteminto the cart
        if(document.getElementById(`${name}`)){
            // console.log("item already presents");
            alert("item already presents");
            return;
        }
    */
        //one or more item will be added.. max quantity is 3....
        let total_cart_price = document.querySelector('#total-value').innerText;
        if (document.getElementById(`${name}`)) {
            let quantity = document.getElementById(`${name}`).innerText
            if (quantity >= 3) {
                alert(`${name} is out of stock`);
                return;
            }
            document.getElementById(`${name}`).innerText = +quantity + 1
            total_cart_price = (+total_cart_price) + (+price)
            document.querySelector('#total-value').innerText = total_cart_price;
        } else {

            total_cart_price = (+total_cart_price) + (+price)
            document.querySelector('#total-value').innerText = total_cart_price;

            const tr = document.createElement('tr')
            const td_name = document.createElement("td");
            const item_name = document.createTextNode(name);
            td_name.appendChild(item_name);
            tr.appendChild(td_name);

            const td_price = document.createElement("td");
            const item_price = document.createTextNode(price);
            td_price.appendChild(item_price);
            tr.appendChild(td_price);

            const td_quantity = document.createElement("td");
            td_quantity.setAttribute('id', `${name}`)
            const item_quantity = document.createTextNode(1);
            td_quantity.appendChild(item_quantity);
            tr.appendChild(td_quantity);

            document.getElementById('cart-table').appendChild(tr);
        }


       
        
        const toast_noftification=document.createElement('div');
        toast_noftification.classList.add('notification');
        toast_noftification.innerHTML=`<span> ${name} is added to your cart</span>`
        document.getElementById('container').appendChild(toast_noftification);
        setTimeout(()=>{
            toast_noftification.remove();
        },2000)
        console.log(document.getElementById(`${name}`).innerText);
        document.getElementById('cart-items').innerText = parseInt(document.getElementById('cart-items').innerText)+1

    }
    if (e.target.className == 'cart-holder' || e.target.className=='cart-bottom' || e.target.className=='cart-btn-bottom') {
        document.querySelector('#cart').style = "display:block;"
    }
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }
})