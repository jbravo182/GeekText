const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');

process.env.NODE_ENV === "production" ? app.use(express.static("client/build")) : null;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", apiRoutes);


const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`);
});