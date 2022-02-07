import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_LENGHT = 2;

export default class Search extends Component {
  state = {
    search: '',
    artistSearched: '',
    albums: undefined,
    isDisabled: true,
    isLoading: false,
    isClicked: false,
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      search: value,
      artistSearched: value,
      isDisabled: !this.isCorrectLength(value, MIN_LENGHT),
    });
  }

  handleSearch = () => {
    this.fetchApi();
    this.setState({
      isLoading: true,
      isClicked: true,
    });
  }

  isCorrectLength = (str, lengthParams) => str.length >= lengthParams;

  fetchApi = async () => {
    const { search } = this.state;
    const albums = await searchAlbumsAPI(search);
    this.setState({
      albums: albums.length > 0 ? albums : undefined,
      isLoading: false,
      search: '',
    });
  }

  render() {
    const {
      isDisabled,
      albums,
      isLoading,
      artistSearched,
      isClicked,
      search } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ search }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            onClick={ this.handleSearch }
            disabled={ isDisabled }
          >
            Pesquisar

          </button>
        </form>
        {isLoading && <Loading />}
        {isClicked && !albums
        && (
          <div>Nenhum álbum foi encontrado</div>
        )}
        { albums
        && (
          <>
            <p>
              Resultado de álbuns de:
              {' '}
              {artistSearched}
            </p>
            )
            {
              albums.map((album, index) => (
                <div key={ index }>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <img
                      src={ album.artworkUrl100 }
                      alt={ `Imagem do Album ${album.collectionName}` }
                    />
                    <h3>{album.collectionName}</h3>
                    <p>{album.artistName}</p>
                  </Link>
                </div>
              ))
            }
          </>
        )}
      </div>
    );
  }
}
