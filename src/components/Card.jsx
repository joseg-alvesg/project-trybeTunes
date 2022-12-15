import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const {
      // artistID,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <div>
            <img src={ artworkUrl100 } alt={ collectionName } />
          </div>
        </Link>
        <div>
          <h1>
            Artista:
            {' '}
            {artistName}
          </h1>
          <h3>
            Album:
            {' '}
            {collectionName}
          </h3>
          <h4>
            Faixas:
            {' '}
            {trackCount}
          </h4>
          <h4>
            Lançamento:
            {' '}
            {releaseDate}
          </h4>
          <span>
            Preço:
            {' '}
            {collectionPrice}
          </span>

        </div>
      </div>
    );
  }
}

Card.propTypes = {
  artistID: PropTypes.number,
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionId: PropTypes.number,
  collectionName: PropTypes.string,
  collectionPrice: PropTypes.number,
  releaseDate: PropTypes.string,
  trackCount: PropTypes.number,
}.isRequired;

export default Card;
