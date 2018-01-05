/**
 * Created by chris on 1/5/2018.
 */
const expect = require('chai').expect;
const CarInsurance = require('../src/car-insurance');
const Product = require('../src/product');
describe("car Insurance Test", function() {
    it("should return an array", () => {
        const carInsurance = new CarInsurance([ new Product('Special Full Coverage', 5, 12) ]);
        expect(carInsurance.updatePrice()).to.be.an('array');
    });
});