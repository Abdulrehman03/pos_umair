const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: "NO token, authorization denied" });
    }
    try {

        const decoded = jwt.verify(token, "JWTSECRET");
        req.user = decoded.user
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is Not Valid" });
    }

}