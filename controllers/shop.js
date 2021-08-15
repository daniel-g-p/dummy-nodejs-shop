const Product = require('../models/Product');
const Cart = require("../models/Cart");

exports.getIndex = async(req, res, next) => {
    const products = await Product.getAll();
    return res.render('shop/index', { products, pageTitle: 'Shop', path: '/' });
};

exports.getProducts = async(req, res, next) => {
    const products = await Product.getAll();
    return res.render('shop/product-list', { products, pageTitle: 'All Products', path: '/products' });
};

exports.getProduct = async(req, res, next) => {
    const { productID } = req.params;
    const product = await Product.findById(productID);
    res.render("shop/product-detail", { product: product, pageTitle: product.title, path: `Product ${product._id}` });
}

exports.addProductToCart = (req, res, next) => {
    const { productID } = req.body;
    Cart.addProduct(productID);
    res.redirect("/cart");
}

exports.getCart = (req, res, next) => {
    const cart = Cart.fetchCart();
    const productsData = Product.fetchAll();
    const cartTotal = cart.reduce((total, item) => {
        const product = productsData.find(product => product.id === item.productID);
        ["title", "imageUrl", "price", "description"].forEach(field => {
            item[field] = product[field];
        })
        return total + product.price * item.quantity;
    }, 0);
    res.render('shop/cart', { cart, total: cartTotal, path: '/cart', pageTitle: 'Your Cart' });
};

exports.removeItemFromCart = (req, res, next) => {
    const { productID } = req.body;
    Cart.removeProduct(productID);
    res.redirect("/cart");
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { path: '/orders', pageTitle: 'Your Orders' });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { path: '/checkout', pageTitle: 'Checkout' });
};