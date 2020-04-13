// PLZ WORK ON SHOPPINGCART instead, ignore this file at all.

import React, { Component } from 'react'; //server related
import { Pagination, PaginationItem, PaginationLink, Media } from 'react-bootstrap'; //pagination library
import { ListGroup } from 'react-bootstrap';
import ShoppingCart from '../ShoppingCart'; //yes I grab values from the render ShoppingCart page
//import SC_displaydb from '../AllShopCart/controllers/SC_displaydb';
//import SC_displaydb from '../../../controllers/SC_displaydb';
//import SC_removedb from '../../../controllers/SC_removedb';
import axios from 'axios';


function oneItemCreator() {
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
              <h2>Heading item 1 dynamic</h2>
              <p>Description item here</p>
              </Media.Body>  
            </Media>
          </ListGroup.Item>
  </>
  )

}

function ShopCartList() {

  // ShoppingCart.test does nothing
  return(
    <>
    <div>
      <ListGroup>
        {oneItemCreator()}
      </ListGroup>
    </div>
    <div>
      <p>
        {ShoppingCart.test}
        </p>
      </div>
  </>
  );

}


export default ShopCartList;