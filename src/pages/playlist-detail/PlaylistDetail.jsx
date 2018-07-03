import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPlaylistDetail } from '../../sagas/playlistDetailSaga';

class PlaylistDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    // console.log(this.props);
    this.props.getPlaylistDetail(id);
  }

  render() {
    return <div>playlist detail</div>;
  }
}

export default connect(
  null,
  { getPlaylistDetail }
)(PlaylistDetail);
