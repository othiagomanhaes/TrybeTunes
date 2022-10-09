import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchArt: '',
      cantSearch: true,
      isLoading: false,
      music: undefined,
      artist: '',
      hide: false,
    };
  }

  onKeyPressHandler = () => {
    console.log('onKeyPressHandler');
  };

  fazBusca = async (artist) => {
    this.setState({ isLoading: true });
    const resp = await searchAlbumsAPI(artist);
    const respFiltered = resp.filter((song, ind) => ind !== 0);
    this.setState((stateBefore) => ({
      music: respFiltered,
      artist: stateBefore.searchArt,
      isLoading: false,
      searchArt: '',
      hide: true,
    }));
  };

  habilitaBtnEnter = () => {
    const { searchArt } = this.state;
    const minCarac = 2;
    const possoBuscar = searchArt.length >= minCarac;
    if (possoBuscar) {
      this.setState({
        cantSearch: false,
      });
    } else {
      this.setState({
        cantSearch: true,
      });
    }
  };

  mudaBtn = ({ target }) => {
    const { name, type, checked } = target;
    const value = type === 'checkbox' ? checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.habilitaBtnEnter());
  };

  render() {
    const { searchArt, cantSearch, isLoading, artist, music, hide } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading
          ? <Loading />
          : (
            <form>
              <input
                data-testid="search-artist-input"
                name="searchArt"
                value={ searchArt }
                type="text"
                placeholder="Nome do Artista"
                onChange={ this.mudaBtn }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ cantSearch }
                onClick={ () => this.fazBusca(searchArt) }
              >
                Pesquisar
              </button>
            </form>)}
        <div>
          {artist ? <p>{`Resultado de álbuns de: ${artist}`}</p> : null}
        </div>
        <div>
          { hide && (
            music.length > 0
              ? (
                music.map(({ artistName,
                  collectionId,
                  collectionName,
                  artworkUrl100,
                }, ind) => (
                  <Link
                    to={ `/album/${collectionId}` }
                    key={ collectionId }
                  >
                    <section
                      role="link" // Coment: 1
                      onKeyPress={ this.onKeyPressHandler } // Coment: 2
                      tabIndex={ ind }
                      data-testid={ `link-to-album-${collectionId}` }
                    >
                      <img src={ artworkUrl100 } alt={ collectionName } />
                      <p>{collectionName}</p>
                      <p>{artistName}</p>
                    </section>
                  </Link>
                ))
              )
              : <p>Nenhum álbum foi encontrado</p>)}
        </div>
      </div>
    );
  }
}

export default Search;

// Coments:
// 1 - https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/bccf0aeab8dd337c5f134f892a6d3588fbc29bdf/docs/rules/interactive-supports-focus.md

// 2 - https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/bccf0aeab8dd337c5f134f892a6d3588fbc29bdf/docs/rules/no-static-element-interactions.md
