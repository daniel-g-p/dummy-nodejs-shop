module.exports = (f) => {
    return (req, res, next) => {
        try {
            f(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}