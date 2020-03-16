import React, { Component } from 'react'; //server related
import { Pagination, PaginationItem, PaginationLink, Media } from 'react-bootstrap'; //pagination library
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './ShoppingCart.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import ShopCartList from './components/ShopCartList';
import ShopCartPagination from './components/ShopCartPagination';
import axios from 'axios';
import API from "./utils/API";


function oneItemCreator(item, index) {
  return (
  <>
        <ListGroup.Item>
          <Media>
            <img
              width={64}
              height={64}
              src="https://thenypost.files.wordpress.com/2015/07/to_kill_a_mockingbird.jpg" 
            />
            <Media.Body>
              {item}
              </Media.Body>  
            </Media>
          </ListGroup.Item>
  </>
  )

}

//currently in here, just try running this once before rendering and we good
function loadDbInfo() {
  var data = [""];
  API.displayAll(data)
  .then(res => data.forEach(oneItemCreator))
  .catch(err => "Error");

}

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
      info: []
    };

  } 
    
  
  //does nothing at the moment, following tutorials
    async componentDidMount() {
      const {data} = await axios.get("/api/ShoppingCart/displayAll").then(res => {
        this.setState({
          email: data.email,
          name: data.name,
          description: data.description,
          bookID: data.bookID,
          info: ['test info']
        })

      })
    }
  
    //display functions
    /*
    oneItemCreator(item, index) {
      return (
      <>
            <ListGroup.Item>
              <Media>
                <img
                  width={64}
                  height={64}
                  src="./logo.svg" 
                />
                <Media.Body>
                  {item}
                  </Media.Body>  
                </Media>
              </ListGroup.Item>
      </>
      )
    
    }
    */

    oneItemCreatorStatic() {
      return (
      <>
            <ListGroup.Item>
              <Media>
                <img
                  width={64}
                  height={64}
                  src="https://thenypost.files.wordpress.com/2015/07/to_kill_a_mockingbird.jpg" 
                />
                <Media.Body>
                  <h2>Heading item 1 dynamic</h2>
                  <p>Description item here</p>
                  </Media.Body>  
                </Media>
              </ListGroup.Item>
      </>
      )
    
    }

    oneItemCreatorSample() {
      return (
      <>
            <ListGroup.Item>
              <Media>
                <img
                  width={64}
                  height={64}
                  src="https://thenypost.files.wordpress.com/2015/07/to_kill_a_mockingbird.jpg" 
                />
                <Media.Body>
                  <h2>To Kill a Mockingbird</h2>
                  <p>To Kill a Mockingbird is a novel by Harper Lee published in 1960...</p>
                  </Media.Body>  
                </Media>
              </ListGroup.Item>
              <ListGroup.Item>
              <Media>
                <img
                  width={64}
                  height={64}
                  src="https://media.bloomsbury.com/rep/bj/9781408827765.jpg" 
                />
                <Media.Body>
                  <h2>One Thousand and One Nights</h2>
                  <p>One Thousand and One Nights is a collection of Middle Eastern fol...</p>
                  </Media.Body>  
                </Media>
              </ListGroup.Item>
              <ListGroup.Item>
              <Media>
                <img
                  width={64}
                  height={64}
                  src="https://upload.wikimedia.org/wikipedia/en/0/01/OfMiceAndMen.jpg" 
                />
                <Media.Body>
                  <h2>Of Mice and Men</h2>
                  <p>Of Mice and Men is a novella written by John Steinbeck. Publish...</p>
                  </Media.Body>  
                </Media>
              </ListGroup.Item>
      </>
      )
    
    }


    ShopCartList() {
    
      // ShoppingCart.test does nothing
      return(
        <>
        <div>
          <ListGroup>
            {this.oneItemCreatorSample()}
          </ListGroup>
        </div>
        <div>
          </div>
      </>
      );
    }

    /*.map returns something from each element in the array, put this inside the react fragment below
    {
    this.state.info.map(function(ShopCart){
               return <option
               key={info}
               value={info}>{info}
               </option>;
    }
    */
    render()
    {
        
      return (
         
         <React.Fragment>
           {this.ShopCartList()}
            <ShopCartPagination></ShopCartPagination>
          </React.Fragment>
         
      );
    };
      
  } export default ShoppingCart;