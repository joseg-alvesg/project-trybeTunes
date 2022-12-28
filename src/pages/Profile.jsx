import React, { Component } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import styles from '../styles/profile.module.css';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    load: false,
  };

  componentDidMount() {
    this.getAccountInfos();
  }

  getAccountInfos = async () => {
    this.setState({ load: true });
    const { name, email, description, image } = await getUser(); // captura todos os elementos da requisição dos dados da pessoa usuaria
    this.setState({ name, email, description, image, load: false }); // define todos os dados capturados no estado para uma utilização posterior
  };

  render() {
    const { name, email, description, image, load } = this.state;

    if (load) <Loading />;

    return (
      <div className={ styles.container }>
        <Header />
        <div className={ styles.infos }>
          {image ? <img src={ image } alt={ name } className={ styles.img } />
            : <BiUserCircle className={ styles.userCircle } />}
          <ul className={ styles.ul }>
            <li>
              <h4>
                Nome
              </h4>
              <p>{name}</p>
            </li>
            <li>
              <h4>
                E-mail
              </h4>
              <p>{email}</p>
            </li>
            <li>
              <h4>
                Descrição
              </h4>
              <p>{description}</p>
            </li>
            <button type="button">
              <Link to="/profile/edit">Editar perfil</Link>
            </button>
          </ul>
        </div>
      </div>
    );
  }
}
