import React from 'react';
import ButtonListCart from './ButtonListCart';
import '../styles/Header.css';
// import PropTypes from 'prop-types';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <h3>Bem Vindo!</h3>
        <h2>Trybers Online Store</h2>
        <ButtonListCart />
      </header>
    );
  }
}