import React from 'react';
import PropTypes from 'prop-types';

export default class CartItems extends React.Component {
  render() {
    const { itemsAdd, ChangeQuant } = this.props;
    return (
      <div>
        { itemsAdd.length === 0
          ? (<h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>)
          : (
            <div>
              <ol>
                {itemsAdd.map(({ thumbnail, id, title, price, quantity }) => (
                  <li key={ id }>
                    <div>
                      <h3 data-testid="shopping-cart-product-name">{ title }</h3>
                      <img src={ thumbnail } alt={ title } />
                      <p>{ price }</p>
                      <button
                        type="button"
                        data-testid="product-decrease-quantity"
                        onClick={ () => ChangeQuant(id, false, true) }
                      >
                        -
                      </button>
                      <h4 data-testid="shopping-cart-product-quantity">{ quantity }</h4>
                      <button
                        type="button"
                        data-testid="product-increase-quantity"
                        onClick={ () => ChangeQuant(id, true, false) }
                      >
                        +
                      </button>
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
};
