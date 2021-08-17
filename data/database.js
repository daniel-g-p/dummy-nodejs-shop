require("dotenv").config();
const { MongoClient } = require("mongodb");

let database;

const startDatabase = async function() {
    const client = new MongoClient(process.env.DB_ADDRESS);
    await client.connect();
    database = await client.db("dummy-shop");
    return;
}

module.exports = () => {
    return startDatabase()
        .catch(error => {
            console.log(error);
            throw error;
        });
}

module.exports.accessDatabase = () => {
    return database;
}