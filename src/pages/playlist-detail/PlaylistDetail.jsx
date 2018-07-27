import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { DataTable, FontIcon, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

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
  selectPlaylistAditionalInfo,
} from '../../reducers/playlistDetailReducer';

let cx = classNames.bind(styles);

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

  handleDeleteTrack = track => {
    const { id } = this.props.match.params;
    this.props.deletePlaylistTrack(track, id);
  };

  renderArtist(items) {
    return items.track.artists.map(artist => (
      <li key={artist.id}>
        <span>
          <Link className={styles.link} to={`/artists/${artist.id}`}>
            {artist.name}
          </Link>
        </span>
      </li>
    ));
  }

  renderCoverImage() {
    const { userName, images, playlistDetail, playlistInfo } = this.props;
    if (!playlistInfo) {
      return null;
    }
    const imageUrl = images.length === 0 ? 'https://picsum.photos/300' : images[1].url;

    return (
      <div className={styles.playlisInfoWrapper}>
        <img className={styles.playlistImage} src={imageUrl} alt="playlistCoverImage/60/60" />
        <div className={styles.playlistText}>
          <p className={cx(styles.playlistText, styles.playlistText_title)}>Playlist</p>
          <p className={styles.name}>{playlistInfo.name}</p>
          <p className={styles.playlistText}>
            {`Created by ${userName.display_name}`} &bull; {`${playlistDetail.total} songs`}
          </p>
        </div>
      </div>
    );
  }

  renderPlaylist() {
    const { items } = this.props;
    return (
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Number</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Artists</TableColumn>
            <TableColumn>Album</TableColumn>
            <TableColumn>Added at</TableColumn>
            <TableColumn>
              <FontIcon>query_builder</FontIcon>
            </TableColumn>
            <TableColumn>Delete</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.track.id}>
              <TableColumn>{index + 1}</TableColumn>
              <TableColumn>{item.track.name}</TableColumn>
              <TableColumn>
                <ul>{this.renderArtist(item)}</ul>
              </TableColumn>
              <TableColumn>
                <Link className={styles.link} to={`/albums/${item.track.album.id}`}>
                  {item.track.album.name}
                </Link>
              </TableColumn>
              <TableColumn>{format(item.added_at, 'DD-MM-YYYY')}</TableColumn>
              <TableColumn>{format(item.track.duration_ms, 'm:ss')}</TableColumn>
              <TableColumn>
                <FontIcon
                  className={styles.icons}
                  onClick={() => {
                    this.handleDeleteTrack(item.track);
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
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    playlistDetail: selectPlaylistDetail(state),
    images: selectPlaylistCoverImages(state),
    items: selectPlaylistDetailItems(state),
    userName: selectPlaylistUser(state),
    playlistInfo: selectPlaylistAditionalInfo(state, ownProps.match.params.id),
  };
};

export default connect(
  mapStateToProps,
  { getPlaylistDetail, getPlaylistCoverImage, deletePlaylistTrack }
)(PlaylistDetail);
