// Importações de bibliotecas -----------------
import PropTypes from 'prop-types';
import React, { Component } from 'react';
// --------------------------------------------

// Importações de funções ---------------------
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
// --------------------------------------------

// Importações de componentes -----------------
import Loading from './Loading';
// --------------------------------------------

import styles from '../styles/musicCard.module.css';

class MusicCard extends Component {
  state = {
    checked: false,
    load: false, // estado definido para exibir o carregamento
  };

  async componentDidMount() {
    await this.handleFavoriteSong();
  }

  handleFavoriteSong = async () => {
    const requestFavorites = await getFavoriteSongs(); // Espera a requisição dos
    const { elem: { trackName } } = this.props;
    const checkedVerify = requestFavorites // salva em uma variavel um boleano para cada musica igual salva
      .some((song) => song.trackName === trackName);
    this.setState({ checked: checkedVerify }); // mostra as musicas favoritas já salvas
  };

  handleChange = ({ target: { checked } }) => { // captura o valor da checkbox
    this.setState({ load: true, checked }, async () => { // define o estado de load sendo true ou igual o valor marcado na checkbox e chama um segundo parametro
      const { elem } = this.props; // nome da musica recebido por prop

      if (checked) await addSong(elem); // chama a função que salva no local storage as musicas salvas
      if (!checked) await removeSong(elem); // chama a função removeSong sugestivamente remove do local storage o objeto equivalente ao click
      this.setState({ load: false }); // define o valor de load pra false pra sumir o elemento carregando
    });
  };

  render() {
    const { elem, handleFavorites } = this.props;
    const { load, checked } = this.state;
    if (load) return <Loading />;
    return (
      <div className={ styles.containerMusic }>
        <div className={ styles.name }>
          <p>{elem.trackName}</p>
        </div>
        <div className={ styles.audio }>
          <audio src={ elem.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
        <div className={ styles.input }>
          <label htmlFor={ elem.trackId }>
            <input
              data-testid={ `checkbox-music-${elem.trackId}` }
              id={ elem.trackId }
              type="checkbox"
              checked={ checked }
              onChange={ this.handleChange }
              onClick={ handleFavorites }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  elem: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.string,
  }),
  handleFavorites: PropTypes.func,
}.isRequired;

export default MusicCard;
