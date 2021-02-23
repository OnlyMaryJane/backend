const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../api/config.js");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                // token is invalid
                res.status(401).json({ you: "Limited Access" });
            } else {
                // token is valid
                req.jwt = decodedToken;

                next();
            }
        });
    } else {
        res.status(401).json({ you: "Access Denied" });
    }
};