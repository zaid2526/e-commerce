const path = require('path');

const express = require('express');
const bodyParser=require('body-parser')

const sequelize = require('./util/database');
const Product=require('./models/product');
const User = require('./models/user');
const Cart=require('./models/cart');
const CartItem=require('./models/cart-item');
const Order=require('./models/order');
const OrderItem=require('./models/order-item');



const shopRoutes=require('./routes/shop');





const staticPath=path.join(__dirname,'..','public')
const app = express();
app.use(bodyParser.json());
app.use(express.static(staticPath))

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user=user;
        // console.log("app",user);
        next();
    })
})

app.use(shopRoutes);



/*-------- Associations ----------*/
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product)

User.hasOne(Cart);
Cart.belongsTo(User);

//many to many (cart and product)
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

//one to many (order and user)
Order.belongsTo(User);
User.hasMany(Order);

//many to many (order and Product)
Order.belongsToMany(Product,{through:OrderItem})
// Product.belongsToMany(Order,{through:OrderItem}) // it maybe optional




sequelize
    // .sync({force:true})
    .sync()
    .then(()=>{
        return User.findByPk(1)
    })
    .then(user=>{
        if(!user){
           return  User.create({name:'zaid',email:'mzr@gmail.com'})
        }
        return user;
    })
    .then(user=>{
        // console.log("user",user);
        return user.createCart();
    })
    .then(cart=>{
        // console.log("cart",cart);
        app.listen(3033);
    })
    .catch(err=>{
        console.log(err);
    })
