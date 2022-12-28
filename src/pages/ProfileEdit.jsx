import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BiUserCircle, BiErrorCircle } from 'react-icons/bi';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import styles from '../styles/profileEdit.module.css';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    btnDisable: true,
    load: false,
  };

  componentDidMount() {
    this.requestUserInfos();
  }

  requestUserInfos = async () => {
    const { name, email, description, image } = await getUser(); // getUser é a função que requisita os dados do usuario
    this.setState({ name, email, description, image }); // define esses valores no estado para renderização inicial a partir da montagem do componente
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.validation); // recebe o valor dos inputs a partir do name de cada elemento fazendo uma validação a cada digitação
  };

  handleClick = () => {
    const { history } = this.props; // Se aproveita da props recebida pela rota dos elementos para uso posterior
    const { name, description, image, email } = this.state;
    this.setState({ load: true }, async () => {
      await updateUser({ name, description, image, email }); // Faz a requisição de atualização dos dados do usuario para API
      return history.push('/profile'); // Redireciona para a pagina profile a partir do historico anterior
    });
  };

  validation = () => {
    const { name, email, description, image } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const regexImg = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i;

    const validName = name.length > 0;
    const validEmail = regex.test(email);
    const validDesc = description.length > 0;
    const validImg = regexImg.test(image);
    // Define a validação dos campos de digitação
    this.setState({ btnDisable: !(validName && validDesc && validEmail && validImg) });
  };

  render() {
    const { name, description, email, image, btnDisable, load } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const regexImg = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i;
    return (
      <div className={ styles.container }>
        <Header />
        {load ? (<Loading />
        ) : (
          <div className={ styles.inputContainer }>
            <div className={ styles.inputImage }>
              {regexImg.test(image) ? <img src={ image } alt={ name } />
                : <BiUserCircle className={ styles.userCircle } />}
              <input
                name="image"
                id="image"
                value={ image }
                placeholder="Insira um link"
                type="text"
                onChange={ this.handleChange }
              />
              {!regexImg.test(image) ? <BiErrorCircle className={ styles.errorIcon } />
                : <BsFillCheckCircleFill className={ styles.validIcon } />}
            </div>
            <div className={ styles.inputs }>
              <label htmlFor="name">
                <h2>Nome</h2>
                <span>Fique a vontade para usar seu nome social</span>
                <input
                  data-testid="edit-input-name"
                  name="name"
                  id="name"
                  value={ name }
                  type="text"
                  placeholder="Seu nome"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="email">
                <h2>E-mail</h2>
                <span>Escola um e-mail que consulte diariamente</span>
                <input
                  data-testid="edit-input-email"
                  name="email"
                  id="email"
                  value={ email }
                  type="email"
                  placeholder="Seu_email@email.com"
                  onChange={ this.handleChange }
                />
                {!regex.test(email) ? <BiErrorCircle className={ styles.errorIcon } />
                  : <BsFillCheckCircleFill className={ styles.validIcon } />}
              </label>
              <label htmlFor="description">
                <h2>Descrição</h2>
                <textarea
                  data-testid="edit-input-description"
                  name="description"
                  value={ description }
                  id="description"
                  placeholder="Sobre mim"
                  cols="50"
                  rows="7"
                  onChange={ this.handleChange }
                />
              </label>

              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ btnDisable }
                onClick={ this.handleClick }
              >
                Salvar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default ProfileEdit;
