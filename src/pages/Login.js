import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      cantLog: true,
      login: '',
    };
  }

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
    const { cantLog, login } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            name="login"
            value={ login }
            onChange={ this.mudaBtn }
          />

          <button
            id="btn-enter"
            data-testid="login-submit-button"
            type="button"
            disabled={ cantLog }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
