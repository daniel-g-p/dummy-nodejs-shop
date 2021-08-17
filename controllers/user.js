const User = require("../models/User");

module.exports.getLoginForm = (req, res, next) => {
    res.render("shop/login", { path: "/account/login", pageTitle: "Login" });
}

module.exports.login = async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.getIdByEmail(email);
    if (user) {
        req.session.userId = user._id.toString();
        return res.redirect("/");
    } else {
        return res.redirect("/account/login");
    }
}

module.exports.logout = async(req, res, next) => {
    await req.session.destroy(error => { if (error) { throw error } });
    return res.redirect("/account/login");
}