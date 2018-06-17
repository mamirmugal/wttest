// graphQl objects
let {
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt
} = require('graphql');


// Product object
const Products = require('../db/database.js');


// Product Type describing schema
const productType = require('./type');


// Product query object
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {

            // Getting all product listing
            products: {

                // getting product listing
                type: new GraphQLList(productType),

                resolve: function () {

                    // Using sequelize to find all objects
                    return Products
                        .findAll()
                        .then(products => {
                            return products;
                        });
                }
            },

            // Getting one single product by id
            product: {

                // getting single product
                type: productType,

                // Passing argument condition
                // only id is required to search product
                args: {
                    id: {type: GraphQLInt},
                },

                resolve: function (root, params) {

                    // Using sequelize to find single object
                    return Products
                        .findOne({where: {id: params.id}})
                        .then(product => {
                            return product;
                        });
                }
            }
        }
    }
});


// Exporting query type object
module.exports = queryType;