const orderPage= document.getElementById('orders');

let totalPrice=0;
window.addEventListener('load', () => {
    console.log('order loaded');
    axios.get('http://localhost:3033/getOrders').then((orders) => {
        let orderHTML=document.createElement('div')
        let prodcutTitle;
        if(orders.data.length>0){
            orders.data.forEach(order => {
                orderHTML.innerHTML = `
                    <div>
                        <h1>OrderId : ${order.id}</h1>
                        <hr>
                    </div> `
                    order.products.forEach(product=>{  
                         prodcutTitle=`<div>
                            <h1>titlt : ${product.title}</h1>
                            <h3> quantity: ${product.orderItem.quantity}</h3>
                         </div>`
                        totalPrice=totalPrice+(product.orderItem.quantity * product.price)
                         orderHTML.innerHTML+=prodcutTitle;
                    })
                    orderHTML.innerHTML+=`<h3> amount ${totalPrice}</h3> <br><br>`
                    orderPage.innerHTML += orderHTML.innerHTML

            })
        }else{
            console.log("no orders are ");
            orderHTML.innerHTML= `
                <div>
                    <h1>no order placed yet</h1>
                </div>`
                orderPage.innerHTML += orderHTML
        }
    })
})