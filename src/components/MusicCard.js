import React from 'react';
import PropTypes from 'prop-types';
import '../css/musicCard.css';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, favoritaMusic, favoritesSongs } = this.props;
    return (
      <div className="div-MusicaCard">
        <div className="titulo-favoritar">
          <p className="p-track-name" title={ trackName }>{trackName}</p>
          <label htmlFor={ trackId } className="label-music">
            {/* Favorita */}
            <input
              onChange={ favoritaMusic }
              type="checkbox"
              name={ trackId }
              checked={ favoritesSongs
                .some((song) => trackId === song.trackId) }
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </div>
        <div className="div-audio">
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {previewUrl}
            <code>audio</code>
          </audio>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favoritaMusic: PropTypes.func.isRequired,
  favoritesSongs: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
