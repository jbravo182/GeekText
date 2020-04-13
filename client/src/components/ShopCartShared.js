import React, { Component } from 'react'; //server related
import { Pagination, PaginationItem, PaginationLink, Media, Button, Form } from 'react-bootstrap'; //pagination library
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './ShoppingCart.css';
import ShopCartPagination from './components/ShopCartPagination';
import axios from 'axios';
import API from "./utils/API";
import dbData from "./models/cartData.json" //may need to change directory due to their webpage components location
import saveData from "./models/saveData.json"

class ShopCartShared extends Component 
{
    //I don't think others have to make the constructor BUT the this binding they must do it.
    constructor(props){
        super(props);
        this.state = {
            userEmail: '',
            bookName: '',
            bookImageURL: '',
            bookDescription: '',
            bookID: 0,
            bookPrice: 0.99,
            bookQty: 1
            
        };
    
        //ShopCarthandlers 
        this.SCadd_handleSubmit = this.SCadd_handleSubmit.bind(this);
    }

    //DBupdaters
  //1 parameter is the obj of source , 2 parameter is itemIndex of the obj of source, 3 parameter is the dbString destination, 4 parameter is destinationID dbString.
  addToDB(objSrc, itemIndex, destination, destinationID)
  {
    //NOTE: you can write [ ], but you can't search [ ] characters...
    var emptyList = "{\"item\":[]}";
    var initialSetup = "{"+ "\"item\"" + ":[";
    var beginPosDest = destination.search(":") + 2;
    var endPosDest = destination.length - 2;
    var closingSetup = "]}"
    var tempString = "";
    var everyOtherItems = destination.substring(beginPosDest, endPosDest);
    //extract source and object, create a string with only the new item to be added
    var itemToBeAdded = JSON.stringify(objSrc.item[itemIndex]);
    //determine what to do algorithm
    /*
    -1 = no result (beginPos), "}," true (endPosSrc), Num = the position
    */
   //it always give false, but this is for no file at all only way in
    if(destination.search(":") == -1)
    {
      tempString = initialSetup + itemToBeAdded + "]}";
    }
    else if (destination == emptyList) //check for if the list is simply empty (you can't search for "[" or "]" )
    {
      tempString = initialSetup + itemToBeAdded + "]}";
    }
    else if(!(destination.search("},") == -1 ))
    {
      //file is filled but only 1 entry
      //end is ]}, but itemAdded ends },
      tempString = initialSetup + itemToBeAdded + "," + everyOtherItems + "]}";

    }
    else
    {
      //file is multiple filled items
      tempString = initialSetup + itemToBeAdded + "," + everyOtherItems + "]}";
    }

    //final string is done


    var obj = JSON.parse(tempString);
    //write file to destination
    //file location: "./models/saveData.json"
    //this code seems to work if you run JavaScript Editor
    if(destinationID == 'ShopCart')
    {
      API.fileWriteCart(obj);
    }

    if(destinationID == 'SaveLater')
    {
      API.fileWriteSave(obj);
    }
    
  }

    SCadd_handleSubmit(event)
    {
        var index = 0;
        var destinationID = 'ShopCart';
        var initialSetup = "{"+ "\"item\"" + ":[";
        var closingSetup = "]}"
        var tempString = '';
        var cartData = JSON.stringify(dbData);

        //any parsing of items in here
        tempString += initialSetup;

        //extract db items from their stuff and match them to my local db 
        //THIS IS WHERE OTHERS WILL PUT THEIR SIMILAR DATA
          var  userEmail = '',
            bookName = '',
            bookImageURL = '',
            bookDescription = '',
            bookID = 0,
            bookPrice = '',
            bookQty = 1; 

        //string element setup
        tempString += "{";
        tempString += "\"userEmail\":\"" + userEmail + "\",";
        tempString += "\"bookName\":\"" + bookName + "\",";
        tempString += "\"bookImageURL\":\"" + bookImageURL + "\",";
        tempString += "\"bookDescription\":\"" + bookDescription + "\",";
        tempString += "\"bookID\":" + bookID + ",";
        tempString += "\"bookPrice\":" + bookPrice + ",";
        tempString += "\"bookQty\":" + bookQty;
        
        tempString += "}";
        //end of string element setup

        tempString += closingSetup;

        //turn the thing above into an object
        var objGuest = JSON.parse(tempString);

        //call addToDB
        this.addToDB(objGuest, index, cartData, destinationID);

    }
    

    SCadd_visual()
    {
        
      return (
         
         <React.Fragment>
           <Button variant="outline-dark" onClick={(e) => this.SCadd_handleSubmit(e)}><u>add to shopcart</u> 

           </Button>
          </React.Fragment>
         
      );
    };

} export default ShopCartShared;