import React from 'react'

class AnonButton extends React.Component {
  state = {
    clicked: false,
  }

  handleOnClick = () => {
    if (!this.state.clicked) {
      this.props.updateValue(this.props.alias)
      this.setState({
        clicked: true,
      })
    }
  }

  render() {
    return (
      <button onClick={this.handleOnClick} disabled={this.state.clicked}>
        Go {this.props.alias}
      </button>
    )
  }
}

export default AnonButton