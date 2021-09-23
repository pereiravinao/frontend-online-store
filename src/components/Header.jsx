import React from 'react';
import PropTypes from 'prop-types';
import ButtonListCart from './ButtonListCart';
import '../styles/Header.css';

export default class Header extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <header>
        <h3>Bem Vindo!</h3>
        <h2>Trybers Online Store</h2>
        <ButtonListCart items={ items } />
      </header>
    );
  }
}

Header.propTypes = { items: PropTypes.arrayOf(PropTypes.object).isRequired };
