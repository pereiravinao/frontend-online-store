import React from 'react';
import ICON_CART from '../icons/cart.svg';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <span>Aguarde... </span>
        <img src={ ICON_CART } alt="Carrinho de compras" />
      </div>
    );
  }
}
