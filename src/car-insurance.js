/**
 * Created by chris on 1/5/2018.
 */
class CarInsurance {
    constructor(products = []) {
        this.products = products;
    }
    updatePrice() {
        this.products.forEach( product =>{
            product.selectPriceRule();
        });

        return this.products;
    }
}

module.exports = CarInsurance;