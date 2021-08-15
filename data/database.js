const { MongoClient } = require("mongodb");

let database;

const startDatabase = async function() {
    const client = new MongoClient("mongodb://localhost:27017");
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