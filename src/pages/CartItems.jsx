import React from 'react';

export default class CartItems extends React.Component {
  render() {
    return (
      <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
    );
  }
}
