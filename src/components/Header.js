import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
      <>
        <header
          data-testid="header-component"
        >
          {isLoading
            ? <Loading /> : (
              <span data-testid="header-user-name">
                {usuario}
              </span>) }
        </header>

        <nav>
          <ul>
            <li><Link data-testid="link-to-search" to="/search">Search</Link></li>
            <li>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                data-testid="link-to-profile"
                to="/profile"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default Header;
