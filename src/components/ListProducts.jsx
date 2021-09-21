import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonMoreDetails from './ButtonMoreDetails';

export default class ListProducts extends Component {
  render() {
    const { searchResults } = this.props;
    return (
      <section className="list-products">
        {searchResults.length > 0 ? (
          <ul>
            { searchResults.map((product) => (
              <li key={ product.id } data-testid="product">
                <h3>{ product.title }</h3>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{ product.price }</p>
                <ButtonMoreDetails
                  productDetails={ product }
                />
              </li>
            ))}
          </ul>) : <p>Nenhum produto foi encontrado</p>}
      </section>
    );
  }
}

ListProducts.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
