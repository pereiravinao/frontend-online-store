import React from 'react';
import PropTypes from 'prop-types';

export default class ButtonAddCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { productDetails, callback, dataTestid } = this.props;
    return (
      <button
        type="button"
        className="cart-button-add-cart"
        data-testid={ dataTestid }
        onClick={ () => callback(productDetails) }
      >
        Adicionar ao Carrinho!
      </button>
    );
  }
}

ButtonAddCart.propTypes = {
  productDetails: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  callback: PropTypes.func.isRequired,
  dataTestid: PropTypes.string.isRequired,
};
