const Product = require('../models/product');
const Cart=require('../models/cart')


exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products=>{
      res.json(products)
    })
    .catch(err=>{console.log(err);})
};

exports.getCart=(req,res,next)=>{
  Cart.findAll()
    .then(products=>{
      res.json(products)
    })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.prodId;
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