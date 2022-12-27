// Importações de bibliotecas ----------------
import PropTypes from 'prop-types';
import React, { Component } from 'react';
// -------------------------------------------

// Importações de componentes ----------------
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
// -------------------------------------------

// Importações de funções --------------------
import getMusics from '../services/musicsAPI';
// -------------------------------------------

import styles from '../styles/album.module.css';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '', // para o nome do artista ou banda
      albumName: '', // para o nome do album
      picture: '',
      load: false,
      albumInfos: [], // para salvar as informações retornadas da API
    };
  }

  componentDidMount() {
    this.handleApi(); // renderiza o componente assim que o componente é montado
  }

  handleApi = async () => {
    const { match: { params: { id } } } = this.props; // o Id através das rotas do react router que é enviado através do link na linhas 20 do componente Card.jsx
    this.setState({ load: true });
    const request = await getMusics(id); // aqui é feita a requisição para o eme
    console.log(request);
    this.setState({ name: request[0].artistName, // captura as informações do nome da banda/artista e do nome do album que foi clicado
      albumName: request[0].collectionName,
      picture: request[0].artworkUrl100,
      load: false,
      albumInfos: request }); // envia todo o objeto do recebido da api para um array no estado
  };

  render() {
    const { name, albumName, albumInfos, picture, load } = this.state;
    return (
      <div className={ styles.container }>
        <Header />
        {load ? (<Loading />
        ) : (
          <div className={ styles.albumContainer }>
            <div className={ styles.album }>
              <h1>{name}</h1>
              <h2>{albumName}</h2>
              <img src={ picture } alt={ name } />
            </div>
            <div className={ styles.tracks }>
              {albumInfos
                .filter((elem) => elem.trackName !== undefined) // filta todos os objetos do array que não possuem uma informação de musica, para renderizar a penas as musicas daqui pra baixo
                .map((elem) => (
                  <div key={ elem.trackId }>
                    <MusicCard
                      elem={ elem }
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
