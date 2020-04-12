import React, { Component } from 'react'; //server related
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap' //edgar added this for shopcart
import axios from 'axios';
import './index.css';
import book from "./book.jpg";
import Tabs from './Tabs';
import API from "./utils/API"; //edgar added this for shopcart
import dbData from "./models/cartData.json" //edgar added this for shopcart
require('./details.css');

const Book = props => (
  <tr>
    <td>{props.books.title}</td>
    <td>{props.books.author}</td>
    <td>{props.books.description}</td>
    <td>{props.books.cover}</td>
    <td>{props.books.pubisher}</td>
    <td>{props.books.genre}</td>
    <td>{props.books.pub_date}</td>
    <td>{props.books.price}</td>
  </tr>
)
class BookDetails extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      description: '',
      cover: '',
      pubisher: '',
      genre: '',
      pub_date: '',
      price: ''
    };

    //ShopCarthandlers 
    this.removesSaveLater_ButtonHandle = this.removeSaveLater_ButtonHandle.bind(this); //edgar added
    this.SCadd_handleSubmit = this.SCadd_handleSubmit.bind(this); //edgar added
  }
    componentDidMount() {
      axios.get('http://localhost:3000/api/books/5e7cc5a8e5de4c1fd85e28dd')
      .then(response => {
        this.setState({
          title: response.data.username,
          author: response.data.author,
          description: response.data.description,
          cover: response.data.cover,
          publisher: response.data.publisher,
          genre: response.data.genre,
          pub_date: response.data.pub_date,
          price: response.data.price,     
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
      console.log(this.state.title,)
    }

    displayAuthor() {
      return this.state.author;
    }

    displayDescription() {
      return this.state.description;
    }

    displayPub_info() {
      return this.state.publisher;
    }

    displayCover() {
      return this.state.cover;
    }

    //edgar added the things below
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
          var  userEmail = 'book@gmail.com',
            bookName = this.state.title,
            bookImageURL = this.state.cover,
            bookDescription = this.state.description,
            bookID = 99,
            bookPrice = this.state.price,
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
        
        alert("Book added to the Shop Cart");

    }

    SCadd_visual()
    {

      return (
         
         <React.Fragment>
           <Button variant="outline-dark" onClick={(e) => this.SCadd_handleSubmit(e)}><u>add to shopcart</u>> 

           </Button>
          </React.Fragment>
         
      );
    };
    //end of edgar adding his things below

    render (){
    return (<div>
      <h1>Book Details</h1>
      <img
          width={180}
          height={270}
          src= { this.displayCover() }
       />
      <div>Ratings: *****</div>
      <br></br>
      { this.SCadd_visual() }
      <Tabs>
        <div label="Author">
        <tbody>
            { this.displayAuthor() }
        </tbody>
        </div>
        <div label="Descripton">
        <tbody>
            { this.displayDescription() }
        </tbody>
        </div>
        <div label="Publishing Info">
        <tbody>
            { this.displayPub_info() }
        </tbody>
        </div>
        <div label="Comments">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div label="Books by Same Author">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </Tabs>
    </div>);
  }
}

/*
const container = document.createElement('div');
document.body.appendChild(container);
render(<App />, container);
*/
export default BookDetails;
  
/*
DESCRIPTION:
Display book name
book cover (which can be enlarged when clicked)
author and bio
book description
genre
publishing info(publisher, release date, etc.)
book rating
comments.
Hyperlink author’s name to a list of other books by the same author.
*/