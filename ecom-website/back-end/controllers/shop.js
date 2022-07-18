const Product = require('../models/product');
const Cart=require('../models/cart');
const Order=require('../models/order');


exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products=>{
      res.json(products)
    })
    .catch(err=>{console.log(err);})
};

exports.getCart=(req,res,next)=>{
  // Cart.findAll()
  //   .then(products=>{
  //     res.json(products)
  //   })
  let limit=2;
  let page=1
  let offset= (page-1)*limit;
  Cart.findAndCountAll({
    offset:offset,
    limit:limit
  })
  .then(products=>{
    console.log("aa",products);
    res.json(products)
  })
}
exports.postCartPage=(req,res,next)=>{
  let limit=1;
  let page=+req.body.page || 1;
  let offset=0 +(page-1)*limit;
  Cart.findAndCountAll({
    offset:offset,
    limit:limit
  })
  .then(products=>{
    res.json({
      currentPage:page,
      products:products,
      hasNextPage:limit*page<products.count,
      hasPreviousPage:page>1,
      nextPage:page+1,
      previousPage:page-1,
      lastPage:Math.ceil(products.count/limit)
    })
  })

}

exports.postCart = (req, res, next) => {
  const prodId = req.body.prodId;
  
  // console.log("aa",page);
  Product.findByPk(prodId)
    .then(product => {
      const id = product.id;
      const title = product.title;
      const price = product.price;
      Cart.findByPk(id)
        .then(product=>{
          if(!product){
            return Cart.create({
              id: id,
              title: title,
              price: price,
              qty: 1
            })
          }else{
            product.id=id;
            product.title=title;
            product.price=price;
            product.qty=product.qty +1
            return product.save();
          }
        })
        .then(result=>{
          // console.log(result);
          return Cart.findAll()
        })
        .then(products=>{
          res.json(products);
        })
    })
    .catch(err => {
      console.log(err);
    })
}

exports.deleteCartItem=(req,res,next)=>{
  const prodId = req.body.productId;
  Cart.findByPk(prodId)
    .then(product=>{
      if(product.qty<=1){
        return Cart.destroy({where:{id:prodId}})
      }
      product.qty=product.qty-1;
      return product.save();
    })
    .then(data=>{
      // console.log(">>>>>>>>>>",data);
      return Cart.findAll();
    })
    .then(products=>{
      res.json(products)
    })
    .catch(err=>{
      console.log(err);
    })
}

exports.postOrder=(req,res,next)=>{
  let totalPrice=0
  let id;
  let title;
  let price;
  let qty;
  Order.findAndCountAll()
    .then(products=>{
      if(products.count>0){
        products.rows.forEach(product=>{
          totalPrice=totalPrice+(product.qty*product.price);
          Cart.destroy({where:{id:product.id}})
        })
        res.json(totalPrice);
      }else{
        Cart.findAll()
        .then(products=>{
          console.log("....",products);
          products.forEach(product=>{
            id = product.id;
            title = product.title;
            price = product.price;
            qty = product.qty;
            totalPrice=totalPrice+(product.price*product.qty);
            Cart.destroy({where:{id:product.id}})
            return Order.create({
              id: id,
              title: title,
              price: price,
              qty: qty
            })
          })
        })
        .then(result=>{
          console.log("order placed");
          res.json(totalPrice)
        })
      }
    })
    .catch(err=>{console.log(err);})


  // Cart.findAll()
  //   .then(products=>{
  //     products.forEach(product=>{
  //        id = product.id;
  //        title = product.title;
  //        price = product.price;
  //        qty=product.qty;
  //       totalPrice=totalPrice+(product.price*product.qty);
  //       Order.findAndCountAll()
  //         .then(products=>{
  //           if(products.count>0){
  //             console.log("order is already Palced");
  //             res.json(totalPrice);
  //           }
  //           else{
  //             return Order.create({
  //               id: id,
  //               title: title,
  //               price: price,
  //               qty: qty
  //             })
  //           }
  //         })
  //         .then(result=>{
  //           console.log('order is created',result);
  //           res.json(totalPrice)
  //         })
  //         .catch(err=>{console.log(err);})
  //     }); 
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })

}