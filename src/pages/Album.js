import React from 'react';
import PropTypes from 'prop-types';

class Album extends React.Component {
  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <div data-testid="page-album">
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
