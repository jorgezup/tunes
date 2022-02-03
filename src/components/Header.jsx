import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    user: undefined,
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        <p>header</p>
        {!user ? <Loading /> : <p data-testid="header-user-name">{user.name}</p>}
      </header>
    );
  }
}
