// graphQl objects
let {
    GraphQLInt,
} = require('graphql');


// graphQl product type object
// which defines the structure of the graphQl object
const productType = require("../type");


// Product db object
const Products = require("../../db/database");


// Product delete method
const productDelete = {
    type: productType,
    args: {
        id: {type: GraphQLInt},
    },
    resolve: function (root, params) {
        return Products
            .findOne({where: {id: params.id}})
            .then(product => {
                return product.destroy();
            })
    }
};


// Exporting product Delete method
module.exports = productDelete;