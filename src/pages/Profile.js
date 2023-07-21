import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

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
        <section>
          {isLoading ? <Loading /> : (
            <>
              <img data-testid="profile-image" src={ image } alt={ user } />
              <Link to="/trybetunes/profile/edit">Editar perfil</Link>
              <p>Nome</p>
              <p>{user}</p>
              <p>E-mail</p>
              <p>{email}</p>
              <p>Descrição</p>
              <p>{description}</p>
            </>)}
        </section>
      </div>
    );
  }
}

export default Profile;
