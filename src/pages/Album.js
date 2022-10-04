import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import getMusic from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const musics = await getMusic(id);
    this.setState({
      musicList: musics,
    });
  }

  render() {
    const { musicList } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          {
            musicList.length > 0
              ? (
                <section>
                  <img
                    src={ musicList[0].artworkUrl100 }
                    alt={ musicList[0].collectionName }
                  />
                  <p>
                    <strong data-testid="album-name">
                      {musicList[0].collectionName}
                    </strong>
                  </p>
                  <p data-testid="artist-name">{musicList[0].artistName}</p>
                </section>
              )
              : <Loading />
          }
        </section>
        { musicList.length > 0 && <MusicCard getId={ id } /> }
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
