import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      cantLog: true,
      login: '',
      isLoading: false,
    };
  }

  chamaApi = (user) => {
    const { history } = this.props;
    createUser(user)
      .then(this.setState({ isLoading: false }))
      .then(() => history.push('/search'));

    this.setState(() => ({ isLoading: true }));
  };

  habilitaBtnEnter = () => {
    const { login } = this.state;
    const minCarac = 3;
    const possoLogar = login.length >= minCarac;
    if (possoLogar) {
      this.setState({
        cantLog: false,
      });
    } else {
      this.setState({
        cantLog: true,
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
    const { cantLog, login, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        { isLoading
          ? <Loading />
          : (
            <div id="divLogin">
              <h2>TrybeTunes</h2>
              <form>
                <label htmlFor="login">
                  <input
                    data-testid="login-name-input"
                    placeholder="qual é o seu nome?"
                    type="text"
                    id="login"
                    name="login"
                    value={ login }
                    onChange={ this.mudaBtn }
                  />
                </label>

                <button
                  id="btn-enter"
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ cantLog }
                  onClick={ () => this.chamaApi(login) }
                >
                  Entrar
                </button>
              </form>
            </div>) }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Login;
