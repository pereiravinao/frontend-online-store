import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonMoreDetails from './ButtonMoreDetails';
import ButtonAddCart from './ButtonAddCart';

export default class ListProducts extends Component {
  render() {
    const { searchResults, callback } = this.props;
    const maxLength = 50;
    return (
      <section className="list-products">
        {searchResults.length > 0 ? (
          <ul>
            { searchResults.map((product) => (
              <li key={ product.id } data-testid="product">
                <h4>
                  { product.title.length > maxLength
                    ? `${product.title.match(/.{50}/)[0]}...` : product.title }
                </h4>
                <img
                  className="product-img"
                  src={ product.thumbnail }
                  alt={ product.title }
                />
                <p className="product-price">{ `R$ ${product.price.toFixed(2)}` }</p>
                { product.shipping.free_shipping && (
                  <h4 className="free-shipping" data-testid="free-shipping">
                    FRETE GRÁTIS
                  </h4>) }
                <ButtonMoreDetails productDetails={ product } />
                <ButtonAddCart
                  dataTestid="product-add-to-cart"
                  callback={ callback }
                  productDetails={ product }
                />
              </li>
            ))}
          </ul>) : <p className="initial-msg">Nenhum produto foi encontrado</p>}
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
