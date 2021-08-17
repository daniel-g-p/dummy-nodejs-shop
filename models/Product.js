const { ObjectId } = require("mongodb");

const { accessDatabase } = require("../data/database");

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    async save(id) {
        try {
            const db = accessDatabase();
            const filter = { _id: new ObjectId(id) };
            const product = { $set: this };
            const options = { upsert: true };
            return await db.collection("products").updateOne(filter, product, options);
        } catch (error) {
            throw error;
        }
    }
    static async findById(id) {
        try {
            const db = accessDatabase();
            const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
            console.log(product);
            return product;
        } catch (error) {
            throw error;
        }
    }
    static async getAll() {
        try {
            const db = accessDatabase();
            return await db.collection("products").find({}).toArray();
        } catch (error) {
            throw error;
        }
    }
    static async removeById(id) {
        try {
            const db = accessDatabase();
            const product = await db.collection("products").findOneAndDelete({ _id: new ObjectId(id) });
            return product.value._id.toString();
        } catch (error) {
            throw error;
        }
    }
}