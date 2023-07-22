import React from 'react';
import '../css/loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="music-symbols">
        <div className="symbol">♫</div>
        <div className="symbol">♪</div>
        <div className="symbol">♩</div>
      </div>
    );
  }
}

export default Loading;
