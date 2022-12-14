import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '', // chave do input de busca
      btnDisable: true, // chave do atributo disabled
    };
  }

  handleChange = ({ target: { value } }) => {
    // definição e captura dos valores atraves do estado do componente
    this.setState({ search: value }, this.verify);
  };

  verify = () => {
    const { search } = this.state;
    // validação do botão de busca, sendo necessario ter mais de dois caracteres para poder realizar uma pesquisa
    this.setState({ btnDisable: search.length < 2 });
  };

  render() {
    const { search, btnDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            name="search"
            value={ search }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ btnDisable }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}
