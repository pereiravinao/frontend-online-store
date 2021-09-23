import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ICON_CART from '../icons/cart.svg';
import '../icons/icons.css';

export default class ButtonListCart extends React.Component {
  render() {
    const { items } = this.props;
    const productTotal = items.reduce((total, item) => total + item.quantity, 0);
    return (
      <button type="button" className="cart-button">
        <Link data-testid="shopping-cart-button" to="/cart-items">
          <img className="iconCart" src={ ICON_CART } alt="Carrinho de Compras" />
        </Link>
        <span data-testid="shopping-cart-size">{ productTotal }</span>
      </button>
    );
  }
}

ButtonListCart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
