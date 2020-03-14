const mongodbConnection = require("../dbconfig/connection.js");
const search = {
    getSearchResult: (data, cb) => {
        //Access User Collection in MongoDB
        const collection = mongodbConnection.db().collection("Book");
        //Find user by primary key (email)
        console.log('Entered');
        console.log('Data in controller ' + data.data);
        collection.find( { $text: { $search: data.term } } ).toArray(function(findError, findResult) {
            if(findResult){
                //Ignore password and object ID fields from findResult object
                //const {password, _id, ...rest} = findResult;
                console.log('Found result ' + findError);
                cb(200, findResult);
            } else {
                console.log('Found error ' + findError);
                cb(404, findError);
            }
        });
    }
};

module.exports = search;
