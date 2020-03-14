const mongodbConnection = require("../dbconfig/connection.js");
const search = {
    getSearchResult: (data, cb) => {
        //Access User Collection in MongoDB
        const collection = mongodbConnection.db().collection("Book");
        //Find user by primary key (email)
        collection.find( { $text: { $search: data.term } }, (findError, findResult) => {
            if(findResult){
                //Ignore password and object ID fields from findResult object
                //const {password, _id, ...rest} = findResult;
                cb(200, findResult);
            } else {
                cb(404, findError);
            }
        });
    }
};

module.exports = search;
