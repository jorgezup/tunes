import React, { Component } from 'react';
import Header from '../components/Header';

const MIN_LENGHT = 2;

export default class Search extends Component {
  state = {
    // search: '',
    isDisabled: true,
  }

  isCorrectLength = (str, lengthParams) => str.length >= lengthParams;

  handleChange = ({ target: { value } }) => {
    this.setState({
      // search: value,
      isDisabled: !this.isCorrectLength(value, MIN_LENGHT),
    });
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            // onClick={this.handleSearch}
            disabled={ isDisabled }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}
