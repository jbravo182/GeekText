import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';


class StarRatingComponent extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    editing: PropTypes.bool,
    starCount: PropTypes.number,
    starColor: PropTypes.string,
    onStarClick: PropTypes.func,
    onStarHover: PropTypes.func,
    onStarHoverOut: PropTypes.func,
    renderStarIcon: PropTypes.func,
    renderStarIconHalf: PropTypes.func
  };

  static defaultProps = {
    starCount: 5,
    editing: true,
    starColor: 'yellow',
    emptyStarColor: 'grey'
  };

  constructor(props) {
    super();

    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    if (value != null && (value !== this.state.value)) {
      this.setState({ value });
    }
  }

  onChange(inputValue) {
    const { editing, value } = this.props;

    if (!editing) {
      return;
    }

    if (value != null) {
      return;
    }

    this.setState({value: inputValue});
  }

  onStarClick(index, value, name, someEvent) {
    someEvent.stopPropagation();

    const { onStarClick, editing } = this.props;

    if (!editing) {
      return;
    }

    onStarClick && onStarClick(index, value, name, someEvent);
  }

  onStarHover(index, value, name, someEvent) {
    someEvent.stopPropagation();

    const { onStarHover, editing } = this.props;

    if (!editing) {
      return;
    }

    onStarHover && onStarHover(index, value, name, someEvent);
  }

  onStarHoverOut(index, value, name, someEvent) {
    someEvent.stopPropagation();

    const { onStarHoverOut, editing } = this.props;

    if (!editing) {
      return;
    }

    onStarHoverOut && onStarHoverOut(index, value, name, someEvent);
  }

  renderStars() {
    const {
      name,
      starCount,
      starColor,
      emptyStarColor,
      editing
    } = this.props;
    const { value } = this.state;

    const starStyles = (i, value) => ({
      float: 'right',
      cursor: editing ? 'pointer' : 'default',
      color: value >= i ? starColor : emptyStarColor
    });
    const radioStyles = {
      display: 'none',
      position: 'absolute',
      marginLeft: -9999
    };

    let starNodes = [];

    for (let index = starCount; index > 0; index--) {
      const id = `${name}_${index}`;
      const starNodeInput = (
        <input
          key={`input_${id}`}
          style={radioStyles}
          className="dv-star-rating-input"
          type="radio"
          name={name}
          id={id}
          value={index}
          checked={value === index}
          onChange={this.onChange.bind(this, index, name)}
        />
      );
      const starNodeLabel = (
        <label
          key={`label_${id}`}
          style={starStyles(index, value)}
          className={'dv-star-rating-star ' + (value >= index ? 'dv-star-rating-full-star' : 'dv-star-rating-empty-star')}
          htmlFor={id}
          onClick={someEvent => this.onStarClick(index, value, name, someEvent)}
          onMouseOver={someEvent => this.onStarHover(index, value, name, someEvent)}
          onMouseLeave={someEvent => this.onStarHoverOut(index, value, name, someEvent)}
        >
          {this.renderIcon(index, value, name, id)}
        </label>
      );

      starNodes.push(starNodeInput);
      starNodes.push(starNodeLabel);
    }

    return starNodes.length ? starNodes : null;
  }

  renderIcon(index, value, name, id) {
    const { renderStarIcon, renderStarIconHalf } = this.props;

    if (
      typeof renderStarIconHalf === 'function' &&
      Math.ceil(value) === index &&
      value % 1 !== 0
    ) {
      return renderStarIconHalf(index, value, name, id);
    }

    if (typeof renderStarIcon === 'function') {
      return renderStarIcon(index, value, name, id);
    }

    return <FontAwesomeIcon key={`icon_${id}`} icon={faStar} size='2x'/>
  }

  render() {
    const { editing, className } = this.props;
    const classes = cx('dv-star-rating', {
      'dv-star-rating-non-editable': !editing
    }, className);

    return (
      <div style={{display: 'inline-block', position: 'relative', marginLeft: '20px'}} className={classes}>
        {this.renderStars()}
      </div>
    );
  }
}

export default StarRatingComponent;