import React, { Component } from 'react';

export default class InitialMsg extends Component {
  render() {
    return (
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    );
  }
}
