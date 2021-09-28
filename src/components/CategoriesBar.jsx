import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/CategoriesBar.css';
import { Link } from 'react-router-dom';

export default class CategoriesBar extends Component {
  constructor(props) {
    super();
    const { items } = props;
    this.state = {
      categories: items,
    };
  }

  handleClick = ({ target: { id } }) => {
    const { callback } = this.props;
    callback(id, '');
  }

  render() {
    const { categories } = this.state;
    return (
      <ul className="categories-aside" value="valor">
        <p>Categorias: </p>
        { categories.map(({ id, name }) => (
          <Link to="/" key={ id }>
            <li
              className="categories-item"
              id={ id }
              onClick={ this.handleClick }
              aria-hidden="true"
              data-testid="category"
            >
              <p id={ id }>{ name }</p>
            </li>
          </Link>)) }
      </ul>
    );
  }
}

CategoriesBar.propTypes = PropTypes.shape({
  categories: PropTypes.arrayOf(PropTypes.object),
}).isRequired;
