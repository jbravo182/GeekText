import React, { Component } from 'react'; //server related

const mongodbConnection = require("../dbconfig/connection.js");
const collection = mongodbConnection.db().collection("shopcart");
function db_retrievalinfo()
{
 
  //code db bs not working for some reason... TypeError: Cannot read property 'replace' of undefined  
 var text = ""; 
  
  //const collection = client.db("PersonalLearning").collection("WebShopEnv");
  text = collection.find({ userid: 1});

  //display in page
  return (
    <>
      <div>
    <p>{text}</p>
      </div>
    </>
  );
}

module.exports = db_retrievalinfo;