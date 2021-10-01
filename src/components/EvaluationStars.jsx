import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EvalStars extends Component {
  render() {
    const { evaluation } = this.props;

    return (
      <div>
        <span className={ evaluation >= 1 ? 'yellowStar' : 'whiteStar' }>
          ★
        </span>
        <span className={ evaluation >= 2 ? 'yellowStar' : 'whiteStar' }>
          ★
        </span>
        <span className={ evaluation >= (2 + 1) ? 'yellowStar' : 'whiteStar' }>
          ★
        </span>
        <span className={ evaluation >= (2 + 2) ? 'yellowStar' : 'whiteStar' }>
          ★
        </span>
        <span className={ evaluation >= (2 + 2 + 1) ? 'yellowStar' : 'whiteStar' }>
          ★
        </span>
      </div>
    );
  }
}

EvalStars.propTypes = { evaluation: PropTypes.number.isRequired };
