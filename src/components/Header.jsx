import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      accountName: undefined, // Define estado padrão como undefined para retornar false padrão
    };
  }

  async componentDidMount() {
    const { name } = await getUser(); // Faz a requisição para função retornar do local storage o nome de usuario

    // define o nome no estado
    this.setState({ accountName: name });
  }

  render() {
    const { accountName } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { /* caso a requisição ainda não tenha retornado o Carregando será exibido */
            accountName || 'Carregando...'
          }
        </p>
        <ul>
          {/* Faz a renderização de uma lista com os links para as rotas */}
          <li>
            <Link to="/search" data-testid="link-to-search">Search</Link>
          </li>
          <li>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
