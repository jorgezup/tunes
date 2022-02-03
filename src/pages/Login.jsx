import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Loading from '../components/Loading';

import { createUser } from '../services/userAPI';

const MIN_LENGHT = 3;
export default class Login extends Component {
  state = {
    name: '',
    isDisabled: true,
    message: '',
    isClicked: false,
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      name: value,
      isDisabled: !this.isCorrectLogin(value),
    });
  }

  handleSubmit = async () => {
    this.setState({ isClicked: true });
    const { name } = this.state;
    const response = await createUser({ name });
    this.setState({ message: response });
  }

  isCorrectLogin = (str) => str.length >= MIN_LENGHT;

  render() {
    const { isDisabled, isClicked, message } = this.state;
    return (
      <div data-testid="page-login">
        Login
        <form action="">
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            onClick={ this.handleSubmit }
            disabled={ isDisabled }
          >
            Entrar
          </button>
          {isClicked && <Loading /> }
          {message && <Redirect to="/search" />}
        </form>
      </div>
    );
  }
}
