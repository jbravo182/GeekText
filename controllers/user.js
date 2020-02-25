const mongodbConnection = require("../dbconfig/connection.js");
const user = {
    getUser: (data, cb) => {
        //Access User Collection in MongoDB
        const collection = mongodbConnection.db().collection("User");
        //Find user by primary key (email)
        collection.findOne({ email: data.email }, (findError, findResult) => {
            if(findResult){
                //Ignore password and object ID fields from findResult object
                const {password, _id, ...rest} = findResult;
                cb(200, rest);
            } else {
                cb(404, findError);
            }
        });
    },
    updateUser: (data, cb) => {
        //
        const collection = mongodbConnection.db().collection("User");
        //
        collection.updateOne(data.primaryKeys, data.updates, (error, result) => {
            if (!error) {
                cb(200, result);
            } else {
                console.log("UPDATE ERROR: " + error);
                cb(500, error);
            }
        });

    },
    getCreditCardsByUser: (data, cb) => {
        //Access CreditCard collection
        const collection = mongodbConnection.db().collection("CreditCard");
        //Find credit cards by user email (foreign key)
        collection.find({ email: data.email }, (findError, findResults) => {
            if(findResults){
                cb(200, findResults);
            } else {
                cb(404, findError);
            }
        });
    },
    addCreditCard: (data, cb) => {
        //Access CreditCard collection
        const collection = mongodbConnection.db().collection("CreditCard");
        //Insert credit card into CreditCard collection
        collection.insertOne(data, (addError, addResult) => {
            if(!addError) {
                cb(200, addResult);
            } else {
                console.log(addError);
                cb(500, addError);
            }
        });
    },
    removeCreditCard: (data, cb) => {
        //Access CreditCard collection
        const collection = mongodbConnection.db().collection("CreditCard");
        //Delete credit card from collection
        collection.deleteOne(data, (deleteError, deleteResult) => {
            if(!deleteError) {
                cb(200, deleteResult);
            } else {
                console.log(deleteError);
                cb(500, deleteError);
            }
        });
    },
    updateCreditCard: (data, cb) => {
        //Access CreditCard collection
        const collection = mongodbConnection.db().collection("CreditCard");
        //Update credit card
        collection.updateOne(data.primaryKeys, data.updates, (error, result) => {
            if(!error){
                cb(200, result);
            } else {
                console.log(error);
                cb(500, error);
            }
        });
    },
    getShippingAddressesByUser: (data, cb) => {
        //Access Shipping Address collection
        const collection = mongodbConnection.db().collection("ShippingAddress");
        //Find shipping address by primary key (email and address)
        collection.find({ email: data.email, address: data.address}, (findError, findResults) => {
            if(findResults){
                cb(200, findResults);
            } else {
                cb(404, findError);
            }
        });
    },
    addShippingAddress: (data, cb) => {
        //Access Shipping Address collection
        const collection = mongodbConnection.db().collection("ShippingAddress");
        //Add shipping address to collection
        collection.insertOne(data, (addError, addResult) => {
            if (!addError) {
                cb(200, addResult);
            } else {
                console.log(addError);
                cb(500, addError);
            }
        });
    },
    removeShippingAddress: (data, cb) => {
        //Access Shipping Address collection
        const collection = mongodbConnection.db().collection("ShippingAddress");
        //Delete shipping address from collection
        collection.deleteOne(data, (deleteError, deleteResult) => {
            if(!deleteError) {
                cb(200, deleteResult);
            } else {
                console.log(deleteError);
                cb(500, deleteError);
            }
        });
    },
    updateShippingAddress: (data, cb) => {
        //Access Shipping Address collection
        const collection = mongodbConnection.db().collection("ShippingAddress");
        //Update the shipping address
        collection.updateOne(data.primaryKeys, data.updates, (updateError, updateResult) => {
            if(!updateError){
                cb(200, updateResult);
            } else {
                console.log(updateError);
                cb(500, updateError);
            }
        });
    }
};

module.exports = user;
