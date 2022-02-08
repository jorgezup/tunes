import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const {
      music: {
        previewUrl,
        trackName,
        trackId,
      },
      handleFavorite,
      favorited,
    } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            name="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ handleFavorite }
            checked={ favorited }
          />
        </label>
      </div>

    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
  handleFavorite: PropTypes.func.isRequired,
  favorited: PropTypes.bool.isRequired,
};
