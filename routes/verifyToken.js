const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const token = req.header('bearer-token');
    if (!token) return res.status(401).json({ status: false, message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ status: false, message: "Invalid Token" })
    }
}

module.exports = authenticate