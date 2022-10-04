import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchArt: '',
      cantSearch: true,
    };
  }

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
    const { searchArt, cantSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
