  
import React, { Component } from "react";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",

      comment: {
        name: "",
        message: ""
      }
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


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

  goAnonymous = event => {
    console.log('Anonymous');
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.comment.name);
    console.log(this.state.comment.message);

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    this.setState({ error: "", loading: true });

    let { comment } = this.state;
    fetch("http://localhost:3000", {
      method: "post",
      body: JSON.stringify(comment)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          comment.time = res.time;
          this.props.addComment(comment);

          this.setState({
            loading: false,
            comment: { ...comment, message: "" }
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
    return this.state.comment.name !== "" && this.state.comment.message !== "";
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <form method="post" onSubmit={this.onSubmit}>
          <div style={{display:'flex'}} className="form-group">
            <input
              onChange={this.handleFieldChange}
              value={this.state.comment.name}
              className="form-control"
              placeholder="nickname"
              name="name"
              type="text"
              style={{width:"200px"}}
              disabled='true'
            />
            <button type='button' onClick= {this.goAnonymous}>Go Anonymous</button>
          </div>

          <div style={{ width: '700px'}} className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.message}
              className="form-control"
              placeholder="Add Your Review Here"
              name="message"
              rows="3"
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button style={{ border:'none'}} disabled={this.state.loading} className="btn btn-primary">
              Submit Review
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}