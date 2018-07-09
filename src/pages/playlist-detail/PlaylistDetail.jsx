import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { DataTable, FontIcon, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';

import styles from '../playlist-detail/PlaylistDetail.css';
import '../../App.css';
import {
  getPlaylistDetail,
  getPlaylistCoverImage,
  deletePlaylistTrack,
} from '../../sagas/playlistDetailSaga';
import { selectPlaylistDetail } from '../../reducers/playlistDetailReducer';

class PlaylistDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPlaylistDetail(id);
    this.props.getPlaylistCoverImage(id);
  }

  handleDeleteTrack = trackId => {
    const { id } = this.props.match.params;
    this.props.deletePlaylistTrack(trackId, id);
  };

  renderArtist(playlistDetail) {
    return playlistDetail.track.artists.map(artist => <li key={artist.id}>{artist.name}</li>);
  }

  renderPlaylist() {
    const { playlist } = this.props;
    return (
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Title</TableColumn>
            <TableColumn>Artists</TableColumn>
            <TableColumn>Album</TableColumn>
            <TableColumn>Added at</TableColumn>
            <TableColumn>Time</TableColumn>
            <TableColumn>Delete</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playlist.map(playlistDetail => (
            <TableRow key={playlistDetail.track.id}>
              <TableColumn>{playlistDetail.track.name}</TableColumn>
              <TableColumn>
                <ul>{this.renderArtist(playlistDetail)}</ul>
              </TableColumn>
              <TableColumn>{playlistDetail.track.album.name}</TableColumn>
              <TableColumn>{format(playlistDetail.added_at, 'DD-MM-YYYY')}</TableColumn>
              <TableColumn>{format(playlistDetail.track.duration_ms, 'm:ss')}</TableColumn>
              <TableColumn>
                <FontIcon
                  className={styles.icons}
                  onClick={() => {
                    this.handleDeleteTrack(playlistDetail.track.id);
                  }}
                >
                  delete
                </FontIcon>
              </TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    );
  }

  render() {
    return (
      <div>
        <ul>{this.renderPlaylist()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlist: selectPlaylistDetail(state),
  };
};

export default connect(
  mapStateToProps,
  { getPlaylistDetail, getPlaylistCoverImage, deletePlaylistTrack }
)(PlaylistDetail);
