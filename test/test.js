var chai = require('chai'), chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json'));

const baseUrl = 'http://simondfranklininshur.pythonanywhere.com';
const allProducts = '/products';
const customers = '/customers';
const individualProduct = '/product/';
const productId = '';

/***Scenario:Retrieve all products in the INSHUR app
    Given: The products "Taxi" and "courier" are available
    When: The request is made to retrieve all products
    Then: the products "Taxi" and "courier" will be retrieved***/

describe('inshur-app', function(){

  it('retrieves all available products', () => {
      chai.request(baseUrl)
        .get(allProducts)
        .then(function (res) {
            // const data = JSON.parse(res.text);
            // console.log(data.0)
            expect(res.text["products"]).to.have.property('productName', 'Taxi Product');
        })
        .catch(function (err) {
            throw err;
        });
  });
});

/***Scenario:Retrieve individual product
Given: The product "Taxi" which has a productId of "1234"
When: The request is made to retrieve this product
Then: The product version "1.0" of "Taxi" is available


Scenario:Retrieve non existent product
Given: A product with producId "2222" does not existent
When: The request is made to retrieve this product
Then: And error is thrown "product 2222 not found"

Feature2: Customers
Scenairo: Retreive all existing customers
Given: the following customers are available       
| customer1 | customer2 | customer3 | customer4| customer5 | customer6 |
When: The request is made to retrieve all customers
Then: all customer details are retrieved successfully***/