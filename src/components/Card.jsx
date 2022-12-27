import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from '../styles/card.module.css';

class Card extends Component {
  render() {
    const {
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;
    const releaseLength = 10;
    const icon = <FaDollarSign className={ styles.icon } />;
    return (
      <div className={ styles.cardContainer }>
        <Link
          to={ `/album/${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
          <div className={ styles.infos }>
            <div className={ styles.artist }>
              <p>
                Artista:
                {' '}
                {artistName}
              </p>
            </div>
            <div className={ styles.album }>
              <p>
                Album:
                {' '}
                {collectionName}
              </p>
              <p>
                release:
                {' '}
                {releaseDate.slice(0, releaseLength)}
              </p>
            </div>
            <div className={ styles.datePrice }>
              <p className={ styles.tracks }>
                Faixas:
                {' '}
                {trackCount}
              </p>
              <span className={ styles.span }>
                { icon }
                {' '}
                { collectionPrice }
              </span>
            </div>
          </div>
        </Link>
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
