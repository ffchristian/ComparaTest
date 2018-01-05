/**
 * Created by chris on 1/5/2018.
 */
const expect = require('chai').expect;

const Product = require('../src/product');


describe("Product Test", function() {

    it("should lower the price", () => {
        const product =  new Product('Medium Coverage', 10, 20);
        product.selectPriceRule();
        expect(product.price).to.be.below(20);
    });
    it("should lower the day", () => {
        const product = new Product('Medium Coverage', 10, 20);
        product.selectPriceRule();
        expect(product.sellIn).to.be.below(20);
    });
    it("should lower the price twice fast when there is no more days left", () => {
        const product = new Product('Medium Coverage', 0, 10);
        product.selectPriceRule();
        expect(product.price).to.be.equal(10 - 2);
    });
    it("should be always positive", () => {
        const product = new Product('Medium Coverage', 0, 0);
        product.selectPriceRule();
        expect(product.price).to.be.above(-1);
    });
    it("Full Coverage should increase the price the older it gets", () => {
        const product = new Product('Full Coverage', 2, 10);
        product.selectPriceRule();
        expect(product.price).to.be.above(10);
    });
    it("Full Coverage should increase twice fast the price when there is no more days left", () => {
        const product = new Product('Full Coverage', 0, 10);
        product.selectPriceRule();
        expect(product.price).to.be.equal(10+2);
    });
    it("should never be more than 50", () => {
        const product = new Product('Full Coverage', 0, 50);
        product.selectPriceRule();
        expect(product.price).to.be.below(51);
    });
    it("should never be more than 50", () => {
        const product =  new Product('Special Full Coverage', 10, 50);
        product.selectPriceRule();
        expect(product.price).to.be.below(51);
    });
    it("Mega Coverage should never be different than 80", () => {
        const product = new Product('Mega Coverage', 0, 80);
        product.selectPriceRule();
        expect(product.price).to.be.equal(80);
    });
    it("Mega Coverage should never change", () => {
        const product = new Product('Mega Coverage', 1, 80);
        product.selectPriceRule();
        expect(product.sellIn).to.be.equal(1);
    });
    it("Special Full Coverage should increase when gets older", () => {
        const product = new Product('Special Full Coverage', 20, 10);
        product.selectPriceRule();
        expect(product.price).to.be.equal(10+1);
    });
    it("Special Full Coverage should increase by 2 when is 10 or less", () => {
        const product = new Product('Special Full Coverage', 9, 10);
        product.selectPriceRule();
        expect(product.price).to.be.equal(10+2);
    });
    it("Special Full Coverage should increase by 3 when is 5 or less", () => {
        const product = new Product('Special Full Coverage', 5, 12);
        product.selectPriceRule();
        expect(product.price).to.be.equal(12+3);
    });
    it("Special Full Coverage should drop to 0 when there is no more days left", () => {
        const product = new Product('Special Full Coverage', 0, 12);
        product.selectPriceRule();
        expect(product.price).to.be.equal(0);
    });
    it("Super Sale should degrade twice as fast", () => {
        const product = new Product('Super Sale', 5, 12);
        product.selectPriceRule();
        expect(product.price).to.be.equal(12-2);
    });
});
