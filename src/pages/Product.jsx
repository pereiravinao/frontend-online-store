import React from 'react';
import PropTypes from 'prop-types';
import ButtonListCart from '../components/ButtonListCart';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ButtonAddCart from '../components/ButtonAddCart';
import EvaluationProduct from '../components/EvaluationProduct';

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
    const { callback, submitForm, allEvaluation } = this.props;
    const { match: { params: { id } } } = this.props;

    let evaluations = [];
    if (allEvaluation.length >= 1) {
      evaluations = allEvaluation.filter((elem) => elem.id === id);
    }
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
              { prodDetails.shipping.free_shipping ? (
                <h4
                  data-testid="free-shipping"
                >
                  FRETE GRÁTIS
                </h4>
              )
                : ''}
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
          <div>
            <h5>Avaliações</h5>
            {
              evaluations.length > 0
                && evaluations[0].comments.map((ev) => (
                  <div key={ ev.length }>
                    <p>{ ev.email }</p>
                    <p>{ ev.comment }</p>
                    <p>{ ev.evaluation }</p>
                  </div>
                ))
            }
            <EvaluationProduct id={ id } submitForm={ submitForm } />
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
  submitForm: PropTypes.func.isRequired,
  allEvaluation: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Product;
