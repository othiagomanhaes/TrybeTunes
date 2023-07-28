import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      user: undefined,
      email: undefined,
      image: undefined,
      forbiddenButton: false,
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
      forbiddenButton: true,
    });
  };

  attUser = async () => {
    const { user, email, image, description } = this.state;
    const { history } = this.props;
    const obj = {
      name: user,
      email,
      image,
      description,
    };
    // this.setState({ isLoading: true });
    await updateUser(obj);
    // this.setState({ isLoading: false });
    history.push('/trybetunes/profile');
  };

  validarEmail = (email) => { // Coment 1
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  habilitaBtnSave = () => {
    const { user, email, image, description } = this.state;
    const min = 3;
    const imageOk = image.length > min;
    const userOk = user.length > min;
    const emailOk = this.validarEmail(email);
    const descriptionOk = description.length > min;

    if (userOk && emailOk && imageOk && descriptionOk) {
      this.setState({ forbiddenButton: false });
    } else {
      this.setState({ forbiddenButton: true });
    }
  };

  attEstado = ({ target }) => {
    const { name, type, checked } = target;
    const value = type === 'checkbox' ? checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.habilitaBtnSave());
  };

  render() {
    const { user, email, image, description, isLoading, forbiddenButton } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>Editar perfil</p>
        { isLoading
          ? <Loading />
          : (
            <form>
              <img
                src={ image }
                alt={ user }
                onChange={ this.attEstado }
              />
              <input
                type="text"
                name="image"
                value={ image }
                onChange={ this.attEstado }
                data-testid="edit-input-image"
              />

              <p>Nome</p>
              <label htmlFor="editUser">
                <input
                  id="editUser"
                  name="user"
                  value={ user }
                  onChange={ this.attEstado }
                  data-testid="edit-input-name"
                />
              </label>

              <p>Email</p>
              <label htmlFor="editEmail">
                <input
                  id="editEmail"
                  type="email"
                  name="email"
                  value={ email }
                  onChange={ this.attEstado }
                  data-testid="edit-input-email"
                />
              </label>

              <p>Descrição</p>
              <label htmlFor="editDescription">
                <textarea
                  id="editDescription"
                  name="description"
                  value={ description }
                  onChange={ this.attEstado }
                  data-testid="edit-input-description"
                />
              </label>

              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ forbiddenButton }
                onClick={ this.attUser }
              >
                Salvar
              </button>

            </form>)}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default ProfileEdit;

// Coments 1: https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
