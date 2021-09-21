import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ButtonMoreDetails extends React.Component {
  render() {
    const { productDetails } = this.props;
    return (
      <Link
        to={ `product/${productDetails.category_id}/${productDetails.id}` }
      >
        <button
          type="button"
          data-testid="product-detail-link"
        >
          Mais detalhes
        </button>
      </Link>
    );
  }
}

ButtonMoreDetails.propTypes = {
  productDetails: PropTypes.shape({
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string,
    category_id: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default ButtonMoreDetails;
