// environment handling of JWT secret
module.exports = {
    jwtSecret: process.env.JWT_SECRET || "secret",
};