import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import styles from '../styles/login.module.css';
import image from '../images/logo.png';
import Loading from '../components/Loading';

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

  handleClick = (userName, e) => { // recebe como parametro o valor passado no onClick da tag button que é enviado por estado
    if (e) e.preventDefault();
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

    if (load) return <Loading />;

    return (
      <div data-testid="page-login" className={ styles.container }>
        <form className={ styles.form }>
          <img src={ image } alt="" />
          <section className={ styles.section }>
            <label htmlFor="name" id="name">
              <input
                name="name"
                className="name"
                id="name"
                onKeyDown={ (e) => e.key === 'Enter' && this.handleClick(name, e) }
                type="text"
                data-testid="login-name-input"
                placeholder="Seu nome aqui"
                value={ name } // renderiza o value a partir do que é digitado e capturado do input
                onChange={ this.onInputChange } // chama a funão e captura as mudanças pra retornar o value
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ btnDisable }
              onClick={ () => this.handleClick(name) } // envia aparir do click, o name do estado como parametro.
            >
              Entrar
            </button>
          </section>
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
