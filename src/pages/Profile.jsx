import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
    return (
      <div data-testid="page-profile">
        <Header />
        {load && <Loading />}
        <div>
          <img src={ image } alt={ name } data-testid="profile-image" />
          <Link to="/profile/edit"><button type="button">Editar perfil</button></Link>
        </div>
        <ul>
          <li>
            <h4>
              Nome
            </h4>
            <p>{name}</p>
          </li>
          <li>
            <h4>
              Email
            </h4>
            <p>{email}</p>
          </li>
          <li>
            <h4>
              Descrição
            </h4>
            <p>{description}</p>
          </li>
        </ul>
      </div>
    );
  }
}
