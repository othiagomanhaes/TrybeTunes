import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import getMusic from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
      isLoading: false,
      favoritesSongs: [],
    };
  }

  async componentDidMount() {
    const { getId } = this.props;

    const musics = await getMusic(getId);
    this.setState({
      musicList: musics,
    });

    const listDasMusicas = await getFavoriteSongs();
    this.setState({ favoritesSongs: listDasMusicas });
  }

  favoritaMusic = async ({ target }) => {
    const { musicList } = this.state;

    const music = musicList.find((song) => song.trackId === parseInt(target.id, 10));
    this.setState({ isLoading: true });
    await addSong(music);
    this.setState((stateBefore) => ({
      isLoading: false,
      favoritesSongs: [...stateBefore.favoritesSongs, music],
    }));
  };

  render() {
    const { musicList, isLoading, favoritesSongs } = this.state;
    return (
      isLoading
        ? <Loading />
        : (
          <div>
            {
              musicList.length > 0
                ? (
                  musicList.map((song, id) => (
                    <div key={ id > 0 && song.trackName }>
                      <p>{id > 0 && song.trackName}</p>
                      { id > 0
                    && (
                      <div>
                        <audio
                          data-testid="audio-component"
                          src={ id > 0 && song.previewUrl }
                          controls
                        >
                          <track kind="captions" />
                          O seu navegador não suporta o elemento
                          { id > 0 && song.previewUrl}
                          <code>audio</code>
                        </audio>
                        <label htmlFor={ song.trackId }>
                          Favorita
                          <input
                            type="checkbox"
                            checked={
                              favoritesSongs
                                .some(({ trackId }) => trackId === song.trackId)
                            }
                            name={ song.trackId }
                            onChange={ this.favoritaMusic }
                            id={ song.trackId }
                            data-testid={ `checkbox-music-${song.trackId}` }
                          />
                        </label>
                      </div>)}
                    </div>
                  ))
                )
                : <Loading />
            }
          </div>)
    );
  }
}

MusicCard.propTypes = {
  getId: PropTypes.string.isRequired,
};

export default MusicCard;
