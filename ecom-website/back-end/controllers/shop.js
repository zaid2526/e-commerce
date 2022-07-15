const Product = require('../models/product');
const Cart=require('../models/cart')


exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products=>{
      res.json(products)

    })
    .catch(err=>{console.log(err);})
    

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.prodId;
  
  Product.findByPk(prodId)
    .then(product => {
      if(!product){
        console.log("not found");
      }else{
      const id = product.id;
      const title = product.title;
      const price = product.price;
      Cart.findByPk(id)
        .then(product=>{
          if(!product){
            Cart.create({
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
            product.save();
          }
        })
        .catch(err=>{console.log(err);})
      }
    })
    .catch(err => {
      console.log(err);
    })

}