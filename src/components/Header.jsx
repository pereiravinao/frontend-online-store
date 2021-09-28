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
        <div className="t-o-s">
          <span className="tos-logo" />
          <h2>Trybers Online Store</h2>
        </div>
        <ButtonListCart items={ items } />
      </header>
    );
  }
}

Header.propTypes = { items: PropTypes.arrayOf(PropTypes.object).isRequired };
