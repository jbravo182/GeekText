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
      subtotal: [0]   
    };

    //handles for the input dropdownlist
    this.qty_handleChange = this.qty_handleChange.bind(this);
    this.qty_handleSubmit = this.qty_handleSubmit.bind(this);

    //handles save button input
    this.saveLater_handleSubmit = this.saveLater_handleSubmit.bind(this);
    this.returnShopCart_handleSubmit = this.returnShopCart_handleSubmit.bind(this);
  }
  
  //DBinfo functions
  dbInfoJSON()
  {
    var temp = JSON.stringify(dbData);
    //data is now on the same format as in the file but as a string
    var obj = JSON.parse(temp);

    //find a way to copy this object into the state object
    this.setState({dbString: temp})
    //alert(obj.item[0].userEmail);
  }

  //Handler functions below
  qty_handleChange(obj, itemIndex, event) {
    //this.setState({value: event.option});
    var jsonString = JSON.stringify({qty: Array.from(event.target.selectedOptions, (item) => item.value)}); //this yields {"qty":["1"]}

    //string manipulation to obtain selected value only
    
    var qtyString = jsonString.substring(9, 10);


    let qty = [ ...this.state.qty ];
    qty[itemIndex] = qtyString;
    this.setState({ qty });

    var test = JSON.stringify(obj.item[itemIndex]);
    //reads previous state, but it should update later
    alert('previous state value is: ' + this.state.qty[itemIndex]);
  }

  qty_handleSubmit(event) {
    //task to be done, in this case just add multiplier to the current subtotal of the item
    alert('state value is: 5');
    event.preventDefault();
  }
  
  saveLater_handleSubmit(obj, itemIndex, event) {

    var cartData = JSON.stringify(dbData); 
    var saveLater = JSON.stringify(saveData);
    this.addToDB(cartData, obj, itemIndex, saveLater);
    this.removeFromDB(cartData, obj, itemIndex);
    alert("SaveLater List original string before changes:\n" + saveLater);
  }

  returnShopCart_handleSubmit(obj, itemIndex, event) {

    var cartData = JSON.stringify(dbData); 
    var saveLater = JSON.stringify(saveData);
    this.addToDB(saveLater, obj, itemIndex, cartData);

    alert('button was pressed. btw you pressed add to shopcart button. So nothing really happens.');
  }
  //end of handler functions

  //DBupdaters
  //1 parameter is source dbString, 2 parameter is the obj of source , 3 parameter is itemIndex of the obj of source, 4 parameter is the dbString destination.
  addToDB(source, objSrc, itemIndex, destination)
  {
    //NOTE: you can write [ ], but you can't search [ ] characters...
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
   //empty
    if(destination.search(":") == -1)
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


    //update destination string
    alert("Updated string to be written on SaveLater:\n\n" + tempString);

    //write file to destination
    //file location: "./models/saveData.json"
    //this code seems to work if you run JavaScript Editor
    /*
    const fs = require('fs');
    let data = tempString;
    fs.writeFile('.models/saveData.json', data, (err) => {
      if (err) throw err;
      
    });
    */
  }

  removeFromDB(source, objSrc, itemIndex)
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
        if(objSrc.item.length == 1) //only one item in the list
        {
          //do nothing
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

    }

    everyOtherItems += closingSetup;

    alert("Updated string to be removed from Cart list:\n\n" + everyOtherItems);
    //go write the file code here...

  }
  //does nothing at the moment, following tutorials
  //apparently not part of my job to do this, focus on building a button to add cart and setup the post
    componentDidMount() {
      
      //starts the multiple state qty to 1, this is a default value
      let qty = [ ...this.state.qty ];
      let subtotal = [ ...this.state.subtotal ];
      var i = 0;
      for (i = 0; i < 15; i++)
      {
        qty[i] = 1;
        subtotal[i] = 0;
      }
      this.setState({ qty });
      this.setState({ subtotal });

      this.dbInfoJSON();

      //axios code below
      /*
      axios.get("/api/ShoppingCart/displayAll")
      
      
      
      //response mapping
      .then(response => 
        response.data.results.map( items => ({
            email: `${items.data.email}`,
            name: `${items.data.name}`,
            description: `${items.data.description}`,
            bookID: `${items.data.bookID}`,
            info: ['test info']
        }))
      )

      //loading states
      .then(items => {
        this.setState({
          items,
          isLoading: false
        })
      })
 
      .catch(error => this.setState({ error, isLoading: false}));
      */
    }
  
    //loop verison / official version
    itemCreator(index) {

      
      var currentItem = 0;
      currentItem = 0; //some parameter passed to here
      var currentQty = 1;
      var itemIndex = index;
      var temp = JSON.stringify(dbData);
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
                  <Form.Group controlId="quantity-form" value={this.state.qty_handleSubmit} onChange={(e) => this.qty_handleChange(obj, itemIndex, e)}>
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
                  {
                  currentQty = this.state.qty[itemIndex], //obj.item[itemIndex].bookQty this is the goal
                  this.itemBalance(obj.item[itemIndex].bookPrice, currentQty)
                  }
                  <br>
                  </br>
                  <Button variant="outline-dark" onClick={(e) => this.saveLater_handleSubmit(obj, itemIndex, e)}><u>save for later</u></Button>
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
                  </Media.Body>  
                </Media>
              </ListGroup.Item>
      </>
      )
    }

    ShopCartList() {
    var i = 0;
    var temp = JSON.stringify(dbData);
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
        <p>Total: ${accum}</p>
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
            <ShopCartPagination></ShopCartPagination>
          </React.Fragment>
         
      );
    };
      
  } export default ShoppingCart;