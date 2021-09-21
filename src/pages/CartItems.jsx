import React from 'react';
import PropTypes from 'prop-types';

export default class CartItems extends React.Component {
  render() {
    const { itemsAdd } = this.props;
    return (
      <div>
        { itemsAdd.length === 0
          ? (<h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>)
          : (
            <div>
              <ol>
                {itemsAdd.map(({ thumbnail, id, title, price, quantity }) => (
                  <li key={ id }>
                    <h3 data-testid="shopping-cart-product-name">{ title }</h3>
                    <img src={ thumbnail } alt={ title } />
                    <p>{ price }</p>
                    <h4 data-testid="shopping-cart-product-quantity">{ quantity }</h4>
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
