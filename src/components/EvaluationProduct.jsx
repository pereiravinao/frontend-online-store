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

  submitAndCleanState = () => {
    const { email, evaluation, comment } = this.state;
    if ([email, evaluation, comment].some((value) => !value)) return;
    const { id, submitForm } = this.props;
    submitForm(id, this.state);
    this.setState({
      email: '',
      evaluation: '',
      comment: '',
    });
    document.querySelectorAll('.evaluation-form input')
      .forEach((radio) => {
        radio.checked = false;
      });
  }

  render() {
    const { email, evaluation, comment } = this.state;
    return (
      <form className="evaluation-form">
        Deixe sua avaliação:
        <div>
          <input
            type="email"
            name="email"
            value={ email }
            className="eval-email"
            onChange={ this.handleChange }
            placeholder="Email"
          />
          <p>{ `Sua avaliação: ${evaluation}` }</p>
          1
          <input
            type="radio"
            name="evaluation"
            className="eval-radio-input"
            onChange={ this.handleChange }
            value="1"
          />
          2
          <input
            type="radio"
            name="evaluation"
            className="eval-radio-input"
            onChange={ this.handleChange }
            value="2"
          />
          3
          <input
            type="radio"
            name="evaluation"
            className="eval-radio-input"
            onChange={ this.handleChange }
            value="3"
          />
          4
          <input
            type="radio"
            name="evaluation"
            className="eval-radio-input"
            onChange={ this.handleChange }
            value="4"
          />
          5
          <input
            type="radio"
            name="evaluation"
            className="eval-radio-input"
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
          onClick={ this.submitAndCleanState }
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
