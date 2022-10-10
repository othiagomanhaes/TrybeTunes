import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
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

  habilitaBtn = () => {
    const { user, email, image, description } = this.state;
    const arr = [user, email, image, description];
    const resp = arr.every((input) => input.length > 0);
    return resp;
  };

  render() {
    const { user, email, image, description, isLoading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading
          ? <Loading />
          : (
            <form>
              <img data-testid="edit-input-image" src={ image } alt={ user } />

              <p>Nome</p>
              <label htmlFor="editUser">
                <input
                  id="editUser"
                  name="user"
                  value={ user }
                  data-testid="edit-input-name"
                />
              </label>

              <p>Email</p>
              <label htmlFor="editEmail">
                <input
                  id="editEmail"
                  name="email"
                  value={ email }
                  data-testid="edit-input-email"
                />
              </label>

              <p>Descrição</p>
              <label htmlFor="editDescription">
                <input
                  id="editDescription"
                  name="description"
                  value={ description }
                  data-testid="edit-input-description"
                />
              </label>

              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ this.habilitaBtn }
              >
                Salvar
              </button>

            </form>)}
      </div>
    );
  }
}

export default ProfileEdit;
