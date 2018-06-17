
// graphQl objects
let {
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
} = require('graphql');


// graphQl product type object
// which defines the structure of the graphQl object
const productType = require("../type");


// Product db object
const Products = require("../../db/database");


// Product Update method
const productUpdate = {

    // Setting up product type
    type: productType,

    // Setting up arguments
    args: {
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        price: {type: GraphQLFloat},
        description: {type: GraphQLString},
        imageUrl: {type: GraphQLString},
    },
    resolve: function (root, params) {

        // Product find and update method
        return Products
            .findOne({where: {id: params.id}})
            .then(product => {
                product.name = params.name;
                product.price = params.price;
                product.description = params.description;
                product.imageUrl = params.imageUrl;
                return product.save();
            })
    }
};


// Exporting product update object
module.exports = productUpdate;