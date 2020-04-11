import React, { Component } from 'react'; //server related
import { Pagination, PaginationItem, PaginationLink, Media, Button, Form } from 'react-bootstrap'; //pagination library
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './ShoppingCart.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import ShopCartList from './components/ShopCartList';
import ShopCartPagination from './components/ShopCartPagination';
import axios from 'axios';
import API from "./utils/API";
import dbData from "./models/cartData.json"
import saveData from "./models/saveData.json"


class ShoppingCart extends Component {
  

  //bind any other function
  // this.componentDidMount = this.componentDidMount.bind(this);

  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      description: '',
      bookID: 0,
      currentID: 1,
      qty: [1],
      accumulated: 0.00,
      dbString: '',
      subtotal: [0],
      dbDataString: '',
      saveDataString: '',
      begin: 0,
      qtyMore10: [true]
    };

    //handles for the input dropdownlist
    this.qty_handleChange = this.qty_handleChange.bind(this);
    this.qty_handleSubmit = this.qty_handleSubmit.bind(this);

    //handles save + return button input
    this.saveLater_handleSubmit = this.saveLater_handleSubmit.bind(this);
    this.returnShopCart_handleSubmit = this.returnShopCart_handleSubmit.bind(this);

    //remove button
    this.removeShopCart_ButtonHandle = this.removeShopCart_ButtonHandle.bind(this);
    this.removesSaveLater_ButtonHandle = this.removeSaveLater_ButtonHandle.bind(this);
  }
  
  //DB related task
  dbStateLoadAssign()
  {
    var saveTempString = '';
    var dbTempString = '';

    //for the mean time since I need to restructure my code for frontend
    dbTempString = JSON.stringify(dbData);
    saveTempString = JSON.stringify(saveData);

    var obj1 = JSON.parse(dbTempString);
    var obj2 = JSON.parse(saveTempString);

    //loads info from the database then updates only the state above

    //axios to later get moongose then yeah... I may need to turn the result and JSON.stringify


    //just update the current state after all the retrieval

    /*
    var temp = JSON.stringify(dbData);
    //data is now on the same format as in the file but as a string
    var obj = JSON.parse(temp);

    //find a way to copy this object into the state object
    this.setState({dbString: temp}) 
    */
  }

  /* quick example
  API.getAllBooks(term).then(res => this.state.allBooks = res.data).catch(err => alert("Search error - " + err));
      this.state.books = linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).includes(term)).toArray();*/
  
  dbUpdater(JSONstring, CartOrSave)
  {
    var object = JSON.parse(JSONstring);
    var type = CartOrSave;
    //updates the json string in the state given the string parameter
    if(CartOrSave == "cart")
    {
      //this.state.dbDataString = JSONstring;
      API.updateShopCartList(object, type).catch(err => alert("update API function failed: " + err));
    }
    else if(CartOrSave == "save")
    {
      //yes me being lazy
      //this.state.saveDataString = JSONstring;
      API.updateShopCartList(object, type).catch(err => alert("update API function failed: " + err));
    }
  }

 dbLoader(JSONstring, CartOrSave)
 {
  var object = JSONstring;
  var type = CartOrSave;
  //updates the json string in the state given the string parameter
  if(CartOrSave == "cart")
  {
    //this.state.dbDataString = JSONstring;
    API.getList(object, type)
    .then(res => this.setState({['dbDataString']: res.data}) )
    .catch(err => alert("update API function failed: " + err));
  }
  else if(CartOrSave == "save")
  {
    //yes me being lazy
    //this.state.saveDataString = JSONstring;
    API.getList(object, type)
    .then(res => this.setState({['saveDataString']: res.data}))
    .catch(err => alert("update API function failed: " + err));
  }
 }



  //DBinfo functions
  dbInfoJSON()
  {
    /*
      EVERY JSON.stringify will call a special function in here that retrieves the information of the database. DO NOT USE RETURN.
      CREATE A NEW STATE THAT WILL HOLD THE DB STRING. 1 for ShopCart (dbData), 1 for SaveLater (saveData).
      keep the code below but what I have to do is EVERY JSON.stringify(dbData) and (saveData) must be changed ofc do this after I get the json
      string representation of the mongodb ShopCart and SaveLater in here. ALSO... dbString does nothing lol. CAN'T USE STATES... gotta use API
    */

    //local stuff atm...  SOLVED IT... so yeah need to make some API calls open for everyone and work with some book data and provide the add button in the book code and wishlist...
    
     // this.dbStateLoadAssign();
    

    var temp = JSON.stringify(dbData);
    //data is now on the same format as in the file but as a string
    var obj = JSON.parse(temp);

    //find a way to copy this object into the state object
    this.setState({temp});
    //alert(obj.item[0].userEmail);
    
    //cross origin error....
    
    //this.dbLoader(dbData, "cart");
    //this.dbLoader(saveData, "save");

  }

  //Handler functions below

  qty_more10Confirm(props) {
    return (
    <>
    <br></br>
    <p>qty: {props}</p>
    </>
    )
  }

  qty_more10Verify(props) {
    const verify = props.isMore;
    if (verify)
    {
      this.qty_more10Confirm()
    }
  }

  qty_handleChange(obj, itemIndex, event) {
    //this.setState({value: event.option});
    var jsonString = JSON.stringify({qty: Array.from(event.target.selectedOptions, (item) => item.value)}); //this yields {"qty":["1"]}

    //string manipulation to obtain selected value only
    if(jsonString == "{\"qty\":[\"10+\"]}")
    {
      var text = "";
      var isNum = true;
      
      do {

        if(!(isNum))
        {
          text = "please insert a number";
        }

        var qtyVar = prompt("qty to add:", text);
        isNum = /^\d+$/.test(qtyVar);


      } while (!(isNum))
      

      
      let qtyMore10 = [ ...this.state.qtyMore10 ]
      let qty = [ ...this.state.qty ];
      qtyMore10[itemIndex] = true;
      qty[itemIndex] = qtyVar;
      this.setState({ qtyMore10 });
      this.setState({ qty });
    }
    else
    {
      var qtyString = jsonString.substring(9, 10);
    
      let qtyMore10 = [ ...this.state.qtyMore10 ]
      let qty = [ ...this.state.qty ];
      qtyMore10[itemIndex] = false;
      qty[itemIndex] = qtyString;
      this.setState({ qtyMore10 });
      this.setState({ qty });

      var test = JSON.stringify(obj.item[itemIndex]);
    }
    //reads previous state, but it should update later
  }

  qty_handleSubmit(event) {
    //task to be done, in this case just add multiplier to the current subtotal of the item
    alert('state value is: 5');
    event.preventDefault();
  }
  
  saveLater_handleSubmit(obj, itemIndex, event) {

    var cartData = JSON.stringify(dbData); 
    var saveLater = JSON.stringify(saveData);
    var cartDataID = "ShopCart";
    var saveLaterID = "SaveLater";
    this.addToDB(obj, itemIndex, saveLater, saveLaterID);
    this.removeFromDB(obj, itemIndex, cartDataID);
    
  }

  returnShopCart_handleSubmit(obj, itemIndex, event) {

    var cartData = JSON.stringify(dbData); 
    var saveLater = JSON.stringify(saveData);
    var cartDataID = "ShopCart";
    var saveLaterID = "SaveLater";
    this.addToDB(obj, itemIndex, cartData, cartDataID);
    this.removeFromDB(obj, itemIndex, saveLaterID);

  }

  removeShopCart_ButtonHandle(obj, itemIndex, event) {
    var cartData = JSON.stringify(dbData); 
    var saveLater = JSON.stringify(saveData);
    var cartDataID = "ShopCart";
    var saveLaterID = "SaveLater";
    this.removeFromDB(obj, itemIndex, cartDataID);

  }

  removeSaveLater_ButtonHandle(obj, itemIndex, event) {
    var cartData = JSON.stringify(dbData); 
    var saveLater = JSON.stringify(saveData);
    var cartDataID = "ShopCart";
    var saveLaterID = "SaveLater";
    this.removeFromDB(obj, itemIndex, saveLaterID);
  }

  //end of handler functions

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

  removeFromDB(objSrc, itemIndex, objID)
  {
    var i = 0;
    var initialSetup = "{"+ "\"item\"" + ":[";
    var closingSetup = "]}"
    var everyOtherItems = "";
    var check = false
    //extract source and object, create a string with only the new item to be added
    var itemToBeDeleted = JSON.stringify(objSrc.item[itemIndex]);

    //plan traverse the array, save everything but the itemIndex item, last item closes stuff, can be done later

    everyOtherItems += initialSetup 

    //checks if last item was the one deleted
    if(itemIndex == objSrc.item.length - 1)
    {
      check = true;
    }

    for (i = 0; i < objSrc.item.length; i++)
    {
      if(i != itemIndex)
      {
        if(objSrc.item.length == 1) //only one item in the list, actually it never enters
        {
          
          everyOtherItems += "";
        }
        else if(check && (i == (objSrc.item.length - 2))) // check was true condition
        {
          everyOtherItems += JSON.stringify(objSrc.item[i]);
        }
        else if (i == objSrc.item.length - 1) //last case
        {
          everyOtherItems += JSON.stringify(objSrc.item[i]);
        }
        else //normal case
        {
          everyOtherItems += JSON.stringify(objSrc.item[i]) + ",";
        }

        
      }
      else if (check && (i == itemIndex)) //when last item is about to be removed...
      {
        everyOtherItems += "";
      }

    }

    everyOtherItems += closingSetup;

    //JSON type again (apparently string doesn't retain all of its characters)
    var obj = JSON.parse(everyOtherItems);

    if(objID == 'ShopCart')
    {
       API.fileWriteCart(obj);
    }
    if(objID == 'SaveLater')
    {
       API.fileWriteSave(obj);
    }


  }
  //focus on building a button to add cart and setup the post
    componentDidMount() {
      
      //starts the multiple state qty to 1, this is a default value, this is really to avoid NaN from appearing when grabbing the states.
      let qty = [ ...this.state.qty ];
      let subtotal = [ ...this.state.subtotal ];
      let qtyMore10 = [ ...this.state.qtyMore10 ];
      var i = 0;
      for (i = 0; i < 15; i++)
      {
        qty[i] = 1;
        subtotal[i] = 0;
        qtyMore10[i] = false;
      }
      this.setState({ qty });
      this.setState({ subtotal });
      this.setState({ qtyMore10 });


      this.dbInfoJSON();

    }

    //loop verison / official version
    itemCreator(index) {

      
      var currentItem = 0;
      currentItem = 0; //some parameter passed to here
      var currentQty = 1;
      var itemIndex = index;

      var temp = JSON.stringify(dbData);

      //var temp = this.state.dbDataString;

      //data is now on the same format as in the file but as a string
      var obj = JSON.parse(temp);
      var arrayLength = obj.item.length;
      //alert(obj.item[0].userEmail);
      
      return (
      <>
            <ListGroup.Item>
              <Media>
                <img
                  width={64}
                  height={64}
                  src={obj.item[itemIndex].bookImageURL} 
                />
                <Media.Body>
                  <h2>{obj.item[itemIndex].bookName}</h2>
                  <p>{obj.item[itemIndex].bookDescription}</p>
                  {/*task to load href arguments*/
                    
                  }
                  <br>
                  </br>
                  <Form>
                  <Form.Group controlId="quantity-form" onChange={(e) => this.qty_handleChange(obj, itemIndex, e)}>
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control as="select" custom>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10+</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
                  <br>
                  </br>
                  Current quantity:  <tab></tab> 
                  {
                  currentQty = this.state.qty[itemIndex] /*obj.item[itemIndex].bookQty this is the goal*/
                  }

                  {
                  this.itemBalance(obj.item[itemIndex].bookPrice, currentQty)
                  }
                  <br>
                  </br>
                  <Button variant="outline-dark" onClick={(e) => this.saveLater_handleSubmit(obj, itemIndex, e)}><u>save for later</u></Button>
                  <Button variant="outline-dark" onClick={(e) => this.removeShopCart_ButtonHandle(obj, itemIndex, e)}><u>remove from cart</u></Button>
                  </Media.Body>  
                </Media>
              </ListGroup.Item>
      </>
      )
    }

    //loop verison / official version
    saveItemCreator(index) {

      
      var currentItem = 0;
      currentItem = 0; //some parameter passed to here
      var currentQty = 1;
      var itemIndex = index;

      var temp = JSON.stringify(saveData);

      //var temp = this.state.saveDataString;


      //data is now on the same format as in the file but as a string
      var obj = JSON.parse(temp);
      var arrayLength = obj.item.length;
      //alert(obj.item[0].userEmail);
      
      return (
      <>
            <ListGroup.Item>
              <Media>
                <img
                  width={64}
                  height={64}
                  src={obj.item[itemIndex].bookImageURL} 
                />
                <Media.Body>
                  <h2>{obj.item[itemIndex].bookName}</h2>
                  <p>{obj.item[itemIndex].bookDescription}</p>
                  {/*task to load href arguments*/
                    
                  }
                  <br>
                  </br>
                  <Button variant="outline-dark" onClick={(e) => this.returnShopCart_handleSubmit(obj, itemIndex, e)}><u>add to shopcart</u></Button>
                  <Button variant="outline-dark" onClick={(e) => this.removeSaveLater_ButtonHandle(obj, itemIndex, e)}><u>remove from save later list</u></Button>
                  </Media.Body>  
                </Media>
              </ListGroup.Item>
      </>
      )
    }

    ShopCartList() {
    var i = 0;

    var temp = JSON.stringify(dbData);

    //var temp = this.state.dbDataString;

    //data is now on the same format as in the file but as a string
    var obj = JSON.parse(temp);
    var arrayLength = obj.item.length;
    var rows = [];
    
    
    for (i = 0; i < arrayLength; i++)
    {
      //key in here
      rows.push(this.itemCreator(i));
    }
   
      return(
        <>
        <div><h1><p>Shop Cart List</p></h1></div>
        <div>
          <ListGroup>
           {rows}
          </ListGroup>
        </div>
        <br>
        </br>
        <div>
          {this.totalDisplay(obj, arrayLength)}
        </div>
      </>
      );
    }

    SaveLaterList() {
      var i = 0;

      var temp = JSON.stringify(saveData);

      //var temp = this.state.saveDataString;

      //data is now on the same format as in the file but as a string
      var obj = JSON.parse(temp);
      var arrayLength = obj.item.length;
      var rows = [];
      
      
      for (i = 0; i < arrayLength; i++)
      {
        //key in here
        rows.push(this.saveItemCreator(i));
      }
     
        return(
          <>
          <div><h1><p>Saved for Later</p></h1></div>
          <div>
            <ListGroup>
             {rows}
            </ListGroup>
          </div>
        </>
        );
      }

    itemBalance(num, qty)
    {
      //assuming this is a string
      var total = num * qty;
      
      return(
        <>
        <p>Subtotal: ${total}</p>
        </>
      );
    }

    totalDisplay(obj, length)
    {
      var i = 0;
      var accum = 0;
      var bookSubtotal = 0;
      /*
      obj.item[i].bookPrice;
      this.state.qty[i];
      */
      for(i = 0; i < length; i++)
      {
        bookSubtotal = obj.item[i].bookPrice * this.state.qty[i];
        accum += bookSubtotal;
      }

      return(
        <>
        <p><h2>Total: ${accum}</h2></p>
        </>
      )
    }

    render()
    {
        
      return (
         
         <React.Fragment>
           {this.ShopCartList()}
           <br>
           </br>
           {this.SaveLaterList()}
          </React.Fragment>
         
      );
    };
      
  } export default ShoppingCart;