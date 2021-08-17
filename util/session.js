require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, httpOnly: true },
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/dummy-shop' })
})