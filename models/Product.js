const fs = require('fs');
const path = require('path');
const pathUtility = require("../util/path");

const database = path.join(pathUtility, 'data', 'products.json');

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.id = this.setID();
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    setID() {
        let id = "";
        for (let i = 1; i <= 20; i++) {
            id += Math.floor(Math.random() * 10);
            if (i % 4 === 0 && i !== 20) {
                id += "-";
            }
        }
        return id;
    }
    save() {
        let products = Product.fetchAll();
        products.push(this);
        fs.writeFileSync(database, JSON.stringify(products));
    }
    static update(productData) {
        const { products, productIndex } = Product.findByID(productData.id);
        products.splice(productIndex, 1, productData);
        fs.writeFileSync(database, JSON.stringify(products));
        return `Product ${productData.id} updated`;
    }
    static delete(productID) {
        const { products, productIndex } = Product.findIndexByID(productID);
        products.splice(productIndex, 1);
        fs.writeFileSync(database, JSON.stringify(products));
        return `Product ${productID} deleted`;
    }
    static fetchAll() {
        return JSON.parse(fs.readFileSync(database));
    }
    static findByID(id) {
        const data = Product.fetchAll();
        return {
            products: data,
            product: data.find(item => item.id === id),
        }
    }
    static findIndexByID(id) {
        const data = Product.fetchAll();
        return {
            products: data,
            productIndex: data.findIndex(item => item.id === id)
        };
    }
};