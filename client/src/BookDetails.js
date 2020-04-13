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

const Book = props => (
  <tr>
    <td>{props.book.title}</td>
    <td><img width = {330} height = {500} src={props.book.cover} /> </td>
  </tr>
)

const Review = props => (
    <p>Nickname: {props.review.nickname}<br></br>
    Rating: {props.review.rating}<br></br>
    Review: {props.review.review}</p>
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
      price: '',
      avg_rating: '3',
      author_books: [],
      reviews: [],
    };
/*
    //ShopCarthandlers 
    this.removesSaveLater_ButtonHandle = this.removeSaveLater_ButtonHandle.bind(this); //edgar added
    this.SCadd_handleSubmit = this.SCadd_handleSubmit.bind(this); //edgar added
  */
}
    componentDidMount() {
      const bookId = '5e7cc600e5de4c1fd85e28de';
      axios.get(`http://localhost:3000/api/books/${bookId}`)
      .then(response => {
        const stateObj = response.data[0];
        this.setState({
          title: stateObj.title,
          author: stateObj.author,
          description: stateObj.description,
          cover: stateObj.cover,
          publisher: stateObj.publisher,
          genre: stateObj.genre,
          pub_date: stateObj.pub_date,
          price: stateObj.price,
          avg_rating: stateObj.avg_rating,
          author_bio: stateObj.author_info[0].bio,
          author_pic: stateObj.author_info[0].pic,
          reviews: stateObj.reviews
        })
        if(response.data[0].author_info[0]._id) {
          const authorID  = response.data[0].author_info[0]._id;
          axios.get(`http://localhost:3000/api/authors/books/${authorID}`)
          .then(response => {
            this.setState({author_books: response.data[0].books})
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
    return (
      <div label={label}>
      <tbody>
          {content}
      </tbody>
      </div>
    )
  }

  renderBookByAuthor = (label) => {
    return (
      <div label={label}>
      <tbody>
        {this.state.author_books.map(currentbook => {
            return <Book book={currentbook} key={currentbook._id}/>;
          })
        }
      </tbody>
      </div>
    )
  }

  renderReviews = (label) => {
    return (
      <div label={label}>
      <tbody>
        {this.state.reviews.map(currentreview => {
            return <Review review={currentreview} key={currentreview._id}/>;
          })
        }
      </tbody>
      </div>
    )
  }

  renderAuthor = (label) => {
    return (
      <div label={label}>
      <tbody>
        <p>{this.state.author}<br></br>
        <img src = {this.state.author_pic}/><br></br>
        {this.state.author_bio}</p>

      </tbody>
      </div>
    )
  }
  render() {
    const { title,cover, author, description, publisher, pub_date, avg_rating, author_bio, author_pic, reviews } = this.state;
    const pub_info = `${publisher}, ${pub_date}`;
    return (
    <div>
      <h1>Book Details</h1>
      <h2>
          <div style={{marginLeft: '25%'}}>
          {title}
          </div></h2>
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
        {this.renderAuthor("Author")}
        {this.renderTab("Description", description)}
        {this.renderTab("Publishing Info", pub_info)}
        {this.renderBookByAuthor("Books by Same Author")}
        {this.renderReviews("Reviews")}
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