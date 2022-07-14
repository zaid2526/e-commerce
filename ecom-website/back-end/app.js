const path = require('path');

const express = require('express');
const bodyParser=require('body-parser')


const sequelize = require('./util/database');
const shopRoutes=require('./routes/shop')


const staticPath=path.join(__dirname,'..','public')
const app = express();
app.use(bodyParser.json());
app.use(express.static(staticPath))

app.use(shopRoutes);



sequelize
    .sync()
    .then((result)=>{
        // console.log(result);
        app.listen(3033); 
    })
    .catch(err=>{
        console.log(err);
    })
