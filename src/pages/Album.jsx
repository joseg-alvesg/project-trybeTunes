// Importações de bibliotecas ----------------
import PropTypes from 'prop-types';
import React, { Component } from 'react';
// -------------------------------------------

// Importações de componentes ----------------
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
// -------------------------------------------

// Importações de funções --------------------
import getMusics from '../services/musicsAPI';
// -------------------------------------------

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '', // para o nome do artista ou banda
      albumName: '', // para o nome do album
      albumInfos: [], // para salvar as informações retornadas da API
    };
  }

  componentDidMount() {
    this.handleApi(); // renderiza o componente assim que o componente é montado
  }

  handleApi = async () => {
    const { match: { params: { id } } } = this.props; // o Id através das rotas do react router que é enviado através do link na linhas 20 do componente Card.jsx
    const request = await getMusics(id); // aqui é feita a requisição para o eme
    console.log(request);
    this.setState({ name: request[0].artistName, // captura as informações do nome da banda/artista e do nome do album que foi clicado
      albumName: request[0].collectionName,
      albumInfos: request }); // envia todo o objeto do recebido da api para um array no estado
  };

  render() {
    const { name, albumName, albumInfos } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        Album
        <div>
          <h1 data-testid="artist-name">{name}</h1>
          <h2 data-testid="album-name">{albumName}</h2>
        </div>
        <div>
          {albumInfos
            .filter((elem) => elem.trackName !== undefined) // filta todos os objetos do array que não possuem uma informação de musica, para renderizar a penas as musicas daqui pra baixo
            .map((elem) => (
              <div key={ elem.trackId }>
                <MusicCard
                  trackName={ elem.trackName }
                  trackId={ elem.trackId }
                  previewUrl={ elem.previewUrl }
                />
              </div>
            ))}
        </div>
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
