const Product = require('../models/Product');
const User = require("../models/User");

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
    return res.render("shop/product-detail", { product, pageTitle: product.title, path: `Product ${product._id}` });
}

exports.addProductToCart = async(req, res, next) => {
    const { productID } = req.body;
    await User.editItemInCart(req.userId, productID);
    res.redirect("/cart");
}

exports.getCart = async(req, res, next) => {
    const { cart } = await User.findById(req.userId, "cart");
    const populatedCart = [];
    let cartTotal = 0;
    for (let item of cart) {
        const product = await Product.findById(item.id);
        if (product) {
            ["title", "imageUrl", "description", "price"].forEach(field => {
                item[field] = product[field];
            });
            populatedCart.push(item);
            cartTotal += Number(item.price) * item.quantity;
        }
    };
    res.render('shop/cart', { cart: populatedCart, cartTotal, path: '/cart', pageTitle: 'Your Cart' });
};

exports.removeItemFromCart = async(req, res, next) => {
    const { productID } = req.body;
    await User.editItemInCart(req.userId, productID, "remove");
    res.redirect("/cart");
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { path: '/orders', pageTitle: 'Your Orders' });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { path: '/checkout', pageTitle: 'Checkout' });
};