const Product = require('../models/Product');
const Cart = require("../models/Cart");

exports.getIndex = async(req, res, next) => {
    const products = await Product.fetchAll();
    res.render('shop/index', { products, pageTitle: 'Shop', path: '/' });
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop/product-list', { products, pageTitle: 'All Products', path: '/products' });;
};

exports.getProduct = (req, res, next) => {
    const { productID } = req.params;
    const product = Product.findByID(productID);
    if (product) {
        res.render("shop/product-detail", { product, pageTitle: product.title, path: "/products" });
    } else {
        res.redirect("/shop");
    }
}

exports.addProductToCart = (req, res, next) => {
    const { productID } = req.body;
    Cart.addProduct(productID);
    res.redirect("/shop/cart");
}

exports.getCart = (req, res, next) => {
    const cart = Cart.fetchCart();
    res.render('shop/cart', { cart, path: '/cart', pageTitle: 'Your Cart' });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { path: '/orders', pageTitle: 'Your Orders' });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { path: '/checkout', pageTitle: 'Checkout' });
};