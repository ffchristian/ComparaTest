/**
 * Created by chris on 1/5/2018.
 */
const constants = require('./../constants/index');
class Product {
    constructor(name, sellIn, price) {
        this.name = name;
        this.sellIn = sellIn;
        this.price = price;
    }
    selectPriceRule(){
        let rule = 'basic';
        switch (this.name){
            case constants.productNames.superSale:
                rule = 'superSale';
                break;
            case constants.productNames.specialFullCoverage:
                rule = 'specialFullCoverage';
                break;
            case constants.productNames.fullCoverage:
                rule = 'fullCoverage';
                break;
            case constants.productNames.megaCoverage:
                rule = 'noRule';
        }
        this.applyRule(rule)
    }
    applyRule(rule){

        const common = () =>{
            this.sellIn--;
            if(this.price > constants.maxPrice) this.price = constants.maxPrice;
            if(this.price < constants.minPrice ) this.price = constants.minPrice;
        };

        const rules = {
            superSale: () => {
                this.price -= constants.baseDecrease*2;
                common();
            },
            specialFullCoverage: () => {
                if(this.sellIn > 10){
                    this.price += constants.baseIncrease;
                }else if(this.sellIn <= 10 && this.sellIn > 5){
                    this.price += constants.baseIncrease*2;
                }else if(this.sellIn <= 5 && this.sellIn > 0) {
                    this.price += constants.baseIncrease*3;
                }else this.price = 0;
                common();
            },
            fullCoverage: () => {
                if(this.sellIn > 0){
                    this.price += constants.baseIncrease;
                }else this.price += constants.baseIncrease*2;
                common();
            },
            basic: () => {
                if(this.sellIn){
                    this.price -= constants.baseDecrease;
                }else this.price -= constants.baseDecrease*2;
                common();
            },
            noRule: () => {
                return;
            }
        };

        return rules[rule]();
    }
}
module.exports = Product;