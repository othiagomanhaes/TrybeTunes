import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import getMusic from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../css/album.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
      isLoading: true,
      favoritesSongs: [],
      albumProperties: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const musicsNofilter = await getMusic(id);
    const musics = musicsNofilter.filter((song, ind) => ind !== 0);
    this.setState({
      musicList: musics,
      isLoading: false,
      albumProperties: musicsNofilter,
    });

    const listDasMusicas = await getFavoriteSongs();
    this.setState({ favoritesSongs: listDasMusicas });
  }

  favoritaMusic = async ({ target }) => {
    const { musicList, favoritesSongs } = this.state;

    this.setState({ isLoading: true });

    // pegar a musica clicada no check
    const music = musicList.find((song) => song.trackId === parseInt(target.id, 10));
    //

    // Remove a musica desclicada no check
    const musicNoFavorite = favoritesSongs
      .filter((song) => song.trackId !== parseInt(target.id, 10));
    //

    // Confere se a música clicada está na lista de favoritas
    const temMusic = favoritesSongs
      .some((song) => song.trackId === parseInt(target.id, 10));
    //

    // Favorita e desfavorita as musicas
    if (temMusic) {
      await removeSong(music);
      this.setState(({
        favoritesSongs: musicNoFavorite,
        isLoading: false,
      }));
    } else {
      await addSong(music);
      this.setState((stateBefore) => ({
        favoritesSongs: [...stateBefore.favoritesSongs, music],
        isLoading: false,
      }));
    }
  };

  render() {
    const { musicList, isLoading, favoritesSongs, albumProperties } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div id="page-album">
          <section className="section-album2">
            {
              musicList.length > 0
                ? (
                  <>
                    <img
                      src={ albumProperties[0].artworkUrl100 }
                      alt={ albumProperties[0].collectionName }
                      id="imagem-album"
                    />
                    <p>
                      <strong data-testid="album-name">
                        {albumProperties[0].collectionName}
                      </strong>
                    </p>
                    <p data-testid="artist-name">{albumProperties[0].artistName}</p>
                  </>
                )
                : <Loading />
            }
          </section>
          <div className="todas-musicas">
            { isLoading ? <Loading /> : musicList
              .map(({ trackId, trackName, previewUrl }) => (
                <MusicCard
                  favoritaMusic={ this.favoritaMusic }
                  favoritesSongs={ favoritesSongs }
                  key={ trackId }
                  trackId={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                />)) }
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;

// musicList.map((song, ind) => (
//   <p key={ ind }>{song}</p>
//   ))

// <p>test</p>

// artistName  trackName
