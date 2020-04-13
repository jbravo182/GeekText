import React, { Component } from 'react'; //server related
import { Button } from 'react-bootstrap' //edgar added this for shopcart
import axios from 'axios';
import './index.css';
import Tabs from './Tabs';
import PrismaZoom from 'react-prismazoom';
import StarRatings from 'react-star-ratings';
//import API from "./utils/API"; //edgar added this for shopcart
//import dbData from "./models/cartData.json" //edgar added this for shopcart
require('./details.css');

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
      price: '',
      avg_rating: '3',
      author_books: [],
    };
/*
    //ShopCarthandlers 
    this.removesSaveLater_ButtonHandle = this.removeSaveLater_ButtonHandle.bind(this); //edgar added
    this.SCadd_handleSubmit = this.SCadd_handleSubmit.bind(this); //edgar added
  */
}
    componentDidMount() {
      axios.get('http://localhost:3000/api/books/5e7cc56ae5de4c1fd85e28dc')
      .then(response => {
        const stateObj = response.data[0];
        this.setState({
          title: stateObj.username,
          author: stateObj.author,
          description: stateObj.description,
          cover: stateObj.cover,
          publisher: stateObj.publisher,
          genre: stateObj.genre,
          pub_date: stateObj.pub_date,
          price: stateObj.price,
          avg_rating: stateObj.avg_rating,
          author_bio: stateObj.author_info[0].bio
        })// author_info[0]._id
        if(response.data[0].author_info[0]._id) {
          const authorID  = response.data[0].author_info[0]._id;
          axios.get(`http://localhost:3000/api/authors/books/${authorID}`)
          .then(response => {
            this.setState({author_books: response.data.books[0]})
            console.log(this.state.author_books)
          }).catch(error => {
            console.log(error)
          })

        }
      })
      .catch(function (error) {
        console.log(error);
      })
    }

  renderTab = (label,content) => {
    console.log(content, "renderTab Data")
    return (
      <div label={label}>
      <tbody>
          {content}
      </tbody>
      </div>
    )
  }

  // renderBookByAuthor = (label) => {
  //   const bookInfo = this.state.author
  //   return (
  //     <div label={label}>
  //     <tbody>
  //         {this.state.author_books.forEach(book => {
  //           book.title
  //           <img src={book.cover}/>
  //         })}

  //     </tbody>
  //     </div>
  //   )
  // }

  // }

  render() {
    const { cover, author, description, publisher, pub_date, avg_rating, author_bio } = this.state;
    const pub_info = `${publisher}, ${pub_date}`;
    const author_info = `${author}, ${author_bio}`;
    return (
    <div>
      <h1>Book Details</h1>
      
      <PrismaZoom maxZoom={1.5}>
        <img alt ="A Book" style={{marginLeft: '25%'}} src={ cover } />
      </PrismaZoom>
      <div style={{marginLeft: '25%'}}>
      <StarRatings
        rating={Number(avg_rating)}
        //rating = {3}
        starDimension="40px"
        starSpacing="18px"
        starRatedColor="red"
      />
      </div>
      <Tabs>
        {this.renderTab("Author", author_bio)}
        {this.renderTab("Description", description)}
        {this.renderTab("Publishing Info", pub_info)}
        {this.renderTab("Comments", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui")}
        {/* {this.renderBookByAuthor("Books by Same Author")} */}
      </Tabs>
   </div>
    );
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