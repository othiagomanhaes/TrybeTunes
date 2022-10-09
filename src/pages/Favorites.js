import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      favoritesSongs: [],
    };
  }

  componentDidMount() {
    this.getFavoriteSongs();
  }

  getFavoriteSongs = async () => {
    const songs = await getFavoriteSongs();
    this.setState({
      favoritesSongs: songs,
      isLoading: false,
    });
  };

  favoritaMusic = async ({ target }) => {
    const { favoritesSongs } = this.state;

    this.setState({ isLoading: true });

    // pegar a musica clicada no check
    const music = favoritesSongs.find((song) => song.trackId === parseInt(target.id, 10));
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
    const { isLoading, favoritesSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favorites</p>
        { isLoading ? <Loading /> : favoritesSongs
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
    );
  }
}

export default Favorites;
