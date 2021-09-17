import React from 'react';
import { Link } from 'react-router-dom';
import ICON_CART from '../icons/cart.svg';
import '../icons/icons.css';

export default class ButtonListCart extends React.Component {
  render() {
    return (
      <button type="button" className="cart-button">
        <Link data-testid="shopping-cart-button" to="/cart-items">
          <img className="iconCart" src={ ICON_CART } alt="Carrinho de Compras" />
        </Link>
      </button>
    );
  }
}
