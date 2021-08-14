module.exports = (req, res, next) => {
    const { _method } = req.query;
    if (_method) {
        req.method = _method;
    }
    next();
}