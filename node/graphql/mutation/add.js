
// graphQl objects
let {
    GraphQLString,
    GraphQLFloat,
} = require('graphql');


// graphQl product type object
// which defines the structure of the graphQl object
const productType = require("../type");


// Product db object
const Products = require("../../db/database");


// Product Add method
const productAdd = {

    // Setting up product type
    type: productType,

    // Setting up arguments
    args: {
        name: {type: GraphQLString},
        price: {type: GraphQLFloat},
        description: {type: GraphQLString},
        imageUrl: {type: GraphQLString},
    },
    resolve: function (root, params) {

        // Creating product object
        return Products.create({
            price: params.price,
            name: params.name,
            description: params.description,
            imageUrl: params.imageUrl
        });
    }
};


// Exporting add method
module.exports = productAdd;