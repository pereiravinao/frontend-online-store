import React from 'react';
import PropTypes from 'prop-types';
import ButtonListCart from '../components/ButtonListCart';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ButtonAddCart from '../components/ButtonAddCart';

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

  async fethProduct() {
    const { match: { params: { id, categoryId } } } = this.props;
    const result = await getProductsFromCategoryAndQuery(categoryId, '');
    const productDetails = result.results.filter((product) => product.id === id);
    this.setState({ prodDetails: productDetails[0], loading: true });
  }

  render() {
    const { prodDetails, loading } = this.state;
    const { callback } = this.props;
    return (
      loading
      && (
        <section>
          <div>
            <ButtonListCart />
          </div>
          <div>
            <h1 data-testid="product-detail-name">{ prodDetails.title }</h1>
          </div>
          <div>
            <img src={ prodDetails.thumbnail } alt={ prodDetails.title } />
            <div className="details-product">
              <h2>Especificações:</h2>
              <ul>
                { prodDetails.attributes.map(({ name, value_name: valueName }) => (
                  <li key={ name }>{ `${name}: ${valueName || 'N/A'}` }</li>)) }
              </ul>
              <ButtonAddCart
                dataTestid="product-detail-add-to-cart"
                productDetails={ prodDetails }
                callback={ callback }
              />
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
  callback: PropTypes.func.isRequired,
};

export default Product;
