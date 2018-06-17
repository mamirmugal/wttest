
// graphQl objects
let {
    GraphQLObjectType,
    GraphQLSchema,
} = require('graphql');


// graphQl Mutation objects
const productAdd = require("./mutation/add");
const productUpdate = require("./mutation/update");
const productDelete = require("./mutation/delete");


// graphQl Query objects
const queryType = require("./query");


// Setting up product schema for graphQl
const productSchema = new GraphQLSchema({

    // Setting up query object
    query: queryType,

    // Setting up Mutation methods
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: function () {
            return {

                // Adding product method
                add: productAdd ,

                // Updating product method
                update: productUpdate ,

                // Deleting product method
                delete: productDelete

            }
        }
    })
});


// Exporting product schema
module.exports = productSchema;