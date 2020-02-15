let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
        if (token.startsWith('Bearer ')) {

            token = token.slice(7, token.length);
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send(err);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(400).send("No Token Provided");
    }
}

module.exports = {
    checkToken: checkToken
}