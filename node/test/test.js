var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
let assert = require('chai').assert;

chai.use(chaiHttp);

// Keep track of id for testing
let insertId = null;

describe('Testing Products', function () {

    // Testing Add method
    it('should add a SINGLE Product', (done) => {
        chai.request(server)
            .post('/?query=mutation{add(name:"product",price:32.33,description:"This is product desc",imageUrl:"http//example.com/image.jpg"){id}}')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body.data, 'object');
                assert.typeOf(res.body.data.add, 'object');
                assert.isNumber(res.body.data.add.id);

                // saving id for test use
                insertId = res.body.data.add.id;
                done();
            })
    });

    // Testing update method
    it('should update a SINGLE Product', (done) => {
        chai.request(server)
            .post('/?query=mutation{update(id:' + insertId + ',name:"product changed",price:62.66){name,price}}')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body.data, 'object');
                assert.typeOf(res.body.data.update, 'object');
                assert.isString(res.body.data.update.name);
                assert.equal(res.body.data.update.name, 'product changed');
                assert.isNumber(res.body.data.update.price);
                assert.equal(res.body.data.update.price, 62.66);
                done();
            })
    });

    // Testing display single object
    it('should list a SINGLE Product', (done) => {
        chai.request(server)
            .post('/?query={product(id:' + insertId + '){id,name,description,price}}')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body.data, 'object');
                assert.typeOf(res.body.data.product, 'object');
                assert.isNumber(res.body.data.product.id);
                assert.equal(res.body.data.product.id, insertId);
                assert.isString(res.body.data.product.name);
                assert.equal(res.body.data.product.name, 'product changed');
                assert.isNumber(res.body.data.product.price);
                assert.equal(res.body.data.product.price, 62.66);
                done();
            })
    });

    // Testing Deleting method
    it('should delete a SINGLE Product', (done) => {
        chai.request(server)
            .post('/?query=mutation{delete(id:' + insertId + '){id}}')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.typeOf(res.body.data, 'object');
                assert.typeOf(res.body.data.delete, 'object');
                assert.isNumber(res.body.data.delete.id);
                assert.equal(res.body.data.delete.id, insertId);
                done();
            })
    });

    // Testing all products
    it('should list ALL Products', function(done) {
        chai.request(server)
            .get('/?query={products{id,name}}')
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.typeOf(res.body.data, 'object');
                assert.typeOf(res.body.data.products, 'array');
                done();
            });
    });


});

