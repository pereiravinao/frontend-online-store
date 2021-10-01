import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProductDetails.css';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ButtonAddCart from '../components/ButtonAddCart';
import EvaluationProduct from '../components/EvaluationProduct';
import Loading from '../components/Loading';
import EvalStars from '../components/EvaluationStars';

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
    this.setState({
      prodDetails: productDetails[0] || [],
    }, () => this.setState({ loading: true }));
  }

  render() {
    const { prodDetails, loading } = this.state;
    const { callback, submitForm, allEvaluation } = this.props;
    const { match: { params: { id } } } = this.props;

    let evaluations = [];
    if (allEvaluation.length >= 1) {
      evaluations = allEvaluation.filter((elem) => elem.id === id);
    }
    if (loading && prodDetails.length < 1) {
      return (
        <div>Desculpe. Não foi possível encontrar os detalhes deste produto.</div>
      );
    }
    return (
      loading
        ? (
          <section className="product-details">
            <Link className="back-details" to="/">↶</Link>
            <div className="details-div-content">
              <h1 data-testid="product-detail-name">
                { prodDetails.title }
              </h1>
            </div>
            <div className="details-div-content">
              <div className="product-info-details">
                <div>
                  <h2>Especificações:</h2>
                  <ul>
                    { prodDetails.attributes.map(({ name, value_name: value }) => (
                      <li key={ name }>{ `${name}: ${value || 'N/A'}` }</li>)) }
                  </ul>
                  { prodDetails.shipping.free_shipping && (
                    <h4
                      data-testid="free-shipping"
                    >
                      FRETE GRÁTIS
                    </h4>) }
                  <ButtonAddCart
                    dataTestid="product-detail-add-to-cart"
                    productDetails={ prodDetails }
                    callback={ callback }
                  />
                </div>
                <img src={ prodDetails.thumbnail } alt={ prodDetails.title } />
              </div>
            </div>
            <div className="details-div-content">
              <h3>Avaliações</h3>
              {
                evaluations.length > 0
                  ? evaluations[0].comments.map(({ email, comment, evaluation }, ind) => (
                    <div key={ `${ind}${evaluation}` } className="eval-coments">
                      <h4>{ email }</h4>
                      <p>{ comment }</p>
                      <EvalStars evaluation={ evaluation } />
                    </div>
                  )) : (
                    <div className="eval-coments">
                      Ainda não há avaliações para este item. Seja o primeiro!
                    </div>
                  )
              }
              <EvaluationProduct id={ id } submitForm={ submitForm } />
            </div>
          </section>) : <Loading />

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
