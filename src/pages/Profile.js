import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import '../css/profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      user: undefined,
      email: undefined,
      image: undefined,
    };
  }

  componentDidMount() {
    this.recoveryUser();
  }

  recoveryUser = async () => {
    const resp = await getUser();

    this.setState({
      user: resp.name,
      isLoading: false,
      email: resp.email,
      image: resp.image,
      description: resp.description,
    });
  };

  render() {
    const { isLoading, user, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <section id="section-profile">
          {isLoading ? <Loading /> : (
            <>
              <div id="div-img">
                <img data-testid="profile-image" src={ image } alt={ user } />
                <Link id="link-div" to="/trybetunes/profile/edit">Editar perfil</Link>
              </div>

              <div id="description-profile">
                <div className="div-profile">
                  <p><strong>Nome:</strong></p>
                  <p>{user}</p>
                </div>
                <div className="div-profile">
                  <p><strong>Email:</strong></p>
                  <p>{email}</p>
                </div>
                <p><strong>Descrição:</strong></p>
                <p id="p-descroption">{description}</p>
              </div>
            </>)}
        </section>
      </div>
    );
  }
}

export default Profile;
