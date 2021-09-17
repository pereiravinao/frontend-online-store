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

  // componentDidMount() {
  //   const { categories } = this.state;
  //   // console.log(categories);
  // }

  render() {
    const { categories } = this.state;
    return (
      <div className="categories-aside">
        Categorias:
        { categories.map(({ id, name }) => (
          <div
            className="categories-item"
            key={ id }
            data-testid="category"
          >
            <p>{ name }</p>
          </div>)) }
      </div>
    );
  }
}

CategoriesBar.propTypes = PropTypes.shape({
  categories: PropTypes.arrayOf(PropTypes.object),
}).isRequired;
