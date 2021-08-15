const express = require('express');

const tryCatch = require("../util/tryCatchWrapper");
const adminController = require('../controllers/admin');

const router = express.Router();

router.route('/add-product')
    .get(tryCatch(adminController.getAddProduct))
    .post(tryCatch(adminController.postAddProduct));

router.route("/edit-product")
    .get(tryCatch(adminController.getEditProductForm))
    .post(tryCatch(adminController.editProduct));

router.post("/delete-product", tryCatch(adminController.deleteProduct));

router.get('/products', tryCatch(adminController.getProducts));

module.exports = router;