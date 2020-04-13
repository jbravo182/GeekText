const mongodbConnection = require("../dbconfig/connection.js");
const search = {
    getAllBooks: (data, cb) => {
        const collection = mongodbConnection.db().collection("Book");
        collection.find({}).toArray((err, result) => {
            if (!err) {
                cb(200, result)
            }
            else {
                console.log(err);
                cb(500, err);
            }
        });
    }
    // getSearchResult: (data, cb) => {
    //     //Access User Collection in MongoDB
    //     const collection = mongodbConnection.db().collection("Book");
    //     //Find user by primary key (email)
    //     console.log('Entered');
    //     console.log('Data in controller ' + data.term);
    //     collection.find( { title : data.title } ).toArray(function(findError, findResult) {
    //         if(findResult){
    //             //Ignore password and object ID fields from findResult object
    //             //const {password, _id, ...rest} = findResult;
    //             console.log('Found result ' + findError);
    //             cb(200, findResult);
    //         } else {
    //             console.log('Found error ' + findError);
    //             cb(404, findError);
    //         }
    //     });
    // }
};

module.exports = search;
