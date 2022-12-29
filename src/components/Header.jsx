import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineStar } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { getUser } from '../services/userAPI';
import styles from '../styles/header.module.css';
import Loading from './Loading';
import logo from '../images/logo.png';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      accountName: undefined, // Define estado padrão como undefined para retornar false padrão
      accountImage: '',
    };
  }

  async componentDidMount() {
    const { name, image } = await getUser(); // Faz a requisição para função retornar do local storage o nome de usuario

    // define o nome no estado
    this.setState({ accountName: name, accountImage: image });
  }

  render() {
    const { accountName, accountImage } = this.state;
    console.log(accountImage);
    return (
      <header className={ styles.header }>
        {!accountName ? (<Loading />
        ) : (
          <div className={ styles.container }>
            <section className={ styles.logo }>
              <Link to="/search">
                <img src={ logo } alt="logotipo trybe" className={ styles.logoImage } />
              </Link>
            </section>
            <ul className={ styles.ul }>
              {/* Faz a renderização de uma lista com os links para as rotas */}
              <li>
                <AiOutlineSearch />
                <Link to="/search">
                  Pesquisa
                </Link>
              </li>
              <li>
                <AiOutlineStar />
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
                <BiUserCircle />
                <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
              </li>
            </ul>
            <section className={ styles.userInfo }>
              {accountImage.length < 1 ? <BiUserCircle />
                : <img src={ accountImage } alt={ accountName } />}
              <p>{accountName}</p>
            </section>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
