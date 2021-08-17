module.exports.getLoginForm = (req, res, next) => {
    res.render("shop/login", { path: "/account/login", pageTitle: "Login" });
}

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    res.redirect("/");
}