import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        { `Album ${id}` }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
