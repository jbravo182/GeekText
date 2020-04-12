const mongodbConnection = require("../dbconfig/connection.js");
const review = {
    createReview: (data, cb) => {
        const collection = mongodbConnection.db().collection("Review");
        collection.insertOne(data, (err, result) => {
            if (!err) {
                cb(200, result)
            }
            else {
                cb(500, err);
            }
        });
    },

    getNickname: (data, cb) => {
        const collection = mongodbConnection.db().collection("User");
        collection.findOne({nickname: data.nickname}, (findError, findResult) => {
            if(findResult){
                const {password, _id, ...rest} = findResult;
                cb(200, nickname);
            } else {
                cb(404, findError);
            }
        });
    },

    getReview: (data, cb) => {
        const collection = mongodbConnection.db().collection("Review");
        collection.findOne({title: data.book_title}, (findError, findResult) => {
            if(findResult){
                const {password, _id, ...rest} = findResult;
                cb(200, title);
            } else {
                cb(404, findError);
            }
        });
    },

    addAverageRating: (data, cb) => {
        const collection = mongodbConnection.db().collection("Book");
        collection.update(
          {}  
        )
        collection.insertOne(data, (err, result) => {
            if (!err) {
                cb(200, result)
            }
            else {
                cb(500, err);
            }
        });
    },

}

module.exports = review;