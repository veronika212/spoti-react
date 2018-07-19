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
  selectPlaylistUser,
  selectPlaylistDetailItems,
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

  renderArtist(items) {
    return items.track.artists.map(artist => <li key={artist.id}>{artist.name}</li>);
  }

  renderCoverImage() {
    const { userName, images, playlistDetail } = this.props;

    return images.length > 0 ? (
      <div className={styles.playlisInfoWrapper}>
        <img className={styles.playlistImage} src={images[1].url} alt="playlistCoverImage/60/60" />
        <p className={styles.playlistText}>{`Created by ${userName.display_name}, ${
          playlistDetail.total
        } songs`}</p>
      </div>
    ) : null;
  }

  renderPlaylist() {
    const { items } = this.props;
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
          {items.map(item => (
            <TableRow key={item.track.id}>
              <TableColumn>{item.track.name}</TableColumn>
              <TableColumn>
                <ul>{this.renderArtist(item)}</ul>
              </TableColumn>
              <TableColumn>{item.track.album.name}</TableColumn>
              <TableColumn>{format(item.added_at, 'DD-MM-YYYY')}</TableColumn>
              <TableColumn>{format(item.track.duration_ms, 'm:ss')}</TableColumn>
              <TableColumn>
                <FontIcon
                  className={styles.icons}
                  onClick={() => {
                    this.handleDeleteTrack(item.track.id);
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
    items: selectPlaylistDetailItems(state),
    userName: selectPlaylistUser(state),
  };
};

export default connect(
  mapStateToProps,
  { getPlaylistDetail, getPlaylistCoverImage, deletePlaylistTrack }
)(PlaylistDetail);
