const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.route('/add-product')
    .get(adminController.getAddProduct)
    .post(adminController.postAddProduct)

router.route("/edit-product")
    .get(adminController.getEditProductForm)
    .post(adminController.editProduct);

router.post("/delete-product", adminController.deleteProduct);

router.get('/products', adminController.getProducts);

module.exports = router;