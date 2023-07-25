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

  keyHandler = (event) => {
    const { login } = this.state;
    if (event.key === 'Enter') {
      this.chamaApi(login);
    }
  };

  chamaApi = (user) => {
    const { history } = this.props;
    createUser(user)
      .then(this.setState({ isLoading: false }))
      .then(() => history.push('/trybetunes/search'));

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
      <div data-testid="page-login" id="page-login">
        { isLoading
          ? <Loading />
          : (
            <div id="divLogin">
              <h2 id="titulo-tunes">TrybeTunes</h2>
              <form className="class-form">
                <label htmlFor="login">
                  <input
                    data-testid="login-name-input"
                    placeholder="Qual é o seu nome?"
                    type="text"
                    id="login"
                    name="login"
                    value={ login }
                    onChange={ this.mudaBtn }
                    onKeyDown={ this.keyHandler }

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
              <div id="div-gif" />
            </div>) }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Login;
