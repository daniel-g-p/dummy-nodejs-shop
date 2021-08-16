const Product = require('../models/Product');

exports.getAddProduct = (req, res, next) => {
    return res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
};

exports.postAddProduct = async(req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    await new Product(title, imageUrl, description, Number(price)).save();
    return res.redirect('/');
};

exports.getEditProductForm = async(req, res, next) => {
    const { productID } = req.query;
    const product = await Product.findById(productID);
    return res.render("admin/edit-product", { product, pageTitle: "Edit Product", path: "/admin/edit-product" });
}

exports.editProduct = async(req, res, next) => {
    const { title, imageUrl, description, price, productID } = req.body;
    await new Product(title, imageUrl, description, price).save(productID);
    res.redirect(`/products/${productID}`);
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