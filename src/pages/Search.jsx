// Importações de bibliotecas --------------
import React, { Component } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Loading from '../components/Loading';
// -----------------------------------------

// Importações de funções ------------------
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// -----------------------------------------

// Definição de estado inicial -------------
const INITIAL_STATE = {
  search: '', // chave do input de busca
  hiddenInput: false, // esconde as tags de input e button

};
// -----------------------------------------

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      btnDisable: true, // chave do atributo disabled
      lastSearch: '', // salva uma copia do nome utilizado na pesquisa para exibir na tela
      apiReturn: false, // para caso o retorno da api falhe retornar uma outra tag
      artists: [], // salva o array com todos os elementos da api
      ...INITIAL_STATE,
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

  // função para salvar os elementos a partir do click
  handleClick = async () => {
    const { search } = this.state; // Utiliza o estado onde está salvo o value digitado
    this.setState({ hiddenInput: true }); // Primeiro defini o bool para esconder os elementos antes da requisição da Api

    // Salva todos os elementos retornados da Api em uma variavel para uso posterior
    const artistsArray = await searchAlbumsAPI(search);
    if (artistsArray.length < 1) { // Aqui acontece uma validação pra caso a api não encontre nenhum elemento
      this.setState({ apiReturn: true, ...INITIAL_STATE }); // define o estado que permite a exibição da tag com a informação de que nenhum album foi encontrado e exibe novamente o inout e o botão para uma nova busca
    } else {
      this.setState({ // Caso a requisição ocorra com sucesso
        artists: artistsArray, // o estado recebe um array com todos os albuns retornados da Api
        apiReturn: false,
        lastSearch: search, // salva uma copia do value para uso posterior renderizando o elemento que contem a pesquisa
        ...INITIAL_STATE });
    }
  };

  render() {
    const { search, btnDisable, hiddenInput, lastSearch,
      artists, apiReturn } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            name="search"
            hidden={ hiddenInput }
            value={ search }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            hidden={ hiddenInput }
            disabled={ btnDisable }
            data-testid="search-artist-button"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </div>

        {apiReturn ? (
          <p>Nenhum álbum foi encontrado</p>
        ) : (
          <>
            {hiddenInput && <Loading />}
            <p>{lastSearch.length > 0 && `Resultado de álbuns de: ${lastSearch}`}</p>
            {artists.map((elem) => (
              <Card key={ elem.collectionId } { ...elem } />
            ))}
          </>
        )}
      </div>
    );
  }
}
