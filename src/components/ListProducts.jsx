import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListProducts extends Component {
  render() {
    const { searchResults } = this.props;
    // console.log(searchResults);
    return (
      <section className="list-products">
        { searchResults.length > 0 ? (
          <ul>
            { searchResults.map(({ thumbnail, price, title, id }) => (
              <li key={ id } data-testid="product">
                <h3>{title}</h3>
                <img src={ thumbnail } alt={ title } />
                <p id={ id }>{price}</p>
              </li>
            ))}
          </ul>) : <p>Nenhum produto foi encontrado</p> }
      </section>
    );
  }
}

ListProducts.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
