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
    // Utiliza do target DOM para captura do value do elemento
    const input = target.value;

    // setando o valor recbido do target dentro do estado name, em seguida chama a função de validação
    this.setState({ name: input }, this.validation);
  };

  validation = () => {
    // caso a quantidade de caracteres seja menor que 3 o botão estara desabilidado caso contrario ele habilita o botão.
    const { name } = this.state;
    this.setState({ btnDisable: name.length <= 2 });
  };

  handleClick = (userName) => { // recebe como parametro o valor passado no onClick da tag button que é enviado por estado
    const { history } = this.props; // Se aproveita da props history para fazer o redirecionamento da pagina
    this.setState({
      load: true, // Altera o valor do load para true enquanto o usuario estiver logando para exibir a tela de carregando
    }, async () => {
      await createUser({ name: userName }); // chama a função que salva o nome de usuario dentro da chave name no local storage.
      return history.push('/search'); // Redireciona para o componente de busca 'search'
    });
  };

  render() {
    const { name, btnDisable, load } = this.state;
    return (
      <div data-testid="page-login">
        {/* Caso o valor do load seja true será renderidazo o texto de carregando */
          load && <h1>Carregando...</h1>
        }
        <form>
          <fieldset>
            <legend>Username</legend>
            <input
              name="name"
              type="text"
              data-testid="login-name-input"
              value={ name } // renderiza o value a partir do que é digitado e capturado do input
              onChange={ this.onInputChange } // chama a funão e captura as mudanças pra retornar o value
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ btnDisable }
              onClick={ () => this.handleClick(name) } // envia aparir do click, o name do estado como parametro.
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
