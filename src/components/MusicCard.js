import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, favoritaMusic, favoritesSongs } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <div>
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
          <label htmlFor={ trackId }>
            Favorita
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

// favoritaMusic = async ({ target }) => {
//   const { musicList, favoritesSongs } = this.state;

//   this.setState({ isLoading: true });

// // pegar a musica clicada no check
// const music = musicList.find((song) => song.trackId === parseInt(target.id, 10));
// //

//   // Remove a musica desclicada no check
//   const musicNoFavorite = favoritesSongs
//     .filter((song) => song.trackId !== parseInt(target.id, 10));
//   //

//   // Confere se a música clicada está na lista de favoritas
//   const temMusic = favoritesSongs
//     .some((song) => song.trackId === parseInt(target.id, 10));
//   //

//   // Favorita e desfavorita as musicas
//   if (temMusic) {
//     await removeSong(music);
//     this.setState(({
//       favoritesSongs: musicNoFavorite,
//     }));
//   } else {
//     await addSong(music);
//     this.setState((stateBefore) => ({
//       favoritesSongs: [...stateBefore.favoritesSongs, music],
//     }));
//   }
// };

// async componentDidMount() {
//   const { music } = this.props;
//   this.setState({
//     musicList: music,
//   });

//   const listDasMusicas = await getFavoriteSongs();
//   this.setState({ favoritesSongs: listDasMusicas });
// }
