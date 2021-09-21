import React from 'react';
import PropTypes from 'prop-types';
import ButtonListCart from '../components/ButtonListCart';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Product extends React.Component {
  constructor() {
    super();

    this.fethProduct = this.fethProduct.bind(this);
    this.state = {
      prodDetails: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fethProduct();
  }

  /*  componentDidUpdate() {
    const { props: { search }, state: { loading } } = this;
    search && !loading ? this.fethProduct() : this.setState({ loading: false })
  } */

  async fethProduct() {
    const { match: { params: { id, categoryId } } } = this.props;
    const result = await getProductsFromCategoryAndQuery(categoryId, '');
    const productDetails = result.results.filter((product) => product.id === id);
    this.setState({ prodDetails: productDetails, loading: true });
  }

  render() {
    const { prodDetails, loading } = this.state;
    return (
      loading
      && (
        <section>
          <div>
            <ButtonListCart />
          </div>
          <div>
            <h1 data-testid="product-detail-name">{ prodDetails[0].title }</h1>
          </div>
          <div>
            <img src={ prodDetails[0].thumbnail } alt={ prodDetails[0].title } />
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
      )

    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      categoryId: PropTypes.string,
    }),
  }).isRequired,
};

export default Product;
