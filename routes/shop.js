const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get("/products/:productID", shopController.getProduct)

router.route('/cart')
    .get(shopController.getCart)
    .post(shopController.addProductToCart)
    .delete(shopController.removeItemFromCart)

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;