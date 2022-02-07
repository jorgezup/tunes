import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getMusics from '../services/musicsAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: undefined,
      collection: undefined,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musics: musics.filter((music) => music.kind === 'song'),
      collection: musics[0],
      isLoading: false,
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
          </>
        )}
        {
          musics
          && (
            musics.map((music, index) => <MusicCard music={ music } key={ index } />)
          )
        }
      </div>);
  }
}

Album.propTypes = {
  match: PropTypes.element.isRequired,
};
