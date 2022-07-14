const Sequelize=require('sequelize');

const sequelize= new Sequelize('e-commerce','root','root',{
    host:'localhost',
    dialect:'mysql'
});
module.exports=sequelize;