import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    musics: undefined,
    collection: undefined,
    isLoading: true,
    favoritesSongs: [],
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      musics: musics.filter((music) => music.kind === 'song'),
      collection: musics[0],
      isLoading: false,
      favoritesSongs,
    });
  }

    isFavorite = (trackId) => {
      const { favoritesSongs } = this.state;
      return favoritesSongs.find((song) => song.trackId === trackId);
    }

  handleFavorite = async (music) => {
    this.setState({ isLoading: true });
    if (this.isFavorite(music.trackId)) {
      await removeSong(music); // There's a filter already implemented
    } else {
      await addSong(music); // There's spread array already implemented
    }
    this.setState({
      isLoading: false,
      favoritesSongs: await getFavoriteSongs(),
    });
  }

  render() {
    const { musics, collection, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading && <Loading />}
        {musics
        && (
          <>
            <div data-testid="artist-name">
              <p>{collection.artistName}</p>
            </div>
            <div data-testid="album-name">
              <p>{collection.collectionName}</p>
            </div>
            {musics.map((music, index) => (
              <MusicCard
                music={ music }
                key={ index }
                handleFavorite={ () => this.handleFavorite(music) }
                favorited={ !!this.isFavorite(music.trackId) } // converting the result of find in truthy or falsy
              />
            ))}
          </>
        )}
      </div>);
  }
}

Album.propTypes = {
  match: PropTypes.element.isRequired,
};
