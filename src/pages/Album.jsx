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
      name: '',
      albumName: '',
      albumInfos: [],
    };
  }

  componentDidMount() {
    this.handleApi();
  }

  handleApi = async () => {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    console.log(request);
    this.setState({ name: request[0].artistName,
      albumName: request[0].collectionName,
      albumInfos: request });
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
        {albumInfos
          .filter((elem) => elem.trackName !== undefined)
          .map((elem) => (
            <MusicCard
              key={ elem.trackId }
              trackName={ elem.trackName }
              previewUrl={ elem.previewUrl }
            />
          ))}
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
