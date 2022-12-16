// Importações de bibliotecas -----------------
import PropTypes from 'prop-types';
import React, { Component } from 'react';
// --------------------------------------------

// Importações de funções ---------------------
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
// --------------------------------------------

// Importações de componentes -----------------
import Loading from './Loading';
// --------------------------------------------

class MusicCard extends Component {
  state = {
    checked: false,
    load: false, // estado definido para exibir o carregamento
  };

  async componentDidMount() {
    await this.handleFavoriteSong();
  }

  handleFavoriteSong = async () => {
    const requestFavorites = await getFavoriteSongs();
    const { trackName } = this.props;
    requestFavorites
      .forEach((song) => this.setState({ checked: song === trackName }));
  };

  handleChange = ({ target: { checked } }) => { // captura o valor da checkbox
    this.setState({ load: checked, checked }, async () => { // define o estado de load sendo true ou igual o valor marcado na checkbox e chama um segundo parametro
      const { trackName } = this.props; // nome da musica recebido por prop

      if (checked) await addSong(trackName); // chama a função que salva no local storage as musicas salvas
      this.setState({ load: false }); // define o valor de load pra false pra sumir o elemento carregando
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { load, checked } = this.state;
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
            checked={ checked }
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
