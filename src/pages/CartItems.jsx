import React from 'react';
import PropTypes from 'prop-types';

export default class CartItems extends React.Component {
  render() {
    const { itemsAdd } = this.props;
    const quantidadeAdd = 1;
    console.log(itemsAdd);
    return (
      <div>
        { itemsAdd.length === 0
          ? (<h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>)
          : (
            <div>
              <ol>
                {itemsAdd.map((item) => (
                  <li key={ item.id }>
                    <h3 data-testid="shopping-cart-product-name">{item.title}</h3>
                    <img src={ item.thumbnail } alt={ item.title } />
                    <p>{item.price}</p>
                    <h4 data-testid="shopping-cart-product-name">{ quantidadeAdd }</h4>
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
