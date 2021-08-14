const fs = require("fs");
const path = require("path");
const pathUtility = require("../util/path");

const database = path.join(pathUtility, "data", "cart.json");

module.exports = class Cart {
    static addProduct(productID) {
        let cart = Cart.fetchCart();
        const product = cart.find(item => item.productID === productID);
        if (product) {
            product.quantity++
        } else {
            cart.push({
                productID: productID,
                quantity: 1
            })
        }
        fs.writeFileSync(database, JSON.stringify(cart));
    }
    static removeProduct(productID) {
        const cart = this.fetchCart();
        const productIndex = cart.findIndex(item => item.productID === productID);
        cart.splice(productIndex, 1);
        fs.writeFileSync(database, JSON.stringify(cart));
    }
    static fetchCart() {
        return JSON.parse(fs.readFileSync(database));
    }
};