const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// Database connectivity
const sequelize = new Sequelize('test', 'test', 'home', {
    host: 'db',
    dialect: 'mysql',
    logging: false,
    operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like
    }
});


// check database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


// Setting up product object
const Products = sequelize.define('products', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    price: {type: Sequelize.FLOAT},
    name: {type: Sequelize.STRING},
    description: {type: Sequelize.TEXT},
    imageUrl: {type: Sequelize.TEXT}
});


// create table and adding dummy data
sequelize.sync()
//     .then(function () {
//     return Products.create({
//         name: "First name",
//         price: 12.0,
//         description: "First description",
//         imageUrl: "http://example.com/image.img"
//     });
// });


// Sending back product object
module.exports = Products;
