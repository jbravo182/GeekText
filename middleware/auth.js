let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
        if (token.startsWith('Bearer ')) {

            token = token.slice(7, token.length);
        }
        jwt.verify(token, "sweng1", (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Invalid Token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'No Token Provided'
        });
    }
}

module.exports = {
    checkToken: checkToken
}