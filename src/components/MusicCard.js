import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import getMusic from '../services/musicsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
    };
  }

  async componentDidMount() {
    const { getId } = this.props;

    const musics = await getMusic(getId);
    this.setState({
      musicList: musics,
    });
  }

  render() {
    const { musicList } = this.state;
    return (
      <div>
        {
          musicList.length > 0
            ? (
              musicList.map(({ trackName, previewUrl }, id) => (
                <div key={ id > 0 && trackName }>
                  <p>{id > 0 && trackName}</p>
                  { id > 0
                    && (
                      <audio
                        data-testid="audio-component"
                        src={ id > 0 && previewUrl }
                        controls
                      >
                        <track kind="captions" />
                        O seu navegador não suporta o elemento
                        { id > 0 && previewUrl}
                        <code>audio</code>
                      </audio>)}
                </div>
              ))
            )
            : <Loading />
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  getId: PropTypes.number.isRequired,
};

export default MusicCard;
