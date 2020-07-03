var chai = require('chai'), chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

const baseUrl = 'http://simondfranklininshur.pythonanywhere.com';
const allProducts = '/products';
const customers = '/customers';
const individualProduct = '/product/';
const taxiProductId = '1234';
const invalidProductId = '2222';

describe('inshur-products', function(){

    /***Scenario:Retrieve all products in the INSHUR app
        Given: The products "Taxi" and "courier" are available
        When: The request is made to retrieve all products
        Then: the products "Taxi" and "courier" will be retrieved***/

    it('retrieves all available products', (done) => {
        chai.request(baseUrl)
            .get(allProducts)
            .then(function (res) {
                const products = res.body["products"];
                const productMap = products.map(product => product.productName)

                expect(productMap).to.include('Taxi Product');
                expect(productMap).to.include('Courier Product');
                done();
            })
            .catch(done);
    });

    /***Scenario:Retrieve individual product
        Given: The product "Taxi" which has a productId of "1234"
        When: The request is made to retrieve this product
        Then: The product version "1.0" of "Taxi" is available***/

    it('retrieves an individual product', (done) => {
      chai.request(baseUrl)
        .get(`${individualProduct}/${taxiProductId}`)
        .then(function (res) {
            expect(res.body).to.have.property('productId', taxiProductId);
            expect(res.body).to.have.property('productVersion', 1.0);
            done();
        })
        .catch(done);
  });

    /***Scenario:Retrieve non existent product
    Given: A product with producId "2222" does not existent
    When: The request is made to retrieve this product
    Then: And error is thrown "product 2222 not found"***/

    it('handles a non-existent product', (done) => {
      chai.request(baseUrl)
        .get(`${individualProduct}/${invalidProductId}`)
        .then(function (res) {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('errorMessage', "product 2222 not found");
            done();
        })
        .catch(done);
  });

});