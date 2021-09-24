import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InitialMsg extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      valueQuery: '',
    };
  }

  handleChange(event) {
    this.setState({
      valueQuery: event.target.value,
    });
  }

  handleClick() {
    const { callback } = this.props;
    const { valueQuery } = this.state;
    callback('', valueQuery);
    this.setState({ valueQuery: '' });
  }

  searchOnKeyDown = ({ keyCode }) => {
    const key = 13;
    if (keyCode === key) document.querySelector('button.search-btn').click();
  }

  mensagemInicial() {
    return (
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    );
  }

  render() {
    const { state: { valueQuery }, props: { condition } } = this;
    return (
      <section className="search-area">
        <div>
          <input
            type="text"
            className="search-input"
            data-testid="query-input"
            value={ valueQuery }
            onChange={ this.handleChange }
            onKeyDown={ this.searchOnKeyPress }
          />
          <button
            type="button"
            className="search-btn"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </div>
        { !condition && <div className="initial-msg">{ this.mensagemInicial() }</div> }
      </section>
    );
  }
}

InitialMsg.propTypes = {
  callback: PropTypes.func.isRequired,
  condition: PropTypes.bool.isRequired,
};
