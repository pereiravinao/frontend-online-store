import React, { Component } from 'react';

export default class InitialMsg extends Component {
  render() {
    return (
      <section className="search-area">
        <div>
          <input type="text" />
          <button type="button">Pesquisar</button>
        </div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </section>
    );
  }
}
