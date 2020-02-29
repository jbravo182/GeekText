import React, { Component } from 'react'; //server related
import { Pagination, PaginationItem, PaginationLink, Media } from 'react-bootstrap'; //pagination library
import { ListGroup } from 'react-bootstrap';

function ShopCartList() {


  return(
    <>
    <div>
      <ListGroup>
        <ListGroup.Item>
          <Media>
            <img
              width={64}
              height={64}
              src="./logo.svg" 
            />
            <Media.Body>
              <h2>Heading item 2</h2>
              <p>Description item here</p>
            </Media.Body>  
          </Media>
        </ListGroup.Item>
        <ListGroup.Item>
        <Media>
            <img
              width={64}
              height={64}
              src="./logo.svg" 
            />
            <Media.Body>
              <h2>Heading item 1</h2>
              <p>Description item here</p>
            </Media.Body>  
          </Media>
        </ListGroup.Item>  
      </ListGroup>
    </div>
  </>
  );

}

export default ShopCartList;