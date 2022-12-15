import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    load: false,
  };

  handleChange = async ({ target: { checked } }) => {
    this.setState({ load: true }, async () => {
      const { trackName } = this.props;

      if (checked) {
        await addSong({ trackName });
        this.setState({ load: false });
      }
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { load } = this.state;
    return (
      <div>
        {load && <Loading />}
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="checker">
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id="checker"
            type="checkbox"
            onChange={ this.handleChange }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;

export default MusicCard;
