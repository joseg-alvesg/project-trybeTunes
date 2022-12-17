import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    favoriteSongs: [],
    load: false,
  };

  async componentDidMount() {
    this.setState({ load: true }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({ favoriteSongs: favorites, load: false });
    });
  }

  handleFavorites = async ({ target: { checked, id } }) => { // recebe do targe o ID, recebido atraves do target input
    const { favoriteSongs } = this.state;
    if (!checked) { // caso o checked do input seja false ( inicialmente está sendo recebido como true) a logica a seguir que retira o elemento da pagina de favoritos é inicializada
      this.setState({ load: true }, async () => {
        // verifica o elemento que tem o id igual para enviar para função removeSong
        const diferentFavorite = favoriteSongs
          .find((elem) => Number(elem.trackId) === Number(id));
        await removeSong(diferentFavorite);
        // envia de novo o array com os objetos pro localStorage e envia o valor pro estado novamente para ser renderizado
        const favorites = await getFavoriteSongs();
        this.setState({ favoriteSongs: favorites, load: false });
      });
    }
  };

  render() {
    const { favoriteSongs, load } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {load ? <Loading /> : favoriteSongs
          .map((elem) => (
            <div key={ elem.trackId }>
              <MusicCard
                elem={ elem }
                handleFavorites={ this.handleFavorites }
              />
            </div>
          ))}
      </div>
    );
  }
}

// MusicCard.propTypes = {
//   elem: PropTypes.shape({
//     previewUrl: PropTypes.string,
//     trackName: PropTypes.string,
//     trackId: PropTypes.string,
//   }),
// }.isRequired;
