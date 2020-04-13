//You may delete this file

const mongodbConnection = require("../dbconfig/connection.js");
const ShoppingCart = {

    add: (body, cb) => {
        const collection = mongodbConnection.db().collection("ShopCart");

        //retrieve current info from body

        collection.save({}, (err, result) => {
            //this activates in another page that is not shopcart, most likely book info or search
            if (!err) {
                cb(200, result)
            }
            //error
            else {
                console.log(err);
                cb(500, err);
            }
        });

    },
    displayAll: (body, cb) => {
        const collection = mongodbConnection.db().collection("ShopCart");
        collection.find({_id}, (err, result) => {
            //body contains the items passed in API, and API contains the variable in frontend ShoppingCart
            if (!err) {
                cb(200, result)
            }
            //error
            else {
                console.log(err);
                cb(500, err);
            }
            //body = result, body is the data sent.
        });

    },
    delete: (body, cb) => {
        const collection = mongodbConnection.db().collection("ShopCart");
        collection.deleteOne({}, (err, result) => {
            //find a way to import the current elements in the list
            if (!err) {
                cb(200, result)
            }
            //error
            else {
                console.log(err);
                cb(500, err);
            }
        });

    },
    update: (body, cb) => {
        const collection = mongodbConnection.db().collection("ShopCart");
        collection.save({}, (err, result) => {
            //find a way to import the current elements in the list
            if (!err) {
                cb(200, result)
            }
            //error
            else {
                console.log(err);
                cb(500, err);
            }
        });

    }
};

module.exports = ShoppingCart