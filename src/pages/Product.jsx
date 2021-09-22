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
    this.setState({ prodDetails: productDetails, loading: true });
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
            <h1 data-testid="product-detail-name">{ prodDetails[0].title }</h1>
          </div>
          <div>
            <img src={ prodDetails[0].thumbnail } alt={ prodDetails[0].title } />
            <div className="details-product">
              { prodDetails[0].shipping.free_shipping ? (
                <h4
                  data-testid="free-shipping"
                >
                  FRETE GRÁTIS
                </h4>
              )
                : ''}
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
              </ol>
              <ButtonAddCart
                dataTestid="product-detail-add-to-cart"
                productDetails={ prodDetails[0] }
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
