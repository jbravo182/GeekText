import React, { Component } from 'react'; //server related
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShopCartList from './components/ShopCartList';
import ShopCartPagination from './components/ShopCartPagination';
import db_retrievalinfo from './components/db_retrievalinfo';



const MAX_ITEM_VIEW = 10;
/*
//database related info
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://edgarb:mongodb@personallearning-4harg.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("personallearning").collection("WebShopEnv");
  // perform actions on the collection object
  client.close();
});

*/

class App extends Component {

  //generic webpage loader
  state = {
      data: null
    };
  
    componentDidMount() {
        // Call our fetch function below once the component mounts
      this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
      // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
      const response = await fetch('/express_backend');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };
    
    render()
    {
        
      return (
         
         <React.Fragment>
           <ShopCartList></ShopCartList>
            <ShopCartPagination></ShopCartPagination>
          </React.Fragment>
         
      );
    };
      
  } export default App;