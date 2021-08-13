const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.route('/add-product')
    .get(adminController.getAddProduct)
    .post(adminController.postAddProduct)

router.get('/products', adminController.getProducts);

module.exports = router;