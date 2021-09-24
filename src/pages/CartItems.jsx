import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ICON_CART from '../icons/cart.svg';
import '../styles/CartItems.css';

export default class CartItems extends React.Component {
  // componentDidMount() {
  //   this.sumPricesTotal();
  // }

  // sumPricesTotal = () => {
  //   const itemsStorage = JSON.parse(localStorage.getItem('getProducts'));
  //   const priceTotal = itemsStorage
  //     .map(({ price, quantity }) => price * quantity)
  //     .reduce((acc, cur) => (acc + cur), 0);
  //   this.setState({ priceTotal });
  // };

  render() {
    const { itemsAdd, callback, removeItemCart } = this.props;
    return (
      <div className="cart-items">
        <span className="cart-items-title">
          <img className="icon-cart" src={ ICON_CART } alt="Carrinho de Compras" />
          <h4>Carrinho de Compras</h4>
        </span>

        { itemsAdd.length === 0
          ? (
            <div>
              <h2
                className="cart-empty-message"
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </h2>
              <Link
                to="/"
              >
                <button
                  className="button-add-more-items"
                  type="button"
                >
                  Adicionar Itens
                </button>
              </Link>
            </div>)
          : (
            <div>
              <ul className="separator">
                {itemsAdd.map((objectItem) => (
                  <li className="item-cart" key={ objectItem.id }>
                    <img
                      className="image-item-cart"
                      src={ objectItem.thumbnail }
                      alt={ objectItem.title }
                    />
                    <h4
                      className="text-item-cart"
                      data-testid="shopping-cart-product-name"
                    >
                      { objectItem.title }
                    </h4>
                    <div className="order-details">
                      <span className="quantity">
                        { objectItem.quantity > 1
                          ? (
                            <button
                              className="moviment-quantity"
                              data-testid="product-decrease-quantity"
                              type="button"
                              onClick={ () => {
                                callback(objectItem, true);
                              } }
                            >
                              -
                            </button>)
                          : (
                            <button
                              className="remove-item"
                              type="button"
                              onClick={ () => {
                                removeItemCart(objectItem.id);
                              } }
                            >
                              X
                            </button>)}

                        <h4
                          className="text-quantity"
                          data-testid="shopping-cart-product-quantity"
                        >
                          { objectItem.quantity }
                        </h4>
                        <button
                          className="moviment-quantity"
                          data-testid="product-increase-quantity"
                          type="button"
                          onClick={ () => { callback(objectItem); } }
                          disabled={ objectItem.quantity + 1
                              > objectItem.available_quantity }
                        >
                          +
                        </button>
                      </span>
                      <h4 className="text-price-item">
                        { Intl.NumberFormat('pt-br',
                          { style: 'currency', currency: 'BRL' })
                          .format(objectItem.price * objectItem.quantity) }
                      </h4>
                    </div>
                  </li>))}
              </ul>
              <div className="price-total">
                <div className="completed-shopping">
                  <Link
                    to="/"
                  >
                    <button
                      className="button-add-more-items"
                      type="button"
                    >
                      Adicionar Mais Itens
                    </button>
                  </Link>
                </div>
                <div className="completed-shopping">
                  <h2>
                    {`Valor Total: ${Intl.NumberFormat('pt-br',
                      { style: 'currency', currency: 'BRL' })
                      .format(itemsAdd
                        .reduce((acc, { price, quantity }) => (
                          acc + (price * quantity)), 0))}` }
                  </h2>
                  <Link to="/checkout">
                    <button
                      className="button-add-more-items"
                      type="button"
                      data-testid="checkout-products"
                    >
                      Finalizar Compra
                    </button>
                  </Link>
                </div>
              </div>

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
  removeItemCart: PropTypes.func.isRequired,
};
