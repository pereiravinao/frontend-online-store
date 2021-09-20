import React from 'react';
import ButtonListCart from '../components/ButtonListCart';

class Product extends React.Component {
  render() {
    // { detailsProduct } = this.props;
    return (
      <section>
        <div>
          <ButtonListCart />
        </div>
        <div>
          <h1 data-testid="product-detail-name">Nome do produto</h1>
        </div>
        <div>
          <img src="*" alt="Imagem do produto" />
          <div className="details-product">
            <h2>Especificações Técnicas</h2>
            <ol>
              <li>Especificação 1</li>
              <li>Especificação 2</li>
              <li>Especificação 3</li>
              <li>Especificação 4</li>
              <li>Especificação 5</li>
              <li>Especificação 6</li>
              <li>Especificação 7</li>
              <li>Especificação 8</li>
              <li>Especificação 9</li>
              <li>Especificação 10</li>
            </ol>
          </div>
        </div>
      </section>
    );
  }
}

export default Product;
