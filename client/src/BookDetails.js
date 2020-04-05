import React, { Component } from 'react'; //server related
import { Link } from 'react-router-dom'
import axios from 'axios';
import './index.css';
import book from "./book.jpg";
import Tabs from './Tabs';
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
    }
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
    render (){
    return (<div>
      <h1>Book Details</h1>
      <img
          width={180}
          height={270}
          src= { this.displayCover() }
       />
      <div>Ratings: *****</div>
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