import React from 'react';
import PropTypes from 'prop-types';

class EvaluationProduct extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      evaluation: '',
      comment: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  cleanState = () => {
    this.setState = {
      email: '',
      evaluation: '',
      comment: '',
    };
  }

  render() {
    const { id, submitForm } = this.props;
    const { email, evaluation, comment } = this.state;
    return (
      <form>
        <div>
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Email"
          />
          <p>{ `Sua avaliação: ${evaluation}`}</p>
          <input
            type="radio"
            name="evaluation"
            onChange={ this.handleChange }
            value="1"
          />
          <input
            type="radio"
            name="evaluation"
            onChange={ this.handleChange }
            value="2"
          />
          <input
            type="radio"
            name="evaluation"
            onChange={ this.handleChange }
            value="3"
          />
          <input
            type="radio"
            name="evaluation"
            onChange={ this.handleChange }
            value="4"
          />
          <input
            type="radio"
            name="evaluation"
            onChange={ this.handleChange }
            value="5"
          />
        </div>
        <div>
          <textarea
            name="comment"
            value={ comment }
            onChange={ this.handleChange }
            data-testid="product-detail-evaluation"
          />
        </div>
        <button
          type="button"
          onClick={ () => submitForm(id, this.state) }
        >
          Avaliar
        </button>
      </form>
    );
  }
}

EvaluationProduct.propTypes = {
  id: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
};

export default EvaluationProduct;
