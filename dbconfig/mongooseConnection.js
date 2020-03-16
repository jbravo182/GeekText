const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established sucessfully (Mongoose)");
})

modules.exports = mongooseConnection;