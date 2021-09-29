import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CheckoutStyles.css';
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
      <section className="checkout">
        <div className="checkout-list">
          { cartItems.map(({ thumbnail, id, title, price, quantity }) => (
            <div key={ id } className="checkout-items">
              <h5>
                { title }
              </h5>
              <img src={ thumbnail } alt={ title } />
              <p>
                { Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })
                  .format(price) }
                <b> X </b>
                { quantity }
              </p>
            </div>
          )) }
        </div>
        <form className="checkout-form">
          <label className="checkout-inputs" htmlFor="fullname">
            Nome:
            <input id="fullname" type="text" data-testid="checkout-fullname" />
          </label>
          <label className="checkout-inputs" htmlFor="email">
            Email:
            <input id="email" type="text" data-testid="checkout-email" />
          </label>
          <label className="checkout-inputs" htmlFor="cpf">
            CPF:
            <input id="cpf" type="text" data-testid="checkout-cpf" />
          </label>
          <label className="checkout-inputs" htmlFor="phone">
            Telefone:
            <input id="phone" type="text" data-testid="checkout-phone" />
          </label>
          <label className="checkout-inputs" htmlFor="cep">
            CEP:
            <input id="cep" type="text" data-testid="checkout-cep" />
          </label>
          <label className="checkout-inputs" htmlFor="address">
            Endereço:
            <input id="address" type="text" data-testid="checkout-address" />
          </label>
          <button type="button" onClick={ this.handleClick }>
            Finalizar
          </button>
        </form>
        { finish && <Redirect to="/" />}
      </section>
    );
  }
}

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};
