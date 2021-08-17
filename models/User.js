const { ObjectId } = require("mongodb");

const { accessDatabase } = require("../data/database");

module.exports = class User {
    constructor(username, email, password, role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.cart = [];
    }
    async save(id) {
        try {
            const db = accessDatabase();
            const filter = { _id: new ObjectId(id) };
            const user = { $set: this };
            const option = { upsert: true };
            return await db.collection("users").updateOne(filter, user, option);
        } catch (error) {
            throw error;
        }
    }
    static async editItemInCart(userId, itemId, operation = "add") {
        try {
            const { cart } = await User.findById(userId, "cart");
            const itemIndex = cart.findIndex(item => item.id === itemId);
            switch (operation) {
                case "add":
                    if (itemIndex !== -1) { cart[itemIndex].quantity++ } else { cart.push({ id: itemId, quantity: 1 }) };
                    break;
                case "remove":
                    if (itemIndex !== -1) { cart.splice(itemIndex, 1) } else { return };
                    break;
                default:
                    return;
            }
            const db = accessDatabase();
            const filter = { _id: new ObjectId(userId) };
            const data = { $set: { cart: cart } };
            await db.collection("users").updateOne(filter, data);
            return;
        } catch (error) {
            throw error
        }
    }
    static async findById(id, ...fields) {
        try {
            const db = accessDatabase();
            const query = { _id: new ObjectId(id) };
            const options = { projection: {} };
            fields.forEach(field => {
                options.projection[field] = 1;
            });
            return await db.collection("users").findOne(query, options);
        } catch (error) {
            throw error
        }
    }
    static async getIdByEmail(email) {
        try {
            const db = accessDatabase();
            const query = { email: email };
            const options = { projection: { "email": 1 } };
            return await db.collection("users").findOne(query, options);
        } catch (error) {
            throw error;
        }
    }
    static async getAll(...fields) {
        try {
            const db = accessDatabase();
            const options = { projection: {} };
            fields.forEach(field => {
                options.projection[field] = 1;
            });
            return await db.collection("users").find({}, options).toArray();
        } catch (error) {
            throw error;
        }
    }
}