import React from 'react';
import '../css/userLoading.css';

class UserLoading extends React.Component {
  render() {
    return (
      <div className="simbolo-musica">
        <div className="simbolo">♫</div>
        <div className="simbolo">♪</div>
        <div className="simbolo">♩</div>
      </div>
    );
  }
}

export default UserLoading;
