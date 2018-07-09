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
import {
  selectPlaylistDetail,
  selectPlaylistCoverImages,
  selectPlaylistUserName,
  selectPlaylistTotalSongs,
} from '../../reducers/playlistDetailReducer';

class PlaylistDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPlaylistDetail(id);
    this.props.getPlaylistCoverImage(id);
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;

    if (id !== prevProps.match.params.id) {
      this.props.getPlaylistDetail(id);
      this.props.getPlaylistCoverImage(id);
    }
  }

  handleDeleteTrack = trackId => {
    const { id } = this.props.match.params;
    this.props.deletePlaylistTrack(trackId, id);
  };

  renderArtist(playlistDetail) {
    return playlistDetail.track.artists.map(artist => <li key={artist.id}>{artist.name}</li>);
  }

  renderCoverImage() {
    const { userName, images, totalSongs } = this.props;

    return images.length > 0 ? (
      <div>
        <img className={styles.playlist_image} src={images[1].url} alt="playlistCoverImage/60/60" />
        <p className={styles.playlist_created}>{`Created by ${userName.display_name}, ${
          totalSongs.total
        } songs`}</p>
      </div>
    ) : null;
  }

  renderPlaylist() {
    const { playlistDetail } = this.props;
    return (
      <DataTable plain className={styles.playlist_table}>
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
          {playlistDetail.map(playlistDetail => (
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
        {this.renderCoverImage()}
        <ul>{this.renderPlaylist()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlistDetail: selectPlaylistDetail(state),
    images: selectPlaylistCoverImages(state),
    userName: selectPlaylistUserName(state),
    totalSongs: selectPlaylistTotalSongs(state),
  };
};

export default connect(
  mapStateToProps,
  { getPlaylistDetail, getPlaylistCoverImage, deletePlaylistTrack }
)(PlaylistDetail);
