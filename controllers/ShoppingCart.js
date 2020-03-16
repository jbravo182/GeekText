const mongodbConnection = require("../dbconfig/connection.js");
const mongooseConnection = require("../dbconfig/mongooseConnection.js");
const ShoppingCart = {

    add: (body, cb) => {
        const collection = mongodbConnection.db().collection("ShopCart");
        collection.insertionOne({}, (err, result) => {
            //this activates in another page that is not shopcart, most likely book info or search
        });

    },
    displayAll: (body, cb) => {
        const collection = mongodbConnection.db().collection("ShopCart");
        collection.find({_id}, (err, result) => {
            //body contains the items passed in API, and API contains the variable in frontend ShoppingCart
            body = result;
            //body = result, body is the data sent.
        });

    },
    delete: (body, cb) => {
        const collection = mongodbConnection.db().collection("ShopCart");
        collection.deleteOne({}, (err, result) => {
            //find a way to import the current elements in the list
        });

    }
};

module.exports = ShoppingCart