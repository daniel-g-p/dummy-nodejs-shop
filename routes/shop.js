const express = require('express');

const tryCatch = require("../util/tryCatchWrapper");
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', tryCatch(shopController.getIndex));

router.get('/products', tryCatch(shopController.getProducts));

router.get("/products/:productID", tryCatch(shopController.getProduct));

router.route('/cart')
    .get(tryCatch(shopController.getCart))
    .post(tryCatch(shopController.addProductToCart))
    .delete(shopController.removeItemFromCart)

// router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;