const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017/");

const startDatabase = async function() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to database");
    } finally {
        await client.close();
    }
}

module.exports = () => {
    return startDatabase().catch(error => console.log(error));
}