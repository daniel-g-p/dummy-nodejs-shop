const express = require("express");

const user = require("../controllers/user");
const tryCatch = require("../util/tryCatchWrapper");

const router = express.Router();

router.route("/login")
    .get(tryCatch(user.getLoginForm))
    .post(tryCatch(user.login));

router.post("/logout", user.logout);

module.exports = router;