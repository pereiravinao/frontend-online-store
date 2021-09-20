import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListProducts extends Component {
  render() {
    const { searchResults } = this.props;
    console.log(searchResults);
    return (
      <section className="list-products">
        <ul>
          { searchResults.map(({ thumbnail, price, title, id }) => (
            <li key={ id } data-testid="product">
              <h3>{title}</h3>
              <img src={ thumbnail } alt={ title } />
              <p>{price}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

ListProducts.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
