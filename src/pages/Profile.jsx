import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
  }

  componentDidMount() {
    this.getAccountInfos();
  }

  getAccountInfos = async () => {
    const accountRequest = await getUser();
    console.log(accountRequest);
    // this.setState({ name: });
  };

  render() {
    const { name } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          <img src="" alt="" />
        </div>
        <ul>
          <li>
            <h4>
              Nome
            </h4>
            <p>{name}</p>
          </li>
          {/* <li>
            <h4>
              Email
            </h4>
            <p>a</p>
          </li>
          <li>
            <h4>
              Descrição
            </h4>
            <p>a</p>
          </li> */}
        </ul>
      </div>
    );
  }
}
