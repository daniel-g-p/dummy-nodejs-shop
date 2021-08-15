const Product = require('../models/Product');

exports.getAddProduct = (req, res, next) => {
    return res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
};

exports.postAddProduct = async(req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    const product = new Product(title, imageUrl, description, Number(price));
    await product.add();
    return res.redirect('/');
};

exports.getEditProductForm = async(req, res, next) => {
    const { productID } = req.query;
    const product = await Product.findById(productID);
    return res.render("admin/edit-product", { product, pageTitle: "Edit Product", path: "/admin/edit-product" });
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

exports.deleteProduct = async(req, res, next) => {
    const { productID } = req.query;
    const deletedId = await Product.removeById(productID);
    console.log(`Product ${deletedId} has been deleted`);
    return res.redirect("/admin/products");
}

exports.getProducts = async(req, res, next) => {
    const products = await Product.getAll();
    return res.render('admin/products', { products, pageTitle: 'Admin Products', path: '/admin/products' });
};