import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CartItems extends React.Component {
  render() {
    const { itemsAdd, callback } = this.props;
    return (
      <div>
        { itemsAdd.length === 0
          ? (<h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>)
          : (
            <div>
              <Link to="/checkout">
                <button
                  type="button"
                  data-testid="checkout-products"
                >
                  Finalizar Compra
                </button>
              </Link>
              <ol>
                {itemsAdd.map((objectItem) => (
                  <li key={ objectItem.id }>
                    <div>
                      <h3 data-testid="shopping-cart-product-name">
                        { objectItem.title }
                      </h3>
                      <img src={ objectItem.thumbnail } alt={ objectItem.title } />
                      <p>{ objectItem.price }</p>
                      <div>
                        <button
                          data-testid="product-increase-quantity"
                          type="button"
                          onClick={ () => callback(objectItem) }
                        >
                          +
                        </button>
                        <h4 data-testid="shopping-cart-product-quantity">
                          { objectItem.quantity }
                        </h4>

                        <button
                          data-testid="product-decrease-quantity"
                          type="button"
                          disabled={ objectItem.quantity < 2 }
                          onClick={ () => callback(objectItem, true) }
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </li>))}
              </ol>
            </div>)}
      </div>
    );
  }
}

CartItems.propTypes = {
  itemsAdd: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  callback: PropTypes.func.isRequired,
};
