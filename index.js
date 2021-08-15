const express = require('express');
const path = require('path');

const connectToDatabase = require("./data/database");
const methodOverride = require("./util/method-override");
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

connectToDatabase();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", methodOverride);

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use("/", (err, req, res, next) => {
    console.log(err);
});

app.use(errorController.get404);

app.listen(3000, () => {
    console.log("Serving on http://localhost:3000")
});