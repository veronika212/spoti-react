import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getArtists } from '../../sagas/artistsSaga';

class Artists extends Component {
  componentDidMount() {
    this.props.getArtists();
  }

  render() {
    return <div>bla bla</div>;
  }
}

export default connect(
  null,
  { getArtists }
)(Artists);
