import React, { Component } from 'react'; //server related
import { Pagination, PaginationItem, PaginationLink, Media } from 'react-bootstrap'; //pagination library
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import axios from 'axios';
import API from "./utils/API";
import { render } from "react-dom";
import './index.css';
import book from "./book.jpg";
import Tabs from './Tabs';

require('./details.css');

class BookDetails extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      description: '',
      publishing: 'N/A',
    }
  }
    componentDidMount() {
      
      // GET BOOK DETAILS: 
      axios.get("api/book/1")// /book/${props.id}
      .then(response => {
        console.log(response, "KEVIN response")
        this.setState({
            title: response.data.title,
            author: response.data.author,
            description: response.data.description,
            publishing: response.data.publishing
        })
      }).catch(function (error) { console.log(error);})
    }
    render (){
    return (<div>
      <h1>Book Details</h1>
      <img src={book} />
      <div>Ratings: *****</div>
      <Tabs>
        <div label="Author">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <div label="Descripton">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
        <div label="Publishing Info">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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