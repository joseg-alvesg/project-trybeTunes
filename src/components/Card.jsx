import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/card.module.css';

class Card extends Component {
  render() {
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;
    const releaseLength = 10;
    const nameAlbumLength = 15;
    return (
      <div className={ styles.cardContainer }>
        <Link
          to={ `/album/${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
          <div className={ styles.infosContainer }>
            <div className={ styles.infos }>
              <p>
                {artistName}
              </p>
              <p>
                {collectionName.substring(0, nameAlbumLength)}
                ...
              </p>
              <p>
                Release:
                {' '}
                {releaseDate.slice(0, releaseLength).replaceAll('-', '/')}
              </p>
              <p className={ styles.tracks }>
                Faixas:
                {' '}
                {trackCount}
              </p>
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
