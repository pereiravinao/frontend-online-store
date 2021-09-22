import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

export default class Checkout extends React.Component {
  constructor() {
    super();
    this.state = { finish: false };
  }

  handleClick = () => {
    this.setState({ finish: true });
  };

  render() {
    const { props: { cartItems }, state: { finish } } = this;
    return (
      <div className="checkout">
        <div className="checkout-items">
          { cartItems.map(({ thumbnail, id, title, price, quantity }) => (
            <div key={ id } className="checkout-content">
              <h5>
                { title }
              </h5>
              <img src={ thumbnail } alt={ title } />
              <p>{ `R$${price} X ${quantity}` }</p>
            </div>
          )) }
        </div>
        Nome:
        <input type="text" data-testid="checkout-fullname" />
        Email:
        <input type="text" data-testid="checkout-email" />
        CPF:
        <input type="text" data-testid="checkout-cpf" />
        Telefone:
        <input type="text" data-testid="checkout-phone" />
        CEP:
        <input type="text" data-testid="checkout-cep" />
        Endereço:
        <input type="text" data-testid="checkout-address" />
        <button type="button" onClick={ this.handleClick }>
          Finalizar
        </button>
        { finish && <Redirect to="/" />}
      </div>
    );
  }
}

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};
