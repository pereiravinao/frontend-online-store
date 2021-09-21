import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        Categorias:
        { categories.map(({ id, name }) => (
          <li
            className="categories-item"
            id={ id }
            onClick={ this.handleClick }
            aria-hidden="true"
            key={ id }
            data-testid="category"
          >
            <p id={ id }>{ name }</p>
          </li>)) }
      </ul>
    );
  }
}

CategoriesBar.propTypes = PropTypes.shape({
  categories: PropTypes.arrayOf(PropTypes.object),
}).isRequired;
