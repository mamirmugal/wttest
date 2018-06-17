// Express object
const app = require('express')();


// to setup graphQl schema
let GraphQLHttp = require('express-graphql');


// Setting up product schema
const productSchema = require('./graphql/schema');


// setting up graphql server
app.use('/', GraphQLHttp({
    schema: productSchema,
    root: global,
    graphiql: true
}));


// initializing a port
app.listen(3000);


// Exporting app for testing
module.exports = app;