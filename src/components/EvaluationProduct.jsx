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

  handleClick = ({ target }) => {
    const { value } = target;
    this.setState({
      evaluation: value,
    });
    document.querySelectorAll('.eval-radio-input')
      .forEach((radio) => {
        radio.checked = false;
        if (radio.value <= value) radio.checked = true;
      });
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
    document.querySelectorAll('.eval-radio-input')
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
          <label htmlFor="radio1">
            <input
              type="radio"
              id="radio1"
              className="eval-radio-input"
              onClick={ this.handleClick }
              value="1"
            />
            <b className="eval-star" />
          </label>
          <label htmlFor="radio2">
            <input
              type="radio"
              id="radio2"
              className="eval-radio-input"
              onClick={ this.handleClick }
              value="2"
            />
            <b className="eval-star" />
          </label>
          <label htmlFor="radio3">
            <input
              type="radio"
              id="radio3"
              className="eval-radio-input"
              onClick={ this.handleClick }
              value="3"
            />
            <b className="eval-star" />
          </label>
          <label htmlFor="radio4">
            <input
              type="radio"
              id="radio4"
              className="eval-radio-input"
              onClick={ this.handleClick }
              value="4"
            />
            <b className="eval-star" />
          </label>
          <label htmlFor="radio5">
            <input
              type="radio"
              id="radio5"
              className="eval-radio-input"
              onClick={ this.handleClick }
              value="5"
            />
            <b className="eval-star" />
          </label>
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
