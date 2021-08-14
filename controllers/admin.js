const Product = require('../models/Product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
};

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    const product = new Product(title, imageUrl, description, Number(price));
    product.save();
    res.redirect('/');
};

exports.getEditProductForm = (req, res, next) => {
    const data = req.query;
    const { product } = Product.findByID(data.productID);
    res.render("admin/edit-product", { product, pageTitle: "Edit Product", path: "/admin/edit-product" });
}

exports.editProduct = (req, res, next) => {
    const data = req.body;
    const { product } = Product.findByID(data.productID);
    product.title = data.title;
    product.imageUrl = data.imageUrl;
    product.price = Number(data.price);
    product.description = data.description;
    const message = Product.update(product);
    console.log(message);
    res.redirect("/admin/products");
}

exports.deleteProduct = (req, res, next) => {
    const { productID } = req.body;
    const message = Product.delete(productID);
    console.log(message);
    res.redirect("/admin/products");
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('admin/products', { products, pageTitle: 'Admin Products', path: '/admin/products' });
};