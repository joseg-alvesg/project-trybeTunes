import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

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

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.validation);
  };

  handleClick = () => {
    const { history } = this.props;
    const { name, description, image, email } = this.state;
    this.setState({ load: true }, async () => {
      await updateUser({ name, description, image, email });
      return history.push('/profile');
    });
  };

  requestUserInfos = async () => {
    const { name, email, description, image } = await getUser();
    this.setState({ name, email, description, image });
  };

  validation = () => {
    const { name, email, description, image } = this.state;

    const validName = name.length > 0;
    const validEmail = email.length > 0;
    const validDesc = description.length > 0;
    const validImg = image.length > 0;

    this.setState({ btnDisable: !(validName && validDesc && validEmail && validImg) });
  };

  render() {
    const { name, description, email, image, btnDisable, load } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {load && <Loading />}
        <div>
          <img src="s" alt={ name } />
          <input
            data-testid="edit-input-image"
            name="image"
            id="image"
            value={ image }
            type="text"
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <input
            data-testid="edit-input-name"
            name="name"
            id="name"
            value={ name }
            type="text"
            placeholder="Edinaldo Pereira"
            onChange={ this.handleChange }
          />
          <h3>
            <input
              data-testid="edit-input-email"
              name="email"
              id="email"
              value={ email }
              type="text"
              placeholder="edinaldop@bol.com"
              onChange={ this.handleChange }
            />
          </h3>
          <textarea
            data-testid="edit-input-description"
            name="description"
            value={ description }
            id="description"
            cols="30"
            rows="10"
            onChange={ this.handleChange }
          />

          <button
            data-testid="edit-button-save"
            type="button"
            disabled={ btnDisable }
            onClick={ this.handleClick }
          >
            Editar perfil
          </button>
        </div>
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
