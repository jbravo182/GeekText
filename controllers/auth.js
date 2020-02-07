const mongodbConnection = require("../dbconfig/connection.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = {
    authenticateUser: (body, cb) => {
        const collection = mongodbConnection.db().collection("Auth");
        collection.findOne({ email: body.email }, (err, result) => {
            if (result != null) {
                bcrypt.compare(body.password, result.password, function (error, res) {
                    let token = jwt.sign({ username: result.email },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '24h'
                        }
                    )
                    if (res) {
                        cb(200, token);
                    }
                    else {
                        cb(500, error);
                    }

                });
            }
            else {
                cb(500, err);
            }
        });
    },
    createUser: (data, cb) => {
        const collection = mongodbConnection.db().collection("Auth");
        collection.findOne({ email: data.email }, (findError, findResult) => {
            if (!findResult) {
                bcrypt.hash(data.password, 10, (err, hash) => {
                    data.password = hash;
                    collection.insertOne(data, function (error, result) {
                        if (!(err && error)) {
                            cb(200, result)
                        } else {
                            console.log(err.error);
                            cb(500, err);
                        }
                    });
                });
            }
            else {
                cb(500, findError);
            }
        });
    }
}

module.exports = auth;