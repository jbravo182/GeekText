
import React, { Component } from "react";
import API from "../utils/API";
import StarRatingComponent from "./StarRatingComponent";
import AnonButton from './AnonButton'

export default class CommentFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",
      newname: 'Anonymous',
      value: props.name,

      comment: {
        book_title: props.title,
        nickname: props.name,
        rating: 0,
        review: ""
      }
    };

    this.updateValue = this.updateValue.bind(this);
    this.createButton = this.createButton.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onStarClick = this.onStarClick.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
  }


  updateValue = alias => {
    this.setState({
      value: alias,
    });
  }

  createButton = () => {
    const newname = this.state.newname
    return newname.map(alias => (
      <AnonButton alias={alias} updateValue={this.updateValue} />
    ))
  }

  onStarClick(nextValue, prevValue, name) {
    const value = nextValue;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
         [name]: value
      }
    });
  };

  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };

  onSubmit(e) {
    e.preventDefault();


    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    this.setState({ error: "", loading: true });

    let { comment } = this.state;
    this.setState({comment: {...comment, nickname: this.state.value}});


    API.createReview(comment)
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          this.props.addComment(comment);

          this.setState({
            loading: false,
            comment: { ...comment, review: "" }
          });
        }
      })
      .catch(err => {
        this.setState({
          error: "Something went wrong while submitting form.",
          loading: false
        });
      });
  }


  isFormValid() {
    return this.state.comment.nickname !== "" && this.state.comment.review !== "" &&
      this.state.comment.rating !== 0;
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    const { rating } = this.state;
        
    return (
      <React.Fragment>
        <StarRatingComponent
          onStarClick={this.onStarClick}
          name="rating"
          starCount={5}
          value= {rating}
        />
        <form method="post" onSubmit={this.onSubmit}>
          <div style={{ display: 'flex' }} className="form-group">
            <AnonButton alias={this.state.newname} updateValue={this.updateValue} onChange={this.handleFieldChange} />
            <input
              onChange={this.handleFieldChange}
              name="nickname"
              value={this.state.value}
              className="form-control"
              type="text"
              style={{ width: "200px" }}
            />
          </div>

          <div style={{ width: '700px' }} className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.review}
              className="form-control"
              placeholder="Add Your Review Here"
              name="review"
              rows="3"
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button style={{ border: 'none' }} disabled={this.state.loading} className="btn btn-primary">
              Submit Review
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}