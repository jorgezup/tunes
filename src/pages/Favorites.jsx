import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state ={
    isLoading: true,
    favoritesSongs: [],
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    this.setState({
      isLoading: true,
    });
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
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
    }
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoritesSongs,
    });
  }

  render() {
    const { isLoading, favoritesSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading
          ? <Loading />
          : (
            favoritesSongs.map((music, index) => (
              <MusicCard
                music={ music }
                key={ index }
                handleFavorite={ () => this.handleFavorite(music) }
                favorited={ !!this.isFavorite(music.trackId) }
              />
            ))
          )}
      </div>
    );
  }
}
