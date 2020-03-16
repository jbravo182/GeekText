import React, { Component } from 'react'; //server related
import { Pagination, PaginationItem, PaginationLink, Media } from 'react-bootstrap'; //pagination library
import { ListGroup } from 'react-bootstrap';

function ShopCartPagination()
{
    return (
        <>
          <div className="shopcart-pagination">
          <Pagination aria-label="Page navigation">
      
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item active>{11}</Pagination.Item>
          <Pagination.Item disabled>{12}</Pagination.Item>
          <Pagination.Next disabled />
          <Pagination.Last disabled />
          </Pagination>
          </div>
      </>
      ); 
}

export default ShopCartPagination;