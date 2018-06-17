// graphQl objects
let {
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLObjectType
} = require('graphql');


// setting up graphQl type
const productType = new GraphQLObjectType({
    name: 'products',
    fields: function () {

        // defining and returning fields
        return {
            id: {type: GraphQLInt},
            name: {type: GraphQLString},
            price: {type: GraphQLFloat},
            description: {type: GraphQLString},
            imageUrl: {type: GraphQLString},
        };
    }
});


// Exporting product type object
module.exports = productType;