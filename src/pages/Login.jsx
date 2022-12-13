import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      btnDisable: true,
      load: false,
    };
  }

  onInputChange = ({ target }) => {
    const input = target.value; // Utiliza do target DOM para captura do value do elemento
    this.setState({ name: input }, this.validation); // sentando o valor recbido do target dentro do estado name, em seguida chama a função de validação
  };

  validation = () => {
    // Toda a logica do if serve para habilitar e desabilitar o botão de entrada, caso o campo esteja preenchido com 3 ou menos caracteres
    const { name } = this.state;
    if (name.length > 2) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({ btnDisable: true });
    }
  };

  handleClick = (userName) => { // recebe como parametro o valor passado no onClick da tag button que é enviado por estado
    const { history } = this.props; // Se aproveita da props history
    this.setState({
      load: true,
    }, async () => {
      await createUser({ name: userName });
      return history.push('/search');
    });
  };

  render() {
    const { name, btnDisable, load } = this.state;
    return (
      <div data-testid="page-login">
        {load && <h1>Carregando...</h1>}
        <form>
          <fieldset>
            <legend>Username</legend>
            <input
              name="name"
              type="text"
              data-testid="login-name-input"
              value={ name }
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ btnDisable }
              onClick={ () => this.handleClick(name) }
            >
              Entrar
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
