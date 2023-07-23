import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import UserLoading from '../pages/UserLoading';
import '../css/header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      usuario: '',
    };
  }

  async componentDidMount() {
    const obj = await getUser();
    const nome = await obj.name;
    this.setState({
      isLoading: false,
      usuario: nome,
    });
  }

  render() {
    const { isLoading, usuario } = this.state;
    return (
      <div id="div-header">
        <header
          data-testid="header-component"
        >
          {isLoading
            ? <UserLoading /> : (
              <span data-testid="header-user-name" id="user-span">
                {usuario}
              </span>) }
        </header>

        <nav id="nav-list">
          <ul id="links-list">
            <li className="item-list">
              <Link
                data-testid="link-to-search"
                to="/trybetunes/search"
                className="item-list-link"
              >
                Search
              </Link>
            </li>
            <li className="item-list">
              <Link
                data-testid="link-to-favorites"
                to="/trybetunes/favorites"
                className="item-list-link"
              >
                Favorites
              </Link>
            </li>
            <li className="item-list">
              <Link
                data-testid="link-to-profile"
                to="/trybetunes/profile"
                className="item-list-link"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
