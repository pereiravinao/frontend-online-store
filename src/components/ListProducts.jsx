import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonMoreDetails from './ButtonMoreDetails';
import ButtonAddCart from './ButtonAddCart';

export default class ListProducts extends Component {
  render() {
    const { searchResults, callback } = this.props;
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
                <ButtonAddCart
                  dataTestid="product-add-to-cart"
                  callback={ callback }
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
  callback: PropTypes.func.isRequired,
};