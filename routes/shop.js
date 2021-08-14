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

// {
//     "title": "A Book",
//     "imageUrl": "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
//     "description": "This is an awesome book!",
//     "price": "19"
// }