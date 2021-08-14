module.exports = (req, res, next) => {
    const method = req.query._method;
    if (method) {
        req.method = method;
    }
    next();
}