
const mongodbConnection = require("../dbconfig/connection.js");
const review = {
    getNickname: (data, cb) => {
        const collection = mongodbConnection.db().collection("User");
        collection.findOne({email: data.email}, (findError, findResult) => {
            if(findResult){
                const {nickname} = findResult;
                cb(200, nickname);
            } else {
                cb(404, findError);
            }
        });
    }

};