const Product = require('../models/product');
const Cart=require('../models/cart');
const Order=require('../models/order');

exports.postProduct=(req,res,next)=>{
  const product=req.body.product;
  req.user
    .createProduct({
      title:product.title,
      price:product.price,
      imageUrl:product.imageUrl,
      userId:req.user.id
    })
    .then(product=>{
      res.json(product);
    })
    .catch(err=>{console.log(err);})
}


exports.getProducts = (req, res, next) => {
  // console.log("req.user",req.user);
  // Product.findAll()
  req.user.getProducts()
    .then(products=>{
      res.json(products)
    })
    .catch(err=>{console.log(err);})
};

exports.getCart=(req,res,next)=>{
  let limit=2;
  let page=1
  let offset= (page-1)*limit;
  req.user
    .getCart()
    .then(cart=>{
      return cart.findAndCountAll()
    })
    .then(product=>{
      res.json(product)
    })
    .catch(err=>{console.log(err);})
}

exports.postCartPage=(req,res,next)=>{
  let numOfProducts;
  let fetchedCart;
  let limit=1;
  let page= +req.body.page;
  let offset=0 +(page-1)*limit;

  req.user
    .getCart()
    .then(cart=>{
      fetchedCart=cart;
      return cart.countProducts()
    })
    .then(count=>{
      numOfProducts=count;
      return fetchedCart.getProducts({ 
        offset:offset,
        limit:limit
      })
    })
    .then(products=>{
      res.json({
        currentPage:page,
        products:products,
        hasNextPage:limit*page<numOfProducts,
        hasPreviousPage:page>1,
        nextPage:page+1,
        previousPage:page-1,
        lastPage:Math.ceil(numOfProducts/limit)
      })
    })
    .catch(err=>{console.log(err);})
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.prodId;
  let fetchedCart;
  let newQuantity;
  req.user
    .getCart()
    .then(cart=>{
      fetchedCart=cart;
      return cart.getProducts({where:{id:prodId}})
    })
    .then(products=>{
      let product;
      if(products.length>0){
        product=products[0];
      }
      if(product){
        let oldQuantity=product.cartItem.quantity;
        newQuantity=oldQuantity+1;
        return product;
        //to avoid nested then just return only product, a return object 
        //in then() automatically wrapped in a promise..... 
        //   fetchedCart.addProduct(product,{
        //   through:{quantity:newQuantity}
        // })
      }
      newQuantity=1;
      //add to the cart if product not present already in cart
      return Product.findByPk(prodId)
        // to avoid nested then()
              // .then(product=>{
              //   return fetchedCart.addProduct(product,{
              //     through:{quantity:newQuantity}
              //   });
              // })
              // .catch(err=>{console.log(err);})
    })
    .then(product=>{
        return fetchedCart.addProduct(product,{
          through:{quantity:newQuantity}
        });
      })
      .then(product=>{
        return fetchedCart.getProducts()
      })
      .then(products=>{
        res.json(products)
      })
    .catch(err=>{console.log(err);})  
}

exports.deleteCartItem=(req,res,next)=>{
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity;
  req.user.getCart()
    .then(cart=>{
      fetchedCart=cart;
      return cart.getProducts({where:{id:prodId}})
    })
    .then(products=>{
      const product=products[0];
      if(product){
        let oldQuantity=product.cartItem.quantity;
        if(oldQuantity==1){
          return product.cartItem.destroy();
        }
        newQuantity=oldQuantity-1;
        return product;
      }
    })
    .then(product=>{
      return fetchedCart.addProduct(product,{
        through:{quantity:newQuantity}
      });
    })
    .then(()=>{
      return fetchedCart.getProducts()
    })
    .then(products=>{
      res.json(products)

    })
    .catch(err=>{console.log(err);})
}

exports.getOrders=(req,res,next)=>{
  req.user.getOrders({include:['products']})
    .then(orders=>{
      res.json(orders)
    })
    .catch(err=>{console.log(err);})
}

exports.postOrder=(req,res,next)=>{
  let cartProducts;
  let fetchedCart;
  req.user.getCart()
    .then(cart=>{
      fetchedCart=cart;
      return cart.getProducts()
    })
    .then(products=>{
      cartProducts=products
      return req.user.createOrder()
    })
    .then(order=>{
      console.log('order',order);
      return order.addProducts(cartProducts.map(product=>{
        product.orderItem={quantity:product.cartItem.quantity};
        return product;
      }))
      
    })
    .then(product=>{
      return fetchedCart.setProducts('null')
    })
    .then(result=>{
      res.json(result)
    })
    .catch(err=>{console.log(err);})
  


}