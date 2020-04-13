import React from 'react'

class ReviewButton extends React.Component {
  state = {
    clicked: false,
  }

  handleOnClick = () => {
    if (!this.state.clicked) {
      this.props.updateValue(this.props.booktitle)
      this.setState({
        clicked: true,
      })
    }
  }

  render() {
    return (
      <button onClick={this.handleOnClick} disabled={this.state.clicked}>
        Review {this.props.booktitle}
      </button>
    )
  }
}

export default ReviewButton